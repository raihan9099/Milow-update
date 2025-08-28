const { getTime, drive } = global.utils;
if (!global.temp.welcomeEvent)
        global.temp.welcomeEvent = {};

module.exports = {
        config: {
                name: "welcome",
                version: "1.7",
                author: "Chitron Bhattacharjee",
                category: "events"
        },

        langs: {
                en: {
                        session1: "Morning",
                        session2: "Day",
                        session3: "Evening",
                        session4: "Night",
                        welcomeMessage: `
🤖 Thank you Baby for inviting me! 🌟
🚀 Let's get started! Here's some useful information:

- prefix: %1

- To discover the list of available commands, type: !help
📚 Need assistance or have questions?
Feel free to reach out admins anytime. 
Enjoy your time in the group! 🌈✨
`,
                        multiple1: "আপনি",
                        multiple2: "আপনারা",
                        defaultWelcomeMessage:
`👋 Hello dear, {userNameTag} Welcome ✨
🌟 you just joined the chat ✵ Group ▸:[ {threadName} ]

🔔 Tip: Introduce yourself or try a command to explore what I can do • remember, great conversations start with a hello✵
Hope you're having a great {session}!
My Prefix: ${prefix} | Type ${prefix}Help to see menu
Added by: {addedBy}`
                }
        },

        onStart: async ({ threadsData, message, event, api, getLang }) => {
                if (event.logMessageType == "log:subscribe")
                        return async function () {
                                const hours = getTime("HH");
                                const { threadID } = event;
                                const { nickNameBot } = global.GoatBot.config;
                                const prefix = global.utils.getPrefix(threadID);
                                const dataAddedParticipants = event.logMessageData.addedParticipants;

                                // If bot was added
                                if (dataAddedParticipants.some((item) => item.userFbId == api.getCurrentUserID())) {
                                        if (nickNameBot)
                                                api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());
                                        return message.send(getLang("welcomeMessage", prefix));
                                }

                                if (!global.temp.welcomeEvent[threadID])
                                        global.temp.welcomeEvent[threadID] = {
                                                joinTimeout: null,
                                                dataAddedParticipants: []
                                        };

                                global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
                                clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

                                global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async function () {
                                        const threadData = await threadsData.get(threadID);
                                        if (threadData.settings.sendWelcomeMessage === false)
                                                return;
                                        const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
                                        const dataBanned = threadData.data.banned_ban || [];
                                        const threadName = threadData.threadName;
                                        const userName = [], mentions = [];
                                        let multiple = false;

                                        if (dataAddedParticipants.length > 1)
                                                multiple = true;

                                        for (const user of dataAddedParticipants) {
                                                if (dataBanned.some((item) => item.id == user.userFbId)) continue;
                                                userName.push(user.fullName);
                                                mentions.push({
                                                        tag: user.fullName,
                                                        id: user.userFbId
                                                });
                                        }
                                        if (userName.length === 0) return;

                                        let { welcomeMessage = getLang("defaultWelcomeMessage") } = threadData.data;

                                        const form = {
                                                mentions: welcomeMessage.includes("{userNameTag}") ? mentions : null
                                        };

                                        welcomeMessage = welcomeMessage
                                                .replace(/\{userName\}/g, userName.join(", "))
                                                .replace(/\{userNameTag\}/g, mentions.map(m => m.tag).join(", "))
                                                .replace(/\{boxName\}|\{threadName\}/g, threadName)
                                                .replace(/\{multiple\}/g, multiple ? getLang("multiple2") : getLang("multiple1"))
                                                .replace(/\{session\}/g,
                                                        hours <= 10 ? getLang("session1") :
                                                        hours <= 12 ? getLang("session2") :
                                                        hours <= 18 ? getLang("session3") :
                                                        getLang("session4")
                                                );

                                        form.body = welcomeMessage;

                                        if (threadData.data.welcomeAttachment) {
                                                const files = threadData.data.welcomeAttachment;
                                                const attachments = files.reduce((acc, file) => {
                                                        acc.push(drive.getFile(file, "stream"));
                                                        return acc;
                                                }, []);
                                                form.attachment = (await Promise.allSettled(attachments))
                                                        .filter(({ status }) => status === "fulfilled")
                                                        .map(({ value }) => value);
                                        }
                                        message.send(form);
                                        delete global.temp.welcomeEvent[threadID];
                                }, 1500);
                        };
        }
};
