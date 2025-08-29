const axios = require('axios');
const baseApiUrl = "https://www.noobs-api.rf.gd/dipto";

module.exports.config = {
    name: "bby",
    aliases: ["baby", "bbe", "babe"],
    version: "6.9.2",
    author: "dipto",
    countDown: 0,
    role: 0,
    description: "Better than all sim simi",
    category: "chat",
    guide: {
        en: "{pn} [message] OR\nteach [msg] - [reply1, reply2...] OR\nteach react [msg] - [react1, react2...] OR\nremove [msg] OR\nrm [msg] - [index] OR\nmsg [msg] OR\nlist OR all OR edit [msg] - [newReply]"
    }
};

const FONT_STYLE = 17; // All replies will use font 17

// Helper function for axios requests with font
async function apiRequest(path) {
    return (await axios.get(`${baseApiUrl}/baby?${path}&font=${FONT_STYLE}`)).data;
}

module.exports.onStart = async ({ api, event, args, usersData }) => {
    const input = args.join(" ").toLowerCase();
    const uid = event.senderID;

    try {
        if (!args[0]) {
            const prompts = ["Bolo baby", "hum", "type help baby", "type !baby hi"];
            return api.sendMessage(prompts[Math.floor(Math.random() * prompts.length)], event.threadID, event.messageID);
        }

        // Remove commands
        if (args[0] === 'remove') {
            const msg = input.replace("remove ", "");
            const res = await apiRequest(`remove=${msg}&senderID=${uid}`);
            return api.sendMessage(res.message, event.threadID, event.messageID);
        }

        if (args[0] === 'rm' && input.includes('-')) {
            const [msg, index] = input.replace("rm ", "").split(' - ');
            const res = await apiRequest(`remove=${msg}&index=${index}`);
            return api.sendMessage(res.message, event.threadID, event.messageID);
        }

        // List commands
        if (args[0] === 'list') {
            if (args[1] === 'all') {
                const data = await apiRequest("list=all");
                const teachers = await Promise.all(data.teacher.teacherList.map(async (item) => {
                    const number = Object.keys(item)[0];
                    const value = item[number];
                    const name = (await usersData.get(number)).name;
                    return { name, value };
                }));
                teachers.sort((a, b) => b.value - a.value);
                const output = teachers.map((t, i) => `${i + 1}/ ${t.name}: ${t.value}`).join('\n');
                return api.sendMessage(`Total Teach = ${data.length}\n👑 | List of Teachers of baby\n${output}`, event.threadID, event.messageID);
            } else {
                const d = await apiRequest("list=all");
                return api.sendMessage(`Total Teach = ${d.length}`, event.threadID, event.messageID);
            }
        }

        // Message command
        if (args[0] === 'msg') {
            const msg = input.replace("msg ", "");
            const res = await apiRequest(`list=${msg}`);
            return api.sendMessage(`Message ${msg} = ${res.data}`, event.threadID, event.messageID);
        }

        // Edit command
        if (args[0] === 'edit') {
            const [oldMsg, newMsg] = input.split(' - ');
            if (!newMsg) return api.sendMessage('❌ | Invalid format! Use edit [msg] - [newReply]', event.threadID, event.messageID);
            const res = await apiRequest(`edit=${args[1]}&replace=${newMsg}&senderID=${uid}`);
            return api.sendMessage(`Changed: ${res.message}`, event.threadID, event.messageID);
        }

        // Teach commands
        if (args[0] === 'teach') {
            const [commandPart, replyPart] = input.split(' - ');
            if (!replyPart) return api.sendMessage('❌ | Invalid format!', event.threadID, event.messageID);

            if (args[1] === 'react') {
                const msg = commandPart.replace("teach react ", "");
                const res = await apiRequest(`teach=${msg}&react=${replyPart}`);
                return api.sendMessage(`✅ Replies added ${res.message}`, event.threadID, event.messageID);
            }

            if (args[1] === 'amar') {
                const msg = commandPart.replace("teach ", "");
                const res = await apiRequest(`teach=${msg}&senderID=${uid}&reply=${replyPart}&key=intro`);
                return api.sendMessage(`✅ Replies added ${res.message}`, event.threadID, event.messageID);
            }

            // Normal teach
            const msg = commandPart.replace("teach ", "");
            const res = await apiRequest(`teach=${msg}&reply=${replyPart}&senderID=${uid}`);
            const teacherName = (await usersData.get(res.teacher)).name;
            return api.sendMessage(`✅ Replies added ${res.message}\nTeacher: ${teacherName}\nTeachs: ${res.teachs}`, event.threadID, event.messageID);
        }

        // Name queries
        if (/amar name ki|amr nam ki|amar nam ki|amr name ki|whats my name/.test(input)) {
            const res = await apiRequest(`text=amar name ki&senderID=${uid}&key=intro`);
            return api.sendMessage(res.reply, event.threadID, event.messageID);
        }

        // Default chat
        const res = await apiRequest(`text=${encodeURIComponent(input)}&senderID=${uid}`);
        api.sendMessage(res.reply, event.threadID, (err, info) => {
            global.GoatBot.onReply.set(info.messageID, {
                commandName: this.config.name,
                type: "reply",
                messageID: info.messageID,
                author: uid,
                reply: res.reply
            });
        }, event.messageID);

    } catch (err) {
        console.log(err);
        api.sendMessage("❌ Error occurred, check console", event.threadID, event.messageID);
    }
};

