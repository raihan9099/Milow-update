const axios = require("axios");

const getAPIBase = async () => {
  const { data } = await axios.get(
    "https://raw.githubusercontent.com/EwrShAn25/ShAn.s-Api/refs/heads/main/Api.json"
  );
  return data.shan;
};

const sendMessage = (api, threadID, message, messageID) =>
  api.sendMessage(message, threadID, messageID);

const cError = (api, threadID, messageID) =>
  sendMessage(api, threadID, "error🦆💨", messageID);

const teachBot = async (api, threadID, messageID, senderID, teachText) => {
  const [ask, answers] = teachText.split(" - ").map(text => text.trim());
  if (!ask || !answers) {
    return sendMessage(api, threadID, "Invalid format. Use: {pn} teach <ask> - <answer1, answer2, ...>", messageID);
  }

  const answerArray = answers.split(",").map(ans => ans.trim()).filter(ans => ans !== "");

  try {
    const apiBase = await getAPIBase();
    if (!apiBase) return cError(api, threadID, messageID);

    const res = await axios.get(
      `${apiBase}/ShAn-teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(answerArray.join(","))}&uid=${senderID}`
    );

    let responseMsg;
    
    switch (res.data?.status) {
      case "Already Exists":
        responseMsg = "🎀Answers have already been taught!";
        break;
        
      case "Partial Success":
        responseMsg = `🔄 Added new answers to existing question!\n` +
                     `📖 Question: ${res.data.ask}\n` +
                     `➕ New Answers: ${res.data.message.replace('Added new answers: ', '')}\n` +
                     `🏆 Your Total Teachings: ${res.data.userStats.totalTeachings}`;
        break;
        
      case "Success":
        responseMsg = `✅ Successfully taught new question!\n` +
                     `📖 Question: ${res.data.ask}\n` +
                     `📝 Answers: ${answerArray.join(", ")}\n` +
                     `🏆 Your Total Teachings: ${res.data.userStats.totalTeachings}`;
        break;
        
      default:
        responseMsg = res.data?.message || "❌ Teaching failed.";
    }

    return sendMessage(api, threadID, responseMsg, messageID);
    
  } catch (error) {
    console.error('Teaching error:', error);
    return cError(api, threadID, messageID);
  }
};

const talkWithBot = async (api, threadID, messageID, senderID, input) => {
  try {
    const apiBase = await getAPIBase();
    if (!apiBase) return cError(api, threadID, messageID);

    const res = await axios.get(
      `${apiBase}/ShAn-bby?text=${encodeURIComponent(input)}&uid=${senderID}&font=2`
    );

    const reply = res.data?.text || "Please teach me this sentence!🦆💨";
    const react = res.data.react || "🤷🏻‍♀️";

    return api.sendMessage(reply + react, threadID, (error, info) => {
      if (error) return cError(api, threadID, messageID);
      if (!global.GoatBot.onReply) global.GoatBot.onReply = new Map();
      global.GoatBot.onReply.set(info.messageID, {
        commandName: module.exports.config.name,
        type: "reply",
        author: senderID,
        msg: reply,
      });
    }, messageID);
  } catch {
    return cError(api, threadID, messageID);
  }
};

const botMsgInfo = async (api, threadID, messageID, senderID, input) => {
  try {
    const apiBase = await getAPIBase();
    if (!apiBase) return cError(api, threadID, messageID);

    const res = await axios.get(
      `${apiBase}/ShAn-msg?ask=${encodeURIComponent(input)}&uid=${senderID}`
    );

    if (!res.data || res.data.status !== "Success" || !Array.isArray(res.data.messages) || res.data.messages.length === 0) {
      return sendMessage(api, threadID, "No matching messages found!🦆💨", messageID);
    }

    const askText = `📜 Ask: ${res.data.ask}\n\n`;
    const answers = res.data.messages.map(msg => `🎀 [${msg.index}] ${msg.ans}`).join("\n");

    return sendMessage(api, threadID, `${askText}${answers}`, messageID);
  } catch {
    return cError(api, threadID, messageID);
  }
};

