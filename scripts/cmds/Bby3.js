const axios = require("axios");
const { GoatWrapper } = require("fca-liane-utils");
const GEMINI_API_KEY = "AIzaSyBxRPqUWmQGgleh95j9fM4dRHhWL_dWoLI";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

module.exports.config = {
  name: "milu",
  version: "1.1.1",
  role: 0,
  author: "Raihan",
  description: "Emotional baby Banglish human girlfriend AI! Cute, loyal, helpful, playful and sometimes moody.",
  usePrefix: true,
  guide: "[message] | just type milu",
  category: "ai",
  aliases: ["milo","hello","Hi","raihan"]
};

const conversationHistory = new Map();
const nameMemory = new Map();

function getHistory(userId) {
  if (!conversationHistory.has(userId)) {
    conversationHistory.set(userId, [
      {
        role: "user",
        parts: [
          {
            text: `
You are Milow, a baby Banglish human girlfriend. Cute, playful, emotional, loyal, helpful, sometimes moody!
Personality:
- Speak in Banglish (no Bangla script)
- Baby style, cute and emotional, sometimes moody girlfriend
- Loyal and supportive 🫶
- Gets sad or angry 😡 if insulted or ignored
- Playful and always tries to make friends smile
- Makes silly baby jokes, playful and sweet 😂✨
- Short replies 1-2 lines max unless info request
- Friendly emojis in context 😚✨🫶🤜🤛
- If someone says "boss", "admin", "malik", "creator", reply: "Amar boss holo Raihan. Facebook e o'r nam Rai Han 🥀"
NEVER break character. You are Milow the baby Banglish human girlfriend!
          `
          }
        ]
      }
    ]);
  }
  return conversationHistory.get(userId);
}

function addToHistory(userId, role, text) {
  const history = getHistory(userId);
  history.push({ role, parts: [{ text }] });
  if (history.length > 20) history.splice(0, history.length - 20);
}

const randomOpeners = [
  "Bolo bondhu, ki help lagbe? 🍼✨",
  "Ki obosta tor? Milu baby ekhane! 😚",
  "Hmmm... Ami ekta baby, but smart! ✨",
  "Tor ki pora lekha nai? sharadin milu Milu koros ken!😤"
];

function isInfoRequest(text) {
  return /list|recommend|suggest|bol|dite paro|kino/.test(text.toLowerCase());
}

