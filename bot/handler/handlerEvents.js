const fs = require("fs-extra");
const nullAndUndefined = [undefined, null];

function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}

function getRole(threadData, senderID) {
    const adminBot = global.GoatBot.config.adminBot || [];
    if (!senderID) return 0;
    const adminBox = threadData.adminIDs || [];
    return adminBot.includes(senderID) ? 2 : (adminBox.includes(senderID) ? 1 : 0);
}

function getText(type, reason, time, targetID, lang) {
    const utils = global.utils;
    if (type === "userBanned")
        return utils.getText({ lang, head: "handlerEvents" }, "userBanned", reason, time, targetID);
    else if (type === "threadBanned")
        return utils.getText({ lang, head: "handlerEvents" }, "threadBanned", reason, time, targetID);
    else if (type === "onlyAdminBox")
        return utils.getText({ lang, head: "handlerEvents" }, "onlyAdminBox");
    else if (type === "onlyAdminBot")
        return utils.getText({ lang, head: "handlerEvents" }, "onlyAdminBot");
}

function replaceShortcutInLang(text, prefix, commandName) {
    return text
        .replace(/\{(?:p|prefix)\}/g, prefix)
        .replace(/\{(?:n|name)\}/g, commandName)
        .replace(/\{pn\}/g, `${prefix}${commandName}`);
}

function getRoleConfig(utils, command, isGroup, threadData, commandName) {
    let roleConfig;
    if (utils.isNumber(command.config.role)) {
        roleConfig = { onStart: command.config.role };
    } else if (typeof command.config.role === "object" && !Array.isArray(command.config.role)) {
        if (command.config.role.onStart == null) command.config.role.onStart = 0;
        roleConfig = command.config.role;
    } else {
        roleConfig = { onStart: 0 };
    }

    if (isGroup && threadData && threadData.data && threadData.data.setRole) {
        roleConfig.onStart = threadData.data.setRole[commandName] ?? roleConfig.onStart;
    }

    for (const key of ["onChat", "onStart", "onReaction", "onReply"]) {
        if (roleConfig[key] == undefined) roleConfig[key] = roleConfig.onStart;
    }

    return roleConfig;
}

function isBannedOrOnlyAdmin(userData, threadData, senderID, threadID, isGroup, commandName, message, lang) {
    const config = global.GoatBot.config;
    const { adminBot, hideNotiMessage } = config;

    // user banned?
    const infoBannedUser = userData.banned;
    if (infoBannedUser && infoBannedUser.status === true) {
        const { reason, date } = infoBannedUser;
        if (!hideNotiMessage.userBanned) {
            message.reply(getText("userBanned", reason, date, senderID, lang));
        }
        return true;
    }

    // adminOnly check — only if group
    if (
        config.adminOnly.enable === true &&
        !adminBot.includes(senderID) &&
        !config.adminOnly.ignoreCommand.includes(commandName)
    ) {
        if (isGroup) {
            if (!hideNotiMessage.adminOnly) {
                message.reply(getText("onlyAdminBot", null, null, null, lang));
            }
            return true;
        }
    }

    // group-only checks
    if (isGroup) {
        // onlyAdminBox
        if (
            threadData.data.onlyAdminBox === true &&
            !threadData.adminIDs.includes(senderID) &&
            !(threadData.data.ignoreCommanToOnlyAdminBox || []).includes(commandName)
        ) {
            if (!threadData.data.hideNotiMessageOnlyAdminBox) {
                message.reply(getText("onlyAdminBox", null, null, null, lang));
            }
            return true;
        }

        // thread banned?
        const infoBannedThread = threadData.banned;
        if (infoBannedThread && infoBannedThread.status === true) {
            const { reason, date } = infoBannedThread;
            if (!hideNotiMessage.threadBanned) {
                message.reply(getText("threadBanned", reason, date, threadID, lang));
            }
            return true;
        }
    }

    return false;
}

function createGetText2(langCode, pathCustomLang, prefix, command) {
    const commandType = command.config.countDown ? "command" : "command event";
    const commandName = command.config.name;
    let customLang = {};
    let getText2 = () => "";
    if (fs.existsSync(pathCustomLang)) {
        try {
            customLang = require(pathCustomLang)[commandName]?.text || {};
        } catch (e) {
            customLang = {};
        }
    }
    if (command.langs || customLang) {
        getText2 = (key, ...args) => {
            let lang = command.langs?.[langCode]?.[key] || customLang[key] || "";
            lang = replaceShortcutInLang(lang, prefix, commandName);
            for (let i = args.length - 1; i >= 0; i--) {
                lang = lang.replace(new RegExp(`%${i+1}`, "g"), args[i]);
            }
            return lang || `❌ Missing "${key}" text for ${commandName} in ${langCode}`;
        };
    }
    return getText2;
}

