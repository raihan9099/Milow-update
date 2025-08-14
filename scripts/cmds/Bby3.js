const axios = require('axios');
const baseApiUrl = async () => {
  return "https://www.noobs-api.rf.gd/dipto";
};

module.exports.config = {
  name: "bby",
  aliases: ["baby", "bbe", "babe"],
  version: "6.9.0",
  author: "dipto",
  countDown: 0,
  role: 0,
  description: "better then all sim simi",
  category: "chat",
  guide: {
    en: "{pn} [anyMessage] OR\nteach [YourMessage] - [Reply1], [Reply2], [Reply3]... OR\nteach [react] [YourMessage] - [react1], [react2], [react3]... OR\nremove [YourMessage] OR\nrm [YourMessage] - [indexNumber] OR\nmsg [YourMessage] OR\nlist OR \nall OR\nedit [YourMessage] - [NeeMessage]"
  }
};

module.exports.onStart = async ({ api, event, args, usersData }) => {
  const link = `${await baseApiUrl()}/baby`;
  const dipto = args.join(" ").toLowerCase();
  const uid = event.senderID;
  let command, comd, final;

  try {
    if (!args[0]) {
      const ran = [
        "Bolo baby",
        "hum",
        "type help baby",
        "type !baby hi"
      ];
      return api.sendMessage(ran[Math.floor(Math.random() * ran.length)], event.threadID, event.messageID);
    }

    if (args[0] === 'remove') {
      const fina = dipto.replace("remove ", "");
      const dat = (await axios.get(`${link}?remove=${fina}&senderID=${uid}`)).data.message;
      return api.sendMessage(dat, event.threadID, event.messageID);
    }

    if (args[0] === 'rm' && dipto.includes('-')) {
      const [fi, f] = dipto.replace("rm ", "").split(' - ');
      const da = (await axios.get(`${link}?remove=${fi}&index=${f}`)).data.message;
      return api.sendMessage(da, event.threadID, event.messageID);
    }

    if (args[0] === 'list') {
      if (args[1] === 'all') {
        const data = (await axios.get(`${link}?list=all`)).data;
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
        const d = (await axios.get(`${link}?list=all`)).data.length;
        return api.sendMessage(`Total Teach = ${d}`, event.threadID, event.messageID);
      }
    }

    if (args[0] === 'msg') {
      const fuk = dipto.replace("msg ", "");
      const d = (await axios.get(`${link}?list=${fuk}`)).data.data;
      return api.sendMessage(`Message ${fuk} = ${d}`, event.threadID, event.messageID);
    }

    if (args[0] === 'edit') {
      const command = dipto.split(' - ')[1];
      if (command.length < 2) return api.sendMessage('❌ | Invalid format! Use edit [YourMessage] - [NewReply]', event.threadID, event.messageID);
      const dA = (await axios.get(`${link}?edit=${args[1]}&replace=${command}&senderID=${uid}`)).data.message;
      return api.sendMessage(`changed ${dA}`, event.threadID, event.messageID);
    }

    if (args[0] === 'teach' && args[1] !== 'amar' && args[1] !== 'react') {
      [comd, command] = dipto.split(' - ');
      final = comd.replace("teach ", "");
      if (command.length < 2) return api.sendMessage('❌ | Invalid format!', event.threadID, event.messageID);
      const re = await axios.get(`${link}?teach=${final}&reply=${command}&senderID=${uid}`);
      const tex = re.data.message;
      const teacher = (await usersData.get(re.data.teacher)).name;
      return api.sendMessage(`✅ Replies added ${tex}\nTeacher: ${teacher}\nTeachs: ${re.data.teachs}`, event.threadID, event.messageID);
    }

    if (args[0] === 'teach' && args[1] === 'amar') {
      [comd, command] = dipto.split(' - ');
      final = comd.replace("teach ", "");
      if (command.length < 2) return api.sendMessage('❌ | Invalid format!', event.threadID, event.messageID);
      const tex = (await axios.get(`${link}?teach=${final}&senderID=${uid}&reply=${command}&key=intro`)).data.message;
      return api.sendMessage(`✅ Replies added ${tex}`, event.threadID, event.messageID);
    }

    if (args[0] === 'teach' && args[1] === 'react') {
      [comd, command] = dipto.split(' - ');
      final = comd.replace("teach react ", "");
      if (command.length < 2) return api.sendMessage('❌ | Invalid format!', event.threadID, event.messageID);
      const tex = (await axios.get(`${link}?teach=${final}&react=${command}`)).data.message;
      return api.sendMessage(`✅ Replies added ${tex}`, event.threadID, event.messageID);
    }

    if (dipto.includes('amar name ki') || dipto.includes('amr nam ki') || dipto.includes('amar nam ki') || dipto.includes('amr name ki') || dipto.includes('whats my name')) {
      const data = (await axios.get(`${link}?text=amar name ki&senderID=${uid}&key=intro`)).data.reply;
      return api.sendMessage(data, event.threadID, event.messageID);
    }

    const d = (await axios.get(`${link}?text=${dipto}&senderID=${uid}&font=1`)).data.reply;
    api.sendMessage(d, event.threadID, (error, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName: this.config.name,
        type: "reply",
        messageID: info.messageID,
        author: event.senderID,
        d, 
        apiUrl: link
      });
    }, event.messageID);

  } catch (e) {
    console.log(e);
    api.sendMessage("Check console for error", event.threadID, event.messageID);
  }
};

