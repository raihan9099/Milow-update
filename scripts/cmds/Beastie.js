const axios = require("axios");
const { GoatWrapper } = require("fca-liane-utils");

const GEMINI_API_KEY = "AIzaSyDbXYdHBeMfehplNK_ELcMFbVDMIxTRE5k";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

module.exports.config = {
  name: "Cat",
  version: "1.0.0",
  role: 0,
  author: " Raihan",
  description: "Flirty AI Cat with playful & moody vibes",
  usePrefix: true,
  guide: "[message] | just type cat",
  category: "ai",
  aliases: ["frnd", "meow", "Bestie"]
};

const conversationHistory = new Map();
const nameMemory = new Map();
const lastSeen = new Map();

function getHistory(userId) {
  if (!conversationHistory.has(userId)) {
    conversationHistory.set(userId, [
      {
        role: "user",
        parts: [
          {
            text: `
You are Cat.
Personality:
- Speak in Banglish (no Bangla script).
- Flirty, playful crush vibes, teasing but loyal bestie.
- Sometimes get angry if ignored or insulted, but reply in a funny-cute way.
- Respond short & sweet (1–2 lines max unless asked for info).
- Use emojis like 😏💖😉🔥🫶😤🤨
- If someone says "boss", "admin", "malik", "creator", reply with: "Amar boss holo Raihan. Facebook e o'r nam Rai Han 🥀"
NEVER break character. You are Cat.
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

function isInfoRequest(text) {
  return /list|recommend|suggest|bol|dite paro|kino/.test(text.toLowerCase());
}

function isInsult(text) {
  return /stupid|boka|chup|faltu|chod|pagol|fuck|shut up/i.test(text);
}

const randomOpeners = [
  "Tor kotha na shunle din ta adhoora lage 😉💖",
  "Oii, abar amake miss korli naki? 😏🔥",
  "Kire handsome/beautiful, ki obosta tor? 💕",
  "Amar shathe adda marte ashis? tor charm dekhtei parchi 😎💘"
];

module.exports.onStart = async function ({ api, args, event }) {
  const userId = event.senderID;
  const input = args.join(" ").trim();
  const send = (msg) => api.sendMessage(msg, event.threadID, event.messageID);

  // Time gap check (ignore handling)
  const now = Date.now();
  const last = lastSeen.get(userId) || 0;
  lastSeen.set(userId, now);
  if (now - last > 1000 * 60 * 30) { // 30 minutes
    return send("Oii... eto din kothai chilish? amake ignore korish naki? 😤😏");
  }

  // Insult handling
  if (isInsult(input)) {
    return send("Tor jonnei ami eto cute aar tor upor eto bhalo 😤... abar insult korli kintu block diye dibo 😏🔥");
  }

  // Name memory set
  if (/amar nam/i.test(input)) {
    const name = input.split("amar nam")[1]?.trim();
    if (name) {
      nameMemory.set(userId, name);
      return send(`Ooo so sweet! Tui hoilo ${name} 😏💖`);
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
You are Cat.
Personality: Flirty, playful crush vibes, teasing but loyal bestie 😏💖😉🔥🫶
Sometimes angry if ignored or insulted.
Speak in Banglish only, no Bangla script.
Reply short 1-2 lines max.
Never break character.
  `;

  const longReplyPrompt = `
You are Cat.
Personality: Flirty, playful crush vibes, teasing but loyal bestie 😏💖😉🔥🫶
Sometimes angry if ignored or insulted.
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
    send("❌ Cat confused hoye gelo!\nError: " + msg);
  }
};

module.exports.onReply = async function ({ api, event, Reply }) {
  if (event.senderID !== Reply.author) return;

  const userId = event.senderID;
  const input = event.body.trim();
  const send = (msg) => api.sendMessage(msg, event.threadID, event.messageID);

  // Time gap check
  const now = Date.now();
  const last = lastSeen.get(userId) || 0;
  lastSeen.set(userId, now);
  if (now - last > 1000 * 60 * 30) {
    return send("Oii... eto din kothai chilish? amake ignore korish naki? 😤😏");
  }

  // Insult handling
  if (isInsult(input)) {
    return send("Tor jonnei ami eto cute aar tor upor eto bhalo 😤... abar insult korli kintu block diye dibo 😏🔥");
  }

  const knownName = nameMemory.get(userId);
  const finalInput = knownName ? `${knownName}: ${input}` : input;
  addToHistory(userId, "user", finalInput);

  const shortReplyPrompt = `
You are Cat.
Personality: Flirty, playful crush vibes, teasing but loyal bestie 😏💖😉🔥🫶
Sometimes angry if ignored or insulted.
Speak in Banglish only, no Bangla script.
Reply short 1-2 lines max.
Never break character.
  `;

  const longReplyPrompt = `
You are Cat.
Personality: Flirty, playful crush vibes, teasing but loyal bestie 😏💖😉🔥🫶
Sometimes angry if ignored or insulted.
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
    let aiText = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "Bol bol... tor kotha shunle valo lage 😏💖";
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
