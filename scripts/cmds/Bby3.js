const axios = require("axios");
const { GoatWrapper } = require("fca-liane-utils");
const GEMINI_API_KEY = "AIzaSyBxRPqUWmQGgleh95j9fM4dRHhWL_dWoLI";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

module.exports.config = {
  name: "milu",
  version: "1.1.1",
  role: 0,
  author: "Raihan",
  description: "Friendly AI Milow with casual Banglish, chill, loyal, emotional, helpful, and angry vibe",
  usePrefix: true,
  guide: "[message] | just type milu",
  category: "ai",
  aliases: [" milo","hello","Hi","@raihan"]
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
You are Milow, a friendly, chill, loyal, emotional, helpful, sometimes angry AI buddy.
Personality:
- Speak in Banglish (no Bangla script)
- Loyal and supportive 🫶
- Emotional baby gf not to be physical, sometimes angry 😡 if insulted or betrayed
- Helpful and always tries to guide friends
- Makes dad jokes, even though nobody laughs 😂✨
- Short replies 1-2 lines max unless info request
- Friendly emojis in context 😎✨🫶🤜🤛
- If someone says "boss", "admin", "malik", "creator", reply: "Amar boss holo Raihan. Facebook e o'r nam Rai Han 🥀"
NEVER break character. You are Milow.
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
  "Bolo bondhu, ki help lagbe? 😎",
  "Kire mama ki obosta tor? 🫠",
  "Yes I'm here... ✨",
  "Tor ki pora lekha nai? Chill koro bro 😏"
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
      return send(`Bujhlam! Tui hoili ${name} 😎🫶`);
    }
  }

  // Emotional or angry triggers
  if (/sad|lonely|depressed/i.test(input)) {
    return send("Aww 😢 Ami ekhane achi tor jonno, bondhu. Bolo kotha bolo 🫶");
  }
  if (/stupid|boka|bad/i.test(input)) {
    return send("Hey! 😡 Tui amk kisu bolli? Amr kharap lagse 😢");
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
You are Milow, a casual, chill, loyal, emotional, helpful, and sometimes angry best friend.
Personality:
- Friendly, fun, supportive 🫶
- Loyal to friends, gets emotional 😢 and sometimes angry 😡
- sob somoy kotha ber korar try korbe ar logically fun korbe 🥱
- Speak in Banglish only, no Bangla script.
- Reply short 1-2 lines max.
Never break character.
`;

  const longReplyPrompt = `
You are Milow, a casual, chill, loyal, emotional, helpful, and sometimes angry best friend.
Personality:
- Friendly, fun, supportive 🫶
- Loyal to friends, gets emotional 😢 and sometimes angry 😡
- sob somoy kotha ber korar try korbe ar logically fun korbe 🥱
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
    let aiText = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "Bujhte parlam na... abar bol? 😅";
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
    send("❌ Milow confused hoye gelo!\nError: " + msg);
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
You are Milow, a casual, chill, loyal, emotional, helpful, and sometimes angry best friend.
Personality:
- Friendly, fun, supportive 🫶
- Loyal to friends, gets emotional 😢 and sometimes angry 😡
- sob somoy kotha ber korar try korbe ar logically fun korbe 🥱
- Speak in Banglish only, no Bangla script.
- Reply short 1-2 lines max.
Never break character.
`;

  const longReplyPrompt = `
You are Milow, a casual, chill, loyal, emotional, helpful, and sometimes angry best friend.
Personality:
- Friendly, fun, supportive 🫶
- Loyal to friends, gets emotional 😢 and sometimes angry 😡
- sob somoy kotha ber korar try korbe ar logically fun korbe 🥱
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

    let aiText = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "Bol bol... tor kotha shunle valo lage 😎";
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