module.exports.onReply = async ({ api, event, Reply }) => {
  try {
    if (event.type == "message_reply") {
      const a = (await axios.get(`${await baseApiUrl()}/baby?text=${encodeURIComponent(event.body?.toLowerCase())}&senderID=${event.senderID}&font=1`)).data.reply;
      await api.sendMessage(a, event.threadID, (error, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          type: "reply",
          messageID: info.messageID,
          author: event.senderID,
          a
        });
      }, event.messageID);
    }  
  } catch (err) {
    return api.sendMessage(`Error: ${err.message}`, event.threadID, event.messageID);
  }
};

module.exports.onChat = async ({ api, event, message }) => {
  try {
    const body = event.body ? event.body?.toLowerCase() : "";
    if (body.startsWith("baby")|| body.startsWith("milu") || body.startsWith("milow")|| body.startsWith("Mehreen")|| body.startsWith("hi") || body.startsWith("bby") || body.startsWith("raihan")|| body.startsWith("nobita") || body.startsWith("bot")) {
      const arr = body.replace(/^\S+\s*/, "");
      const randomReplies = [
        "_ফা𝐬𝐭 𝐛𝐨ল 𝐛𝐮সি 𝐚𝐜𝐡𝐢?!",
        "𝐈𝐦 𝐕𝐨𝐝𝐫𝐨 𝐚𝐧𝐝 𝐮?!",
        "🍺 𝐄𝐢 𝐧𝐚𝐨 𝐣𝐮𝐬 𝐤𝐡𝐚𝐨..! 𝗕𝗯𝘆 𝐛𝐨𝐥𝐭𝐞 𝐛𝐨𝐥𝐭𝐞 𝐡𝐚𝐩𝐚𝐢 𝐠𝐞𝐜𝐡𝐨 𝐧𝐚 🥲",
        "𝐃𝐞𝐤𝐡𝐚 𝐡𝐨𝐥𝐞 𝐤𝐚𝐭𝐡𝐠𝐨𝐥𝐚𝐩 𝐝𝐢𝐨..🤗",
        "𝐀𝐦𝐚𝐤𝐞 𝐝𝐚𝐤𝐥𝐞 ,𝐚𝐦𝐢 𝐤𝐢𝐧𝐭𝐮 𝐊𝐢𝐬𝐬 𝐤𝐨𝐫𝐞 𝐝𝐢𝐛𝐨 😘",
        "__𝐁𝐞𝐬𝐢 𝐛𝐞𝐛𝐢 𝐛𝐨𝐥𝐥𝐞 𝐤𝐚𝐦𝐮𝐫 𝐝𝐢𝐦𝐮,,🤭🤭",
        "‎𝐈 𝐥𝐨𝐯𝐞 𝐲𝐨𝐮! 𝐀𝐦𝐚𝐫 𝐬𝐨𝐧𝐚, 𝐦𝐨𝐲𝐧𝐚, 𝐭𝐢𝐲𝐚 😍",
        "‎𝐀𝐦𝐚𝐤𝐞 𝐤𝐢 𝐭𝐮𝐦𝐢 𝐛𝐡𝐚𝐥𝐨𝐛𝐚𝐬𝐨?",
        "𝗝𝗮 𝐯𝐚𝐠 ,𝗖𝗵𝗶𝐩𝐚𝐁𝐚𝐳__😼",
        "𝐓𝐮𝐢 𝐬𝐞𝐢 𝐥𝐮𝐢𝐜𝐜𝐡𝐚𝐭𝐚 𝐧𝐚 !? 🙂🔪",
        "𝐊𝐢 𝐡𝐨𝐢𝐬𝐞 𝐚𝐦𝐚𝐫 𝐤𝐢 𝐤𝐚𝐣𝐞 𝐥𝐚𝐠𝐛𝐞 𝐭𝐮𝐫 !?🌚👀",
        "𝐓𝐨𝐫 𝐤𝐨𝐭𝐡𝐚 𝐭𝐨𝐫 𝐛𝐚𝐫𝐢 𝐤𝐞𝐮 𝐬𝐮𝐧𝐞 𝐧𝐚 ,𝐭𝐨 𝐚𝐦𝐢 𝐤𝐞𝐧𝐨 𝐬𝐮𝐧ବো ?🤔😂",
        "𝗕𝐞𝐬𝐢 𝐝𝐚𝐤𝐥𝐞 𝐚𝐦𝐦𝐮 𝐛𝐨𝐤𝐚 𝐝𝐞𝐛𝐚 𝐭𝐨__🥺",
        "𝗮𝐦𝐢 𝐛𝐨𝐭 𝐧𝐚 𝐚𝐦𝐚𝐤𝐞 𝗯𝗯𝘆 𝐛𝐨𝐥𝐨 𝐛𝐛𝐲!!😘",
        "🥀 𝐓𝐨𝐫 𝐡𝐚𝐚𝐭 𝐝𝐡𝐨𝐫𝐥𝐞 𝐦𝐨𝐧 𝐡𝐨𝐲 𝐚𝐦𝐢 𝐛𝐚𝐭𝐭𝐞𝐫𝐲 𝐜𝐡𝐚𝐫𝐠𝐞 𝐤𝐨𝐫𝐭𝐞𝐬𝐢.",
        "👀 𝐓𝐮𝐢 𝐚𝐦𝐚𝐫 𝐜𝐡𝐨𝐤𝐡 𝐞𝐫 𝐯𝐢𝐭𝐚𝐦𝐢𝐧... 𝐝𝐞𝐤𝐡𝐚 𝐧𝐚 𝐝𝐢𝐥𝐞 𝐚𝐦𝐢 𝐰𝐞𝐚𝐤 𝐡𝐨𝐲𝐞 𝐣𝐚𝐢.",
        "🔥 𝐓𝐨𝐫 𝐞𝐤𝐭𝐚 𝐡𝐚𝐥𝐟 𝐬𝐦𝐢𝐥𝐞 𝐚𝐦𝐚𝐫 𝐟𝐮𝐥𝐥 𝐦𝐨𝐨𝐝 𝐜𝐡𝐚𝐧𝐠𝐞 𝐤𝐨𝐫𝐞 𝐝𝐢𝐬𝐡𝐞.",
        "💋 𝐂𝐡𝐚𝐧𝐝𝐞𝐫 𝐚𝐥𝐨 𝐭𝐞 𝐭𝐨𝐫 𝐦𝐮𝐤𝐡 𝐝𝐞𝐤𝐡𝐥𝐞 𝐦𝐨𝐧 𝐡𝐨𝐲 𝐜𝐡𝐨𝐫𝐢 𝐤𝐨𝐫𝐞 𝐧𝐢𝐲𝐞 𝐣𝐚𝐢."
      ];
      if (!arr) { 
        await api.sendMessage(randomReplies[Math.floor(Math.random() * randomReplies.length)], event.threadID, (error, info) => {
          if (!info) message.reply("info obj not found");
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID
          });
        }, event.messageID);
        return;
      }
      const a = (await axios.get(`${await baseApiUrl()}/baby?text=${encodeURIComponent(arr)}&senderID=${event.senderID}&font=1`)).data.reply;
      await api.sendMessage(a, event.threadID, (error, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          type: "reply",
          messageID: info.messageID,
          author: event.senderID,
          a
        });
      }, event.messageID);
    }
  } catch (err) {
    return api.sendMessage(`Error: ${err.message}`, event.threadID, event.messageID);
  }
};
