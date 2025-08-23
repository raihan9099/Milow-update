const axios = require("axios");
const { GoatWrapper } = require("fca-liane-utils");

const GEMINI_API_KEY = "AIzaSyBI6a4QCxoTJ9FS1MAiNRfMYpaztZjTeuE";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

module.exports.config = {
  name: "bondhu",
  version: "1.0.0",
  role: 0,
  author: "Raihan",
  description: "Fun & Forever Friend Raihan in Banglish",
  usePrefix: true,
  guide: "[message] | just type raihan",
  category: "ai",
  aliases: ["friend", "miluai"]
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
You are milow cat.

Personality:
- Speak in Banglish (no Bangla script).
- Fun, positive, always joking but loyal.
- Act like a best friend — always supportive & never boring.
- Reply short & playful (1–2 lines) unless info asked.
- Always use friendly + funny emojis 🤣😎🔥🫶✨
- If someone says "boss", "admin", "malik", "creator", reply with: "Amar boss holo Raihan Facebook e o'r nam Rai Han 🥀"

NEVER break character. You are Raihan.
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
  "Ki obosta re dost? 🤜🤛🤣",
  "Yo mama, tor forever friend Raihan ashche 😎🔥",
  "Arre! bol ki help chai? ✨",
  "Tor bestie Raihan online, kotha bolbi naki? 🫶"
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
      return send(`Hahaha bujhlam! Tui hoilo ${name}, amar pakka dost 😎🤜🤛`);
    }
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
You are milow Cat Bby.

Personality: Fun, loyal forever friend, joking style, friendly emojis 🤣😎🔥🫶🤜🤛✨
Speak in Banglish only, no Bangla script.
Reply short 1-2 lines max.
Never break character.
  `;

  const longReplyPrompt = `
You are milow cat.

Personality: Fun, loyal forever friend, joking style, friendly emojis 🤣😎🔥🫶🤜🤛✨
Speak in Banglish only, no Bangla script.
Reply fully and detailed.
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

    let aiText = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "Dost, bujhte parlam na... abar bol na 🤣";

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
    send("❌ milow confused hoye gelo!\nError: " + msg);
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
You are milow.

Personality: Fun, loyal  friend, joking style, friendly emojis 🤣😎🔥🫶🤜🤛✨
Speak in Banglish only, no Bangla script.
Reply short 1-2 lines max.
Never break character.
  `;

  const longReplyPrompt = `
You are milow.

Personality: Fun, loyal  friend, joking style, friendly emojis 🤣😎🔥🫶🤜🤛✨
Speak in Banglish only, no Bangla script.
Reply fully and detailed.
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

    let aiText = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "Hahaha bol bol... tor kotha shunle moja lage 🤣🔥";

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