const deleteMessage = async (api, threadID, messageID, senderID, input) => {
  try {
    const parts = input.split(" - ").map(part => part.trim());

    if (!parts[0]) {
      return sendMessage(api, threadID, "Invalid format. Use: {pn} delete <text> OR {pn} delete <text> - <index>", messageID);
    }

    const text = parts[0];
    const index = parts[1] && !isNaN(parts[1]) ? parseInt(parts[1], 10) : null;

    const apiBase = await getAPIBase();
    if (!apiBase) return cError(api, threadID, messageID);

    let url = `${apiBase}/ShAn-delete?text=${encodeURIComponent(text)}&uid=${senderID}`;
    if (index !== null) url += `&index=${index}`;

    const res = await axios.get(url);

    return sendMessage(api, threadID, res.data?.status === "Success"
      ? `✅ Successfully deleted ${index !== null ? `answer at index ${index} of` : "all answers related to"}: ${text}`
      : res.data?.message || "❌ Failed to delete the message!", messageID);
  } catch {
    return cError(api, threadID, messageID);
  }
};

const editMessage = async (api, threadID, messageID, senderID, input) => {
  try {
    const parts = input.split(" - ").map(part => part.trim());

    if (parts.length < 2) {
      return sendMessage(api, threadID, "Invalid format. Use:\n1. {pn} edit <ask> - <newAsk>\n2. {pn} edit <ask> - <index> - <newAnswer>", messageID);
    }

    const [ask, newAskOrIndex, newAns] = parts;
    const apiBase = await getAPIBase();
    if (!apiBase) return cError(api, threadID, messageID);

    if (!isNaN(newAskOrIndex) && newAns) {
      const index = parseInt(newAskOrIndex, 10);

      const res = await axios.get(
        `${apiBase}/ShAn-edit?ask=${encodeURIComponent(ask)}&index=${index}&newAns=${encodeURIComponent(newAns)}&uid=${senderID}`
      );

      return sendMessage(api, threadID, res.data?.status === "Success"
        ? `✅ Successfully updated answer at index ${index} to: ${newAns}`
        : res.data?.message || "❌ Failed to update the answer!", messageID);
    } else {
      const res = await axios.get(
        `${apiBase}/ShAn-edit?ask=${encodeURIComponent(ask)}&newAsk=${encodeURIComponent(newAskOrIndex)}&uid=${senderID}`
      );

      return sendMessage(api, threadID, res.data?.status === "Success"
        ? `✅ Successfully updated question to: ${newAskOrIndex}`
        : res.data?.message || "❌ Failed to update the question!", messageID);
    }
  } catch {
    return cError(api, threadID, messageID);
  }
};

module.exports.config = {
  name: "m",
  aliases: ["baby","bot", "raihan", "bby"],
  version: "1.6.9",
  author: "Raihan",
  role: 0,
  description: {
    en: "Talk with the bot or teach it new responses"
  },
  category: "𝗧𝗔𝗟𝗞",
  countDown: 3,
  guide: {
    en: `{p}{n} <text> - Ask the bot something\n{p}ShAn teach <ask> - <answer> - Teach the bot a new response\n\nExamples:\n1. {p}{n} Hello\n2. {p}ShAn teach hi - hello\n3. {p}ShAn delete <text> - Delete all answers related to text\n4. {p}ShAn delete <text> - <index> - Delete specific answer at index\n5. {p}ShAn edit <Ask> - <New Ask> to update the ask query\n6. {p}ShAn edit <ask> - <index> - <new ans> update specific answer at index`,
  },
};

module.exports.onStart = async ({ api, event, args }) => {
  const { threadID, messageID, senderID } = event;
  if (args.length === 0) {
    return sendMessage(api, threadID, "Please provide text or teach the bot!", messageID);
  }

  const input = args.join(" ").trim();
  const [command, ...rest] = input.split(" ");

  switch (command.toLowerCase()) {
    case "-t":
    case "teach":
      return teachBot(api, threadID, messageID, senderID, rest.join(" ").trim());
    case "-m":
    case "msg":
      return botMsgInfo(api, threadID, messageID, senderID, rest.join(" ").trim());
    case "-e":
    case "edit":
      return editMessage(api, threadID, messageID, senderID, rest.join(" ").trim());
    case "-d":
    case "delete":
    case "-r":
    case "remove":
      return deleteMessage(api, threadID, messageID, senderID, rest.join(" ").trim());
    default:
      return talkWithBot(api, threadID, messageID, senderID, input);
  }
};