module.exports.onReply = async ({ api, event }) => {
    try {
        if (event.type === "message_reply") {
            const res = await apiRequest(`text=${encodeURIComponent(event.body?.toLowerCase())}&senderID=${event.senderID}`);
            await api.sendMessage(res.reply, event.threadID, (err, info) => {
                global.GoatBot.onReply.set(info.messageID, {
                    commandName: this.config.name,
                    type: "reply",
                    messageID: info.messageID,
                    author: event.senderID,
                    reply: res.reply
                });
            }, event.messageID);
        }
    } catch (err) {
        return api.sendMessage(`❌ Error: ${err.message}`, event.threadID, event.messageID);
    }
};

module.exports.onChat = async ({ api, event }) => {
    try {
        const body = event.body?.toLowerCase() || "";
        if (/^(baby|bby|bot|raihan|babu|janu)/.test(body)) {
            const msg = body.replace(/^\S+\s*/, "");
            const defaultReplies = ["_ꜰᴀꜱᴛ ʙᴏʟ ʙᴜꜱɪ ᴀᴄʜɪ?! 😏",
  "ᴇɪ ɴᴀᴏ ᴊᴜꜱ ᴋʜᴀᴏ..! ʙʙʏ ʙᴏʟᴛᴇ ʙᴏʟᴛᴇ ʜᴀᴘᴀɪ ɢᴇᴄʜᴏ ɴᴀ 🥲",
  "ᴅᴇᴋʜᴀ ʜᴏʟᴇ ᴋᴀᴛʜɢᴏʟᴀᴘ ᴅɪᴏ..🤗",
  "ᴀᴍᴀᴋᴇ ᴅᴀᴋʟᴇ, ᴀᴍɪ ᴋɪɴᴛᴜ ᴋɪꜱꜱ ᴋᴏʀᴇ ᴅɪʙᴏ 😘",
  "ʙᴇꜱɪ ʙᴇʙɪ ʙᴏʟʟᴇ ᴋᴀᴍᴜʀ ᴅɪᴍᴜ,,🤭",
  "ɪ ʟᴏᴠᴇ ʏᴏᴜ! ᴀᴍᴀʀ ꜱᴏɴᴀ, ᴍᴏʏɴᴀ, ᴛɪʏᴀ 😍",
  "ᴀᴍᴀᴋᴇ ᴋɪ ᴛᴜᴍɪ ʙʜᴀʟᴏʙᴀꜱᴏ? 💕",
  "ᴊᴀ ᴠᴀɢ, ᴄʜɪᴘᴀʙᴀᴢ__😼",
  "ᴛᴜɪ ꜱᴇɪ ʟᴜɪᴄᴄʜᴀᴛᴀ ɴᴀ!? 🙂🔪",
  "ᴋɪ ʜᴏɪꜱᴇ ᴀᴍᴀʀ ᴋɪ ᴋᴀᴊᴇ ʟᴀɢʙᴇ ᴛᴜʀ!? 🌚👀",
  "ᴛᴏʀ ᴋᴏᴛʜᴀ ᴛᴏʀ ʙᴀʀɪ ᴋᴇᴜ ꜱᴜɴᴇ ɴᴀ, ᴛᴏ ᴀᴍɪ ᴋᴇɴᴏ ꜱᴜɴʙᴏ? 🤔😂",
  "ʙᴇꜱɪ ᴅᴀᴋʟᴇ ᴀᴍᴍᴜ ʙᴏᴋᴀ ᴅᴇʙᴀ ᴛᴏ__🥺",
  "ᴀᴍɪ ʙᴏᴛ ɴᴀ, ᴀᴍᴀᴋᴇ ʙʙʏ ʙᴏʟᴏ ʙʙʏ!! 😘",
  "ᴛᴏʀ ʜᴀᴀᴛ ᴅʜᴏʀʟᴇ ᴍᴏɴ ʜᴏʏ ᴀᴍɪ ʙᴀᴛᴛᴇʀʏ ᴄʜᴀʀɢᴇ ᴋᴏʀᴛᴇꜱɪ 🥀",
  "ᴛᴜɪ ᴀᴍᴀʀ ᴄʜᴏᴋʜ ᴇʀ ᴠɪᴛᴀᴍɪɴ… ᴅᴇᴋʜᴀ ɴᴀ ᴅɪʟᴇ ᴀᴍɪ ᴡᴇᴀᴋ ʜᴏʏᴇ ᴊᴀɪ 👀",
  "ᴛᴏʀ ᴇᴋᴛᴀ ʜᴀʟꜰ ꜱᴍɪʟᴇ ᴀᴍᴀʀ ꜰᴜʟʟ ᴍᴏᴏᴅ ᴄʜᴀɴɢᴇ ᴋᴏʀᴇ ᴅɪꜱʜᴇ 🔥",
  "ᴄʜᴀɴᴅᴇʀ ᴀʟᴏ ᴛᴇ ᴛᴏʀ ᴍᴜᴋʜ ᴅᴇᴋʜʟᴇ ᴍᴏɴ ʜᴏʏ ᴄʜᴏʀɪ ᴋᴏʀᴇ ɴɪʏᴇ ᴊᴀɪ 💋",
  "_tumi ajke eto cute keno lagcho? 😳",
  "_amar sathe thakle tumi raat bhule jabe 🔥",
  "_tumi amar sathe moja korte ready? 😈",
  "_ajke amar sathe ki mischievous hote chao? 😏",
  "_tumi amar chokhe chokh dile ki korbe? 😌",
  "_amar haate haath dile tumi shy hobe naki? 😳",
  "_tumi ajke amar moto playful? 🤭",
  "_amar sathe ekta naughty plan korbe? 😈",
  "_tor smile amar mon dhuke dicche 💓",
  "_cholo ekta little secret share kori… 😏",
  "_tumi amar moto teasing korte paro naki? 😏",
  "_ajke ki tumi amar kache blush korbe? 😳",
  "_amar kache thakle tumi shy hobe bujhte parchi 😏",
  "_tumi amar moto playful ar horny hobe 🔥",
  "_ajke tor haat dhorte chai 😌",
  "_tumi amar kache thakle raat ta magic hobe ✨",
  "_tor chokh amar mon hilay 😏",
  "_tumi ajke amar moto excited? 😈",
  "_cholo ekta flirty game khelbo 😏",
  "_amar sathe thakle tumi blush ar smile ek shathe pabe 😳",
  "_tumi amar moto naughty hoye gel 🥰",
  "_ajke ki tumi amar kotha bhabte thako? 😏",
  "_tui amar moto mischievous ar cute naki? 😈",
  "_tumi amar sathe ekta flirty secret share korbe? 😏",
  "_amar chokh er samne thakle tumi lost hobe 🔥",
  "_tui amar moto playful ar teasing korte bhalo basho? 😏",
  "_amar sathe thakle tumi raat ta bhule jabe 🌚",
  "_ajke tor mukh dekhe amar mon korte chai 💋",
  "_tumi amar moto naughty ar flirty naki? 😈",
  "_amar haat dhorte tumi ready? 😏",
"_cholo ekta naughty plan start kori 😏",
"_amar sathe thakle tumi shy, ar excited hobe ek shathe 🔥"😚", "Yes 😀, I am here", "What's up?", "Bolo jaan ki korte panmr jonno"];
            if (!msg) {
                await api.sendMessage(defaultReplies[Math.floor(Math.random() * defaultReplies.length)], event.threadID, (err, info) => {
                    global.GoatBot.onReply.set(info.messageID, {
                        commandName: this.config.name,
                        type: "reply",
                        messageID: info.messageID,
                        author: event.senderID
                    });
                }, event.messageID);
            } else {
                const res = await apiRequest(`text=${encodeURIComponent(msg)}&senderID=${event.senderID}`);
                await api.sendMessage(res.reply, event.threadID, (err, info) => {
                    global.GoatBot.onReply.set(info.messageID, {
                        commandName: this.config.name,
                        type: "reply",
                        messageID: info.messageID,
                        author: event.senderID,
                        reply: res.reply
                    });
                }, event.messageID);
            }
        }
    } catch (err) {
        return api.sendMessage(`❌ Error: ${err.message}`, event.threadID, event.messageID);
    }
};