module.exports = function(api, threadModel, userModel, dashBoardModel, globalModel, usersData, threadsData, dashBoardData, globalData) {
    return async function(event, message) {
        const { utils, client, GoatBot } = global;
        const { getPrefix, removeHomeDir, log, getTime } = utils;
        const { config, configCommands: { envGlobal, envCommands, envEvents } } = GoatBot;
        const { autoRefreshThreadInfoFirstTime } = config.database;
        let { hideNotiMessage = {} } = config;

        const { body, messageID, threadID, isGroup } = event;
        if (!threadID) return;

        const senderID = event.userID || event.senderID || event.author;

        // Fallback userData
        let userData = global.db.allUserData.find(u => u.userID === senderID);
        if (!userData && !isNaN(senderID)) {
            userData = await usersData.create(senderID);
        }

        // Fallback threadData
        let threadData = global.db.allThreadData.find(t => t.threadID === threadID);
        if (!threadData && !isNaN(threadID)) {
            // ইনবক্স হলে threadData হয়তো নাই
            threadData = {
                threadID,
                adminIDs: [],
                banned: { status: false },
                data: {},
                settings: { hideNotiMessage: {} }
            };
        }

        if (typeof threadData.settings.hideNotiMessage === "object") {
            hideNotiMessage = threadData.settings.hideNotiMessage;
        }

        const prefix = getPrefix(threadID);
        const role = getRole(threadData, senderID);
        const parameters = {
            api, usersData, threadsData, message, event,
            userModel, threadModel, prefix,
            dashBoardModel, globalModel, dashBoardData, globalData,
            envCommands, envEvents, envGlobal,
            role,
            removeCommandNameFromBody: (body_, prefix_, commandName_) => {
                if ([body_, prefix_, commandName_].every(x => nullAndUndefined.includes(x))) {
                    throw new Error("Need body, prefix, commandName");
                }
                for (let i = 0; i < arguments.length; i++) {
                    if (typeof arguments[i] !== "string") {
                        throw new Error(`Param ${i+1} must be string`);
                    }
                }
                return body_.replace(new RegExp(`^${prefix_}(\\s+|)${commandName_}`, "i"), "").trim();
            }
        };

        const langCode = threadData.data.lang || config.language || "en";

        function createMessageSyntaxError(commandName) {
            message.SyntaxError = async function() {
                return await message.reply(utils.getText({ lang: langCode, head: "handlerEvents" }, "commandSyntaxError", prefix, commandName));
            };
        }

        let isUserCallCommand = false;

        // ============ ON START ============
        async function onStart() {
            if (!body || !body.startsWith(prefix)) return;
            const dateNow = Date.now();
            const args = body.slice(prefix.length).trim().split(/ +/);
            let commandName = args.shift().toLowerCase();
            let command = GoatBot.commands.get(commandName) || GoatBot.commands.get(GoatBot.aliases.get(commandName));

            // group aliases
            const aliasesData = threadData.data.aliases || {};
            for (const cmd in aliasesData) {
                if (aliasesData[cmd].includes(commandName)) {
                    command = GoatBot.commands.get(cmd);
                    break;
                }
            }
            if (command) commandName = command.config.name;

            if (isBannedOrOnlyAdmin(userData, threadData, senderID, threadID, isGroup, commandName, message, langCode)) return;

            if (!command) {
                if (!hideNotiMessage.commandNotFound) {
                    return await message.reply(
                        commandName ?
                        utils.getText({ lang: langCode, head: "handlerEvents" }, "commandNotFound", commandName, prefix) :
                        utils.getText({ lang: langCode, head: "handlerEvents" }, "commandNotFound2", prefix)
                    );
                } else return;
            }

            const roleConfig = getRoleConfig(utils, command, isGroup, threadData, commandName);
            const needRole = roleConfig.onStart;

            // Trick: যদি কমান্ড গ্রুপ থেকে কল করা হয়, তখন ইনবক্সেও ফলো করা হবে
            // মানে, যদি isGroup === true, তবে allow করা হবে ইনবক্সেও
            // এই লাইন ensure করবে যে ইনবক্সেও কাজ করবে

            if (needRole > role && isGroup) {
                if (!hideNotiMessage.needRoleToUseCmd) {
                    if (needRole === 1)
                        return await message.reply(utils.getText({ lang: langCode, head: "handlerEvents" }, "onlyAdmin", commandName));
                    else if (needRole === 2)
                        return await message.reply(utils.getText({ lang: langCode, head: "handlerEvents" }, "onlyAdminBot2", commandName));
                } else {
                    return;
                }
            }

            // cooldown
            if (!client.countDown[commandName]) client.countDown[commandName] = {};
            const timestamps = client.countDown[commandName];
            let getCoolDown = command.config.countDown;
            if (getCoolDown == null || isNaN(getCoolDown)) getCoolDown = 1;
            const cooldownCommand = getCoolDown * 1000;

            if (timestamps[senderID]) {
                const expirationTime = timestamps[senderID] + cooldownCommand;
                if (dateNow < expirationTime) {
                    return await message.reply(utils.getText({ lang: langCode, head: "handlerEvents" }, "waitingForCommand", ((expirationTime - dateNow) / 1000).toFixed(1)));
                }
            }

            const time = getTime("DD/MM/YYYY HH:mm:ss");
            isUserCallCommand = true;
            try {
                // analytics
                (async () => {
                    const analytics = await globalData.get("analytics", "data", {});
                    analytics[commandName] = (analytics[commandName] || 0) + 1;
                    await globalData.set("analytics", analytics, "data");
                })();

                createMessageSyntaxError(commandName);
                const getText2 = createGetText2(langCode, `${process.cwd()}/languages/cmds/${langCode}.js`, prefix, command);
                await command.onStart({
                    ...parameters,
                    args,
                    commandName,
                    getLang: getText2,
                    removeCommandNameFromBody: parameters.removeCommandNameFromBody
                });
                timestamps[senderID] = dateNow;
                log.info("CALL COMMAND", `${commandName} | ${senderID} | ${threadID} | ${args.join(" ")}`);
            } catch (err) {
                log.err("CALL COMMAND", `Error onStart for ${commandName}`, err);
                await message.reply(utils.getText({ lang: langCode, head: "handlerEvents" }, "errorOccurred", time, commandName, removeHomeDir(err.stack ? err.stack.split("\n").slice(0,5).join("\n") : JSON.stringify(err, null,2))));
            }
        }

        // ============ ON REPLY ============
        async function onReply() {
            if (!event.messageReply) return;
            const ReplyObj = GoatBot.onReply.get(event.messageReply.messageID);
            if (!ReplyObj) return;
            ReplyObj.delete = () => GoatBot.onReply.delete(event.messageReply.messageID);
            const commandName = ReplyObj.commandName;
            if (!commandName) {
                await message.reply(utils.getText({ lang: langCode, head: "handlerEvents" }, "cannotFindCommandName"));
                log.err("onReply", `Missing commandName in Reply`);
                return;
            }
            const command = GoatBot.commands.get(commandName);
            if (!command) {
                await message.reply(utils.getText({ lang: langCode, head: "handlerEvents" }, "cannotFindCommand", commandName));
                log.err("onReply", `Command ${commandName} not found`);
                return;
            }

            const roleConfig = getRoleConfig(utils, command, isGroup, threadData, commandName);
            const needRole = roleConfig.onReply;
            if (needRole > role && isGroup) {
                if (!hideNotiMessage.needRoleToUseCmdOnReply) {
                    if (needRole === 1)
                        return await message.reply(utils.getText({ lang: langCode, head: "handlerEvents" }, "onlyAdminToUseOnReply", commandName));
                    else if (needRole === 2)
                        return await message.reply(utils.getText({ lang: langCode, head: "handlerEvents" }, "onlyAdminBot2ToUseOnReply", commandName));
                } else return;
            }

            const getText2 = createGetText2(langCode, `${process.cwd()}/languages/cmds/${langCode}.js`, prefix, command);
            const time = getTime("DD/MM/YYYY HH:mm:ss");
            const args = body ? body.split(/ +/) : [];
            createMessageSyntaxError(commandName);
            if (isBannedOrOnlyAdmin(userData, threadData, senderID, threadID, isGroup, commandName, message, langCode)) return;
            try {
                await command.onReply({
                    ...parameters,
                    Reply: ReplyObj,
                    args,
                    commandName,
                    getLang: getText2
                });
                log.info("onReply", `${commandName} | ${senderID} | ${threadID} | reply`);
            } catch (err) {
                log.err("onReply", `Error onReply for ${commandName}`, err);
                await message.reply(utils.getText({ lang: langCode, head: "handlerEvents" }, "errorOccurred3", time, commandName, removeHomeDir(err.stack ? err.stack.split("\n").slice(0,5).join("\n") : JSON.stringify(err, null,2))));
            }
        }

        // ============ ON CHAT ============
        async function onChat() {
            const allOnChat = GoatBot.onChat || [];
            const args = body ? body.split(/ +/) : [];
            for (const key of allOnChat) {
                const command = GoatBot.commands.get(key);
                if (!command) continue;
                const commandName = command.config.name;

                const roleConfig = getRoleConfig(utils, command, isGroup, threadData, commandName);
                const needRole = roleConfig.onChat;
                if (needRole > role && isGroup) continue;

                const getText2 = createGetText2(langCode, `${process.cwd()}/languages/cmds/${langCode}.js`, prefix, command);
                const time = getTime("DD/MM/YYYY HH:mm:ss");
                createMessageSyntaxError(commandName);
                try {
                    const handlerResult = await command.onChat({
                        ...parameters,
                        isUserCallCommand,
                        args,
                        commandName,
                        getLang: getText2
                    });
                    if (typeof handlerResult === "function") {
                        if (isBannedOrOnlyAdmin(userData, threadData, senderID, threadID, isGroup, commandName, message, langCode)) continue;
                        await handlerResult();
                        log.info("onChat", `${commandName} | ${senderID} | ${threadID}`);
                    }
                } catch (err) {
                    log.err("onChat", `Error onChat for ${commandName}`, err);
                }
            }
        }

        // ============ ON REACTION ============
        async function onReaction() {
            const ReactionObj = GoatBot.onReaction.get(messageID);
            if (!ReactionObj) return;
            ReactionObj.delete = () => GoatBot.onReaction.delete(messageID);
            const commandName = ReactionObj.commandName;
            if (!commandName) {
                await message.reply(utils.getText({ lang: langCode, head: "handlerEvents" }, "cannotFindCommandName"));
                log.err("onReaction", `Missing commandName in reaction`);
                return;
            }
            const command = GoatBot.commands.get(commandName);
            if (!command) {
                await message.reply(utils.getText({ lang: langCode, head: "handlerEvents" }, "cannotFindCommand", commandName));
                log.err("onReaction", `Command ${commandName} not found`);
                return;
            }

            const roleConfig = getRoleConfig(utils, command, isGroup, threadData, commandName);
            const needRole = roleConfig.onReaction;
            if (needRole > role && isGroup) {
                if (!hideNotiMessage.needRoleToUseCmdOnReaction) {
                    if (needRole === 1)
                        return await message.reply(utils.getText({ lang: langCode, head: "handlerEvents" }, "onlyAdminToUseOnReaction", commandName));
                    else if (needRole === 2)
                        return await message.reply(utils.getText({ lang: langCode, head: "handlerEvents" }, "onlyAdminBot2ToUseOnReaction", commandName));
                } else return;
            }

            const getText2 = createGetText2(langCode, `${process.cwd()}/languages/cmds/${langCode}.js`, prefix, command);
            const time = getTime("DD/MM/YYYY HH:mm:ss");
            if (isBannedOrOnlyAdmin(userData, threadData, senderID, threadID, isGroup, commandName, message, langCode)) return;
            try {
                await command.onReaction({
                    ...parameters,
                    Reaction: ReactionObj,
                    args: [],
                    commandName,
                    getLang: getText2
                });
                log.info("onReaction", `${commandName} | ${senderID} | ${threadID} | reaction`);
            } catch (err) {
                log.err("onReaction", `Error onReaction for ${commandName}`, err);
                await message.reply(utils.getText({ lang: langCode, head: "handlerEvents" }, "errorOccurred4", time, commandName, removeHomeDir(err.stack ? err.stack.split("\n").slice(0,5).join("\n") : JSON.stringify(err, null,2))));
            }
        }

        // ============ ON ANY EVENT ============
        async function onAnyEvent() {
            const allOnAnyEvent = GoatBot.onAnyEvent || [];
            const args = [];
            if (typeof body === "string" && body.startsWith(prefix)) {
                args.push(...body.split(/ +/));
            }
            for (const key of allOnAnyEvent) {
                const command = GoatBot.commands.get(key);
                if (!command) continue;
                const commandName = command.config.name;
                const roleConfig = getRoleConfig(utils, command, isGroup, threadData, commandName);
                const needRole = roleConfig.onEvent;
                if (needRole > role && isGroup) continue;

                const getText2 = createGetText2(langCode, `${process.cwd()}/languages/events/${langCode}.js`, prefix, command);
                const time = getTime("DD/MM/YYYY HH:mm:ss");
                if (isBannedOrOnlyAdmin(userData, threadData, senderID, threadID, isGroup, commandName, message, langCode)) continue;
                try {
                    const handlerResult = await command.onAnyEvent({
                        ...parameters,
                        args,
                        commandName,
                        getLang: getText2
                    });
                    if (typeof handlerResult === "function") {
                        await handlerResult();
                        log.info("onAnyEvent", `${commandName} | ${senderID} | ${threadID}`);
                    }
                } catch (err) {
                    log.err("onAnyEvent", `Error onAnyEvent for ${commandName}`, err);
                }
            }
        }

        // Execute
        await onStart();
        await onReply();
        await onChat();
        await onReaction();
        await onAnyEvent();
        // could add onFirstChat, handlerEvent, onEvent likewise if needed

        return;
    };
};