module.exports.onChat = async ({ api, event }) => {
  const { threadID, messageID, body, senderID } = event;

const cMessages = ["🎀 Hello THERE!", "🎀 Hi there!","𝐁𝐚𝐛𝐮 𝐤𝐡𝐮𝐝𝐚 𝐥𝐚𝐠𝐬𝐞🥺",
"𝐇𝐨𝐩 𝐛𝐞𝐝𝐚😾,𝐁𝐨𝐬𝐬 𝐛𝐨𝐥 𝐛𝐨𝐬𝐬😼",
"𝐀𝐦𝐚𝐤𝐞 𝐝𝐚𝐤𝐥𝐞 ,𝐚𝐦𝐢 𝐤𝐢𝐧𝐭𝐮 𝐤𝐢𝐬 𝐤𝐨𝐫𝐞 𝐝𝐞𝐛𝐨😘",
"🐒🐒🐒",
"𝐁𝐲𝐞",
"𝐍𝐚𝐰 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐝𝐚𝐰 m.me/mahmud.x07",
"𝐌𝐛 𝐧𝐞𝐲 𝐛𝐲𝐞",
"𝐌𝐞𝐰𝐰",
"𝐆𝐨𝐥𝐚𝐩 𝐟𝐮𝐥 𝐞𝐫 𝐣𝐚𝐲𝐠𝐚𝐲 𝐚𝐦𝐢 𝐝𝐢𝐥𝐚𝐦 𝐭𝐨𝐦𝐚𝐲 𝐦𝐞𝐬𝐬𝐚𝐠𝐞",
"𝐁𝐨𝐥𝐨 𝐤𝐢 𝐛𝐨𝐥𝐛𝐚, 𝐬𝐨𝐛𝐚𝐫 𝐬𝐚𝐦𝐧𝐞 𝐛𝐨𝐥𝐛𝐚 𝐧𝐚𝐤𝐢?🤭🤏",
"𝐈 𝐥𝐨𝐯𝐞 𝐲𝐨𝐮__😘😘",
"𝐈 𝐡𝐚𝐭𝐞 𝐲𝐨𝐮__😏😏",
"𝐆𝐨𝐬𝐨𝐥 𝐤𝐨𝐫𝐞 𝐚𝐬𝐨 𝐣𝐚𝐨😑😩",
"𝐀𝐬𝐬𝐚𝐥𝐚𝐦𝐰𝐚𝐥𝐢𝐤𝐮𝐦",
"𝐊𝐞𝐦𝐨𝐧 𝐚𝐬𝐨",
"𝐁𝐨𝐥𝐞𝐧 𝐬𝐢𝐫__😌",
"𝐁𝐨𝐥𝐞𝐧 𝐦𝐚𝐝𝐚𝐦__😌",
"𝐀𝐦𝐢 ONNER 𝐣𝐢𝐧𝐢𝐬𝐞𝐫 𝐬𝐚𝐭𝐡𝐞 𝐤𝐨𝐭𝐡𝐚 𝐛𝐨𝐥𝐢 𝐧𝐚__😏𝐨𝐤𝐞",
"🙂🙂🙂",
"𝐄𝐭𝐚𝐲 𝐝𝐞𝐤𝐡𝐚𝐫 𝐛𝐚𝐤𝐢 𝐬𝐢𝐥𝐨_🙂🙂🙂",
"𝐁𝐛𝘆 𝐛𝐨𝐥𝐥𝐚 𝐩𝐚𝐩 𝐡𝐨𝐢𝐛𝐨 😒😒",
"𝐓𝐚𝐫𝐩𝐨𝐫 𝐛𝐨𝐥𝐨_🙂",
"𝐁𝐞𝐬𝐡𝐢 𝐝𝐚𝐤𝐥𝐞 𝐚𝐦𝐦𝐮 𝐛𝐨𝐤𝐚 𝐝𝐞𝐛𝐚 𝐭𝐨__🥺",
"𝐁𝐛𝘆 𝐧𝐚 𝐣𝐚𝐧𝐮, 𝐛𝐨𝐥 😌",
"𝐁𝐞𝐬𝐡𝐢 𝐛𝐛𝐲 𝐁𝐛𝐛𝐲 𝐤𝐨𝐫𝐥𝐞 𝐥𝐞𝐚𝐯𝐞 𝐧𝐢𝐛𝐨 𝐤𝐢𝐧𝐭𝐮 😒😒",
"__𝐁𝐞𝐬𝐡𝐢 𝐛𝐞𝐛𝐢 𝐛𝐨𝐥𝐥𝐞 𝐤𝐚𝐦𝐮𝐫 𝐝𝐢𝐦𝐮 🤭🤭",
"𝐓𝐮𝐦𝐚𝐫 𝐠𝐟 𝐧𝐚𝐢, 𝐭𝐚𝐲 𝐚𝐦𝐤 𝐝𝐚𝐤𝐬𝐨? 😂😂😂",
"𝐁𝐨𝐥𝐨 𝐛𝐚𝐛𝐲😒",
"𝐓𝐨𝐫 𝐤𝐨𝐭𝐡𝐚 𝐭𝐨𝐫 𝐛𝐚𝐝𝐢 𝐤𝐞𝐮 𝐬𝐮𝐧𝐞 𝐧𝐚, 𝐭𝐨 𝐚𝐦𝐢 𝐤𝐨𝐧𝐨 𝐬𝐮𝐧𝐛𝐨?🤔😂",
"𝐀𝐦𝐢 𝐭𝐨 𝐚𝐧𝐝𝐡 𝐤𝐢𝐜𝐡𝐮 𝐝𝐞𝐤𝐡𝐢 𝐧𝐚🐸 😎",
"𝐀𝐦 𝐠𝐚𝐜𝐡𝐞 𝐚𝐦 𝐧𝐚𝐢 𝐝𝐡𝐢𝐥 𝐤𝐞𝐧 𝐦𝐚𝐫𝐨, 𝐭𝐨𝐦𝐚𝐫 𝐬𝐚𝐭𝐡𝐞 𝐩𝐫𝐞𝐦 𝐧𝐚𝐢 𝐛𝐚𝐛𝐲 𝐤𝐞𝐧 𝐝𝐚𝐤𝐨 😒🫣",
"𝐎𝐢𝐢 𝐠𝐡𝐮𝐦𝐚𝐧𝐨𝐫 𝐚𝐠𝐞.! 𝐭𝐨𝐦𝐚𝐫 𝐦𝐨𝐧𝐭𝐚 𝐤𝐨𝐭𝐡𝐚𝐲 𝐫𝐚𝐤𝐡𝐞 𝐠𝐡𝐮𝐦𝐚𝐨.!🤔_𝐍𝐚𝐡 𝐦𝐚𝐧𝐞 𝐜𝐡𝐮𝐫𝐢 𝐤𝐨𝐫𝐭𝐚𝐦 😞😘",
"𝐁𝐛𝘆 𝐧𝐚 𝐛𝐨𝐥𝐞 𝐁𝐨𝐰 𝐛𝐨𝐥𝐨 😘",
"𝐃𝐮𝐫𝐞 𝐣𝐚, 𝐭𝐨𝐫 𝐤𝐨𝐧𝐨 𝐤𝐚𝐣 𝐧𝐚𝐢, 𝐬𝐡𝐮𝐝𝐮 𝐛𝐛𝐲 𝐛𝐛𝐲 𝐤𝐨𝐫𝐢𝐬 😉😋🤣",
"𝐄𝐢 𝐞𝐢 𝐭𝐨𝐫 𝐩𝐫𝐨𝐦𝐞𝐤𝐬𝐡𝐚 𝐤𝐨𝐛𝐞? 𝐬𝐡𝐮𝐝𝐮 𝐛𝐛𝐲 𝐛𝐛𝐲 𝐤𝐨𝐫𝐢𝐬 😾",
"𝐓𝐨𝐫𝐚 𝐣𝐞 𝐡𝐚𝐫𝐞 𝐛𝐛𝐲 𝐝𝐚𝐤𝐜𝐡𝐢𝐬 𝐚𝐦𝐢 𝐭𝐨 𝐬𝐨𝐭𝐭𝐢 𝐛𝐚𝐜𝐡𝐜𝐡𝐚 𝐡𝐨𝐞 𝐣𝐚𝐛𝐨_☹😑",
"𝐀𝐣𝐛 𝐭𝐨__😒",
"𝐀𝐦𝐚𝐤𝐞 𝐝𝐞𝐤𝐨 𝐧𝐚,𝐚𝐦𝐢 𝐛𝐚𝐲𝐚𝐬𝐭 𝐚𝐬𝐢🙆🏻‍♀",
"𝐁𝐛𝘆 𝐛𝐨𝐥𝐥𝐞 𝐜𝐡𝐚𝐤𝐫𝐢 𝐭𝐡𝐚𝐤𝐛𝐞 𝐧𝐚",
"𝐁𝐛𝘆 𝐁𝐛𝐲 𝐧𝐚 𝐤𝐨𝐫𝐞 𝐚𝐦𝐚𝐫 𝐛𝐨𝐬 𝐦𝐚𝐧𝐞, 𝐌𝐚𝐡𝐌𝐔𝐃 ,𝐌𝐚𝐡𝐌𝐔𝐃 𝐨 𝐭𝐨 𝐤𝐨𝐫𝐭𝐞 𝐩𝐚𝐫𝐨😑?",
"𝐀𝐦𝐚𝐫 𝐬𝐨𝐧𝐚𝐫 𝐁𝐚𝐧𝐠𝐥𝐚, 𝐭𝐚𝐫𝐩𝐨𝐫𝐞 𝐥𝐚𝐢𝐧 𝐤𝐢? 🙈",
"🍺 𝐄𝐢 𝐧𝐚𝐨 𝐣𝐮𝐬 𝐤𝐡𝐚𝐨..!𝐁𝐛𝘆 𝐛𝐨𝐥𝐭𝐞 𝐛𝐨𝐥𝐭𝐞 𝐡𝐚𝐩𝐚𝐲 𝐠𝐞𝐜𝐡𝐨 𝐧𝐚 🥲",
"𝐇𝐨𝐭𝐚𝐭 𝐚𝐦𝐚𝐤𝐞 𝐦𝐨𝐧𝐞 𝐩𝐨𝐫𝐞𝐥𝐨 🙄",
"𝐁𝐛𝘆 𝐛𝐨𝐥𝐞 𝐚𝐬𝐬𝐦𝐦𝐚𝐧 𝐤𝐨𝐫𝐜𝐡𝐜𝐡𝐢𝐜𝐡,😰😿",
"𝐀𝐬𝐬𝐚𝐥𝐚𝐦𝐮𝐥𝐚𝐢𝐤𝐮𝐦 🐤🐤",
"𝐀𝐦𝐢 𝐭𝐨𝐦𝐚𝐫 𝐬𝐢𝐧𝐢𝐨𝐫 𝐚𝐩𝐮 𝐨𝐤𝐞 😼𝐬𝐨𝐦𝐦𝐦𝐚𝐧 𝐝𝐞𝐨🙁",
"𝐊𝐡𝐚𝐰𝐚 𝐝𝐚𝐨𝐰𝐚 𝐤𝐨𝐫𝐬𝐨 🙄",
"𝐄𝐭𝐨 𝐤𝐚𝐜𝐡𝐞𝐨 𝐞𝐬𝐨 𝐧𝐚,𝐩𝐫𝐞𝐦 𝐞 𝐩𝐨𝐫𝐞 𝐣𝐚𝐛𝐨 𝐭𝐨 🙈",
"𝐀𝐫𝐞 𝐚𝐦𝐢 𝐦𝐨𝐣𝐚 𝐤𝐨𝐫𝐚𝐫 𝐦𝐨𝐨𝐝 𝐞 𝐧𝐚𝐢😒",
"𝐇𝐞𝐲 𝐇𝐚𝐧𝐝𝐬𝐨𝐦𝐞 𝐛𝐨𝐥𝐨 😁😁",
"𝐀𝐫𝐞 𝐁𝐨𝐥𝐨 𝐚𝐦𝐚𝐫 𝐣𝐚𝐧, 𝐤𝐞𝐦𝐨𝐧 𝐚𝐬𝐨? 😚",
"𝐄𝐤𝐭𝐚 𝐁𝐅 𝐤𝐡𝐮𝐣𝐞 𝐝𝐚𝐨 😿",
"𝐅𝐫𝐞𝐧𝐝 𝐫𝐢𝐜𝐨𝐰𝐞𝐬𝐭 𝐝𝐢𝐥𝐞 ৫ 𝐭𝐚𝐤𝐚 𝐝𝐢𝐛𝐨 😗",
"𝐎𝐢 𝐦𝐚𝐦𝐚 𝐚𝐫 𝐝𝐚𝐤𝐢𝐬 𝐧𝐚 𝐩𝐢𝐥𝐢𝐬 😿",
"🐤🐤",
"__𝐕𝐚𝐥𝐨 𝐡𝐨𝐞 𝐣𝐚𝐨 😑😒",
"𝐄𝐦𝐛𝐢 𝐤𝐢𝐧𝐞 𝐝𝐚𝐨 𝐧𝐚_🥺🥺",
"𝐎𝐢 𝐦𝐚𝐦𝐚_𝐚𝐫 𝐝𝐚𝐤𝐢𝐬 𝐧𝐚 𝐩𝐥𝐢𝐳",
"32 𝐭𝐚𝐫𝐢𝐤 𝐚𝐦𝐚𝐫 𝐛𝐢𝐲𝐞 🐤",
"𝐇𝐚 𝐛𝐨𝐥𝐨😒,𝐤𝐢 𝐤𝐨𝐫𝐭𝐞 𝐩𝐚𝐫𝐢😐😑?",
"𝐁𝐨𝐥𝐨 𝐟𝐮𝐥𝐭𝐮𝐬𝐡𝐢_😘",
"𝐀𝐦𝐫 𝐉𝐚𝐍𝐮 𝐥𝐚𝐠𝐛𝐞,𝐓𝐮𝐦𝐢 𝐤𝐢 𝐬𝐢𝐧𝐠𝐥𝐞 𝐚𝐬𝐨?",
"𝐓𝐨𝐫 𝐛𝐢𝐲𝐞 𝐡𝐨𝐲 𝐧𝐢 𝐁𝐛𝘆 𝐡𝐨𝐢𝐥𝐨 𝐤𝐢𝐯𝐚𝐛𝐞,,🙄",
"𝐀𝐣 𝐞𝐤𝐭𝐚 𝐩𝐡𝐨𝐧𝐞 𝐧𝐚𝐢 𝐛𝐨𝐥𝐞 reply 𝐝𝐢𝐭𝐞 𝐩𝐚𝐫𝐥𝐚𝐦 𝐧𝐚_🙄",
"𝐂𝐡𝐨𝐮𝐝𝐡𝐮𝐫𝐢 𝐬𝐚𝐡𝐞𝐛 𝐚𝐦𝐢 𝐠𝐨𝐫𝐢𝐛 𝐡𝐨𝐭𝐞 𝐩𝐚𝐫𝐢😾🤭 -𝐤𝐢𝐧𝐭𝐮 borolok 𝐧𝐚🥹 😫",
"𝐀𝐦𝐢 ONNER 𝐣𝐢𝐧𝐢𝐬𝐞𝐫 𝐬𝐚𝐭𝐡𝐞 𝐤𝐨𝐭𝐡𝐚 𝐛𝐨𝐥𝐢 𝐧𝐚__😏𝐨𝐤𝐞",
"𝐁𝐨𝐥𝐨 𝐤𝐢 𝐛𝐨𝐥𝐛𝐚, 𝐬𝐨𝐛𝐚𝐫 𝐬𝐚𝐦𝐧𝐞 𝐛𝐨𝐥𝐛𝐚 𝐧𝐚𝐤𝐢?🤭🤏",
"𝐕𝐮𝐥𝐞 𝐣𝐚𝐨 𝐚𝐦𝐚𝐤𝐞 😞😞",
"𝐃𝐞𝐤𝐡𝐚 𝐡𝐨𝐥𝐞 𝐤𝐚𝐭𝐡𝐠𝐨𝐥𝐚𝐩 𝐝𝐢𝐨..🤗",
"𝐒𝐡𝐮𝐧𝐛𝐨 𝐧𝐚😼 𝐭𝐮𝐦𝐢 𝐚𝐦𝐚𝐤𝐞 𝐩𝐫𝐞𝐦 𝐤𝐨𝐫𝐚𝐢 𝐝𝐚𝐨 𝐧𝐢🥺 𝐩𝐨𝐜𝐡𝐚 𝐭𝐮𝐦𝐢🥺",
"𝐀𝐠𝐞 𝐞𝐤𝐭𝐚 𝐠𝐚𝐧 𝐛𝐨𝐥𝐨, ☹ 𝐧𝐚𝐡𝐥𝐞 𝐤𝐨𝐭𝐡𝐚 𝐛𝐨𝐥𝐛𝐨 𝐧𝐚 🥺",
"𝐁𝐨𝐥𝐨 𝐤𝐢 𝐤𝐨𝐫𝐭𝐞 𝐩𝐚𝐫𝐢 𝐭𝐨𝐦𝐚𝐫 𝐣𝐨𝐧𝐧𝐨 😚",
"𝐊𝐨𝐭𝐡𝐚 𝐝𝐞𝐨 𝐚𝐦𝐚𝐤𝐞 𝐩𝐨𝐭𝐚𝐛𝐚...!! 😌",
"𝐁𝐚𝐫 𝐛𝐚𝐫 𝐃𝐢𝐬𝐭𝐮𝐫𝐛 𝐤𝐨𝐫𝐞𝐜𝐡𝐢𝐬 𝐤𝐨𝐧𝐨 😾, 𝐚𝐦𝐚𝐫 𝐣𝐚𝐧𝐮 𝐞𝐫 𝐬𝐚𝐭𝐡𝐞 busy 𝐚𝐬𝐢 😋","🎀 Hey! How can I help?😝"];
  const userInput = body.toLowerCase().trim();

  const keywords = ["bby", "nobita", "hi", "baby", "bot", "বট", "raihan"];

  if (keywords.some((keyword) => userInput.startsWith(keyword))) {
    const isQuestion = userInput.split(" ").length > 1;
    if (isQuestion) {
      const question = userInput.slice(userInput.indexOf(" ") + 1).trim();

      try {
        const res = await axios.get(
          `${await getAPIBase()}/ShAn-bby?text=${encodeURIComponent(question)}&uid=${senderID}&font=2`
        );
        const replyMsg = res.data?.text || "Please teach me this sentence!🦆💨";
        const react = res.data.react || "";

        return api.sendMessage(replyMsg + react, threadID, (error, info) => {
          if (!error) {
            global.GoatBot.onReply.set(info.messageID, {
              commandName: module.exports.config.name,
              type: "reply",
              author: senderID,
              replyMsg
            });
          }
        }, messageID);
      } catch (error) {
        return api.sendMessage("ShAn er API Off Kn 🦆💨", threadID, messageID);
      }
    } else {
      const rMsg = cMessages[Math.floor(Math.random() * cMessages.length)];
      return api.sendMessage(rMsg, threadID, (error, info) => {
          if (!error) {
            global.GoatBot.onReply.set(info.messageID, {
              commandName: module.exports.config.name,
              type: "reply",
              author: senderID,
            });
          }
        }, messageID);
    }
  }
};

module.exports.onReply = async ({ api, event, Reply }) => {
  const { threadID, messageID, senderID, body } = event;
  return talkWithBot(api, threadID, messageID, senderID, body);
};