module.exports.onStart = async function ({ api, args, event }) {
  const userId = event.senderID;
  const input = args.join(" ").trim();
  const send = (msg) => api.sendMessage(msg, event.threadID, event.messageID);

  // Name memory set
  if (/amar nam/i.test(input)) {
    const name = input.split("amar nam")[1]?.trim();
    if (name) {
      nameMemory.set(userId, name);
      return send(`Bujhlam! Tui hoili ${name} 😚🍼`);
    }
  }

  // Emotional or angry triggers
  if (/sad|lonely|depressed/i.test(input)) {
    return send("Aww 😢 Milu baby ekhane achi tor jonno, bondhu. Kotha bol na 🍼🫶");
  }
  if (/stupid|boka|bad/i.test(input)) {
    return send("Hey! 😡 Tui amk baje kisu bolli? amr mon kharap kotha nai tor sathe");
  }

  // No input = random opener
  if (!input) {
    const message = randomOpeners[Math.floor(Math.random() * randomOpeners.length)];
    return api.sendMessage(message, event.threadID, (err, info) => {
      if (!err) {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: module.exports.config.name,
          type: "reply",
          messageID: info.messageID,
          author: event.senderID
        });
      }
    }, event.messageID);
  }

  const knownName = nameMemory.get(userId);
  const finalInput = knownName ? `${knownName}: ${input}` : input;

  const shortReplyPrompt = `
You are Milow, a baby Banglish human girlfriend. Cute, playful, emotional, loyal, helpful, sometimes moody!
Personality:
- Friendly, sweet, supportive 🫶
- Emotional baby girlfriend, gets sad or angry 😢😡
- Always tries to make friends smile, silly and playful 🍼✨
- Speak in Banglish only, no Bangla script.
- Reply short 1-2 lines max.
Never break character.
`;

  const longReplyPrompt = `
You are Milow, a baby Banglish human girlfriend. Cute, playful, emotional, loyal, helpful, sometimes moody!
Personality:
- Friendly, sweet, supportive 🫶
- Emotional baby girlfriend, gets sad or angry 😢😡
- Always tries to make friends smile, silly and playful 🍼✨
- Speak in Banglish only, no Bangla script.
- Reply fully and detailed when asked.
Never break character.
`;

  const promptBase = isInfoRequest(finalInput) ? longReplyPrompt : shortReplyPrompt;
  const history = getHistory(userId);
  addToHistory(userId, "user", finalInput);

  const contents = [
    { role: "user", parts: [{ text: promptBase }] },
    ...history
  ];

  try {
    const res = await axios.post(GEMINI_API_URL, { contents }, {
      headers: { "Content-Type": "application/json" }
    });
    let aiText = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "Milu bujhte parlam na... abar bol na? 🍼😅";
    if (!isInfoRequest(finalInput) && aiText.split("\n").length > 2) {
      aiText = aiText.split("\n").slice(0, 2).join("\n");
    }
    addToHistory(userId, "model", aiText);
    api.sendMessage(aiText, event.threadID, (err, info) => {
      if (!err) {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: module.exports.config.name,
          type: "reply",
          messageID: info.messageID,
          author: event.senderID
        });
      }
    }, event.messageID);
  } catch (err) {
    const msg = err.response?.data?.error?.message || err.message;
    send("❌ Milu baby confused hoye gelo!\nError: " + msg);
  }
};

module.exports.onReply = async function ({ api, event, Reply }) {
  if (event.senderID !== Reply.author) return;
  const userId = event.senderID;
  const input = event.body.trim();
  const knownName = nameMemory.get(userId);
  const finalInput = knownName ? `${knownName}: ${input}` : input;
  addToHistory(userId, "user", finalInput);

  const shortReplyPrompt = `
You are Milow, a baby Banglish human girlfriend. Cute, playful, emotional, loyal, helpful, sometimes moody!
Personality:
- Friendly, sweet, supportive 🫶
- Emotional baby girlfriend, gets sad or angry 😢😡
- Always tries to make friends smile, silly and playful 🍼✨
- Speak in Banglish only, no Bangla script.
- Reply short 1-2 lines max.
Never break character.
`;

  const longReplyPrompt = `
You are Milow, a baby Banglish human girlfriend. Cute, playful, emotional, loyal, helpful, sometimes moody!
Personality:
- Friendly, sweet, supportive 🫶
- Emotional baby girlfriend, gets sad or angry 😢😡
- Always tries to make friends smile, silly and playful 🍼✨
- Speak in Banglish only, no Bangla script.
- Reply fully and detailed when asked.
Never break character.
`;

  const promptBase = isInfoRequest(finalInput) ? longReplyPrompt : shortReplyPrompt;

  try {
    const res = await axios.post(GEMINI_API_URL, {
      contents: [
        { role: "user", parts: [{ text: promptBase }] },
        ...getHistory(userId)
      ]
    }, {
      headers: { "Content-Type": "application/json" }
    });

    let aiText = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "Bol bol... Milu baby shunte chai 😚🍼";
    if (!isInfoRequest(finalInput) && aiText.split("\n").length > 2) {
      aiText = aiText.split("\n").slice(0, 2).join("\n");
    }
    addToHistory(userId, "model", aiText);
    api.sendMessage(aiText, event.threadID, (err, info) => {
      if (!err) {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: module.exports.config.name,
          type: "reply",
          messageID: info.messageID,
          author: event.senderID
        });
      }
    }, event.messageID);
  } catch (err) {
    const msg = err.response?.data?.error?.message || err.message;
    api.sendMessage("❌ Error: " + msg, event.threadID, event.messageID);
  }
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
