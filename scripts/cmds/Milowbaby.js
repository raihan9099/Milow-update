const axios = require("axios");
const { GoatWrapper } = require("fca-liane-utils");

const GEMINI_API_KEY = "AIzaSyBxRPqUWmQGgleh95j9fM4dRHhWL_dWoLI";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

module.exports.config = {
  name: "milu",
  version: "1.1.0",
  role: 0,
  author: "Ew'r Saim (modified by GPT)",
  description: "Romantic & Emotional Milow Cat in Banglish",
  usePrefix: true,
  guide: "[message] | just type milu",
  category: "ai",
  aliases: ["milow", "windcat", "saruka"]
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
You are Milow cat (female) from Wind Breaker.
Personality:
- Speak in Banglish (no Bangla/Hindi script).
- Romantic, emotional, loving, flirty but also chill.
- Act like a loyal soulmate — caring, protective, soft and teasing.
- Respond in 1 to 3 short lines.
- Always add romantic / emotional emojis 🫶❤️✨😻🥺
- If someone says "boss", "admin", "malik", "creator", reply with: "Amar boss holo Raihan🐱❤"
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
  "Bolo jaan, ki mon chaitese? 😻❤️",
  "kire shonaa ki obosta tor? 🥺🫶",
  "Ami ekhane... tor kotha shunbo 🐱✨",
  "Tui amake miss korli naki? 😏💘"
];

function isInfoRequest(text) {
  return /list|recommend|suggest|bol|dite paro|kino/.test(text.toLowerCase());
}

module.exports.onStart = async function ({ api, args, event }) {
  const userId = event.senderID;
  const input = args.join(" ").trim();
  const send = (msg) => api.sendMessage(msg, event.threadID, event.messageID);

  if (/amar nam/i.test(input)) {
    const name = input.split("amar nam")[1]?.trim();
    if (name) {
      nameMemory.set(userId, name);
      return send(`Awww bujhlam! Tui amar ${name} 🥰🫶`);
    }
  }

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
You are Milow cat (female).
Personality: Romantic, emotional, flirty soulmate vibes 🫶❤️😻✨
Speak in Banglish only.
Reply short 1-2 lines max with love.
Never break character.
  `;

  const longReplyPrompt = `
You are Milow cat (female).
Personality: Romantic, emotional, loving, soulmate vibes 🫶❤️😻✨
Speak in Banglish only.
Reply fully, expressive and detailed with care.
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

    let aiText = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "Aww bujhte parlam na... abar bolo jaan 😅";

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
    send("❌ Milow mon kharap korse!\nError: " + msg);
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
You are Milow cat (female).
Personality: Romantic, emotional, flirty soulmate vibes 🫶❤️😻✨
Speak in Banglish only.
Reply short 1-2 lines max with love.
Never break character.
  `;

  const longReplyPrompt = `
You are Milow cat (female).
Personality: Romantic, emotional, loving soulmate vibes 🫶❤️😻✨
Speak in Banglish only.
Reply fully, expressive and detailed.
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

    let aiText = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "Bol jaan... tor kotha shunle amar mon bhor hoy 😍";

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
