const axios = require("axios");
const { GoatWrapper } = require("fca-liane-utils");

const GEMINI_API_KEY = "AIzaSyBI6a4QCxoTJ9FS1MAiNRfMYpaztZjTeuE"; // your valid key
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

module.exports.config = {
  name: "cat",
  version: "1.3.0",
  role: 0,
  author: "RaiHan",
  description: "Flirty AI Cat using Gemini API with shared memory",
  usePrefix: true,
  guide: "[message] | just type cat",
  category: "ai",
  aliases: ["kitty", "crush", "tease"]
};

const conversationHistory = [];
const nameMemory = new Map();
const MAX_HISTORY = 40;

function addToHistory(role, text) {
  conversationHistory.push({ role, parts: [{ text }] });
  if (conversationHistory.length > MAX_HISTORY) {
    conversationHistory.splice(0, conversationHistory.length - MAX_HISTORY);
  }
}

function isInfoRequest(text) {
  return /list|recommend|suggest|bol|dite paro|kino/i.test(text.toLowerCase());
}

function isInsultOrIgnore(text) {
  return /stupid|idiot|dumb|loser|hate|ignore|boring/i.test(text.toLowerCase());
}

// Personality prompt (prepended to the first user message)
function getPersonalityText(input) {
  if (isInsultOrIgnore(input)) {
    return `
You are milow Cat, flirty but savage helpfull loyal angry 😤🤨
Respond short, funny-savage, tease them but stay playful 💖😉🔥🫶
if someone say your boss creator or admin owner and this type " amr boss holo RaiHan🌸
Speak in Banglish only, never break character.
`;
  } else if (isInfoRequest(input)) {
    return `
You are Milow Cat, playful helpfull loyal angry flirty bestie 💖😉🔥🫶
Speak in Banglish only, reply fully and detailed.
Never break character.
`;
  } else {
    return `
You are milow Cat, playful flirty helpfull loyal angry bestie 💖😉🔥🫶
Speak in Banglish only, reply short & sweet (1–2 lines max).
Never break character.
`;
  }
}

async function generateGeminiReply(finalInput) {
  // Prepend personality directly to user input
  const contents = [
    { role: "user", parts: [{ text: getPersonalityText(finalInput) + "\n" + finalInput }] },
    ...conversationHistory
  ];

  const res = await axios.post(GEMINI_API_URL, { contents }, {
    headers: { "Content-Type": "application/json" }
  });

  let aiText = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "Bujhte parlam na... abar bol? 💖";

  // Shorten if normal chat
  if (!isInfoRequest(finalInput) && !isInsultOrIgnore(finalInput) && aiText.split("\n").length > 2) {
    aiText = aiText.split("\n").slice(0, 2).join("\n");
  }

  return aiText;
}

async function handleMessage({ api, args, event }) {
  const input = args.join(" ").trim();
  const send = (msg) => {
    api.sendMessage(msg, event.threadID, (err, info) => {
      if (!err) {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: "cat",
          type: "reply",
          messageID: info.messageID,
          author: event.senderID
        });
      }
    }, event.messageID);
  };

  if (/amar nam/i.test(input)) {
    const name = input.split("amar nam")[1]?.trim();
    if (name) {
      nameMemory.set(event.senderID, name);
      return send(`Bujhlam! Tui hoili ${name} 💖🫶`);
    }
  }

  const knownName = nameMemory.get(event.senderID);
  const finalInput = knownName ? `${knownName}: ${input}` : input;

  addToHistory("user", finalInput);

  try {
    const aiText = await generateGeminiReply(finalInput);
    addToHistory("model", aiText);
    send(aiText);
  } catch (err) {
    const msg = err.response?.data?.error?.message || err.message;
    send("❌ milow Cat confused! Gemini Error: " + msg);
  }
}

module.exports.onStart = handleMessage;
module.exports.onReply = handleMessage;

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
