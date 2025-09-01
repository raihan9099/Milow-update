const axios = require("axios");

module.exports = {
  config: {
    name: "nezuko",
    version: "1.0.2",
    author: "Aryan Chauhan",
    countDown: 5,
    role: 0,
    shortDescription: { en: "Chat with Nezuko Ai ( https://aigirl.one )" },
    longDescription: { en: "Talk with Nezuko with  continuous conversation +https://aigirl.one) ." },
    category: "ai",
    guide: { en: "Use: nezuko <message>\nExample: !aigirl hello" }
  },

  onStart: async function ({ api, event, args }) {
    const prompt = args.join(" ").trim();
    if (!prompt) {
      return api.sendMessage(
        "⚠️ Please provide a message.\nExample: !aigirl hello",
        event.threadID,
        event.messageID
      );
    }

    api.setMessageReaction("⏳", event.messageID, () => {}, true);

    try {
      const { data } = await axios.get("https://aryxapi.onrender.com/api/ai/aigirl", {
        params: { 
          action: "chat", 
          prompt, 
          model: "252968", 
          conversationId: event.senderID 
        }
      });

      const text = (data?.textContent || "").replace(/<\/?em>/g, "*").trim();
      if (!text) {
        api.setMessageReaction("❌", event.messageID, () => {}, true);
        return api.sendMessage("❌ AI Girl did not return a response.", event.threadID, event.messageID);
      }

      if (!global.GoatBot.onReply) global.GoatBot.onReply = new Map();

      api.sendMessage(text, event.threadID, (err, info) => {
        if (err) {
          api.setMessageReaction("❌", event.messageID, () => {}, true);
          return;
        }
        api.setMessageReaction("✅", event.messageID, () => {}, true);

        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          author: event.senderID,
          conversationId: event.senderID 
        });
      }, event.messageID);

    } catch (err) {
      console.error(err);
      api.setMessageReaction("❌", event.messageID, () => {}, true);
      api.sendMessage("❌ Error while contacting AI Girl API.", event.threadID, event.messageID);
    }
  },

  onReply: async function ({ api, event, Reply }) {
    if (!Reply || event.senderID !== Reply.author) return;

    const prompt = (event.body || "").trim();
    if (!prompt) return;

    api.setMessageReaction("⏳", event.messageID, () => {}, true);

    try {
      const { data } = await axios.get("https://aryxapi.onrender.com/api/ai/aigirl", {
        params: {
          action: "chat",
          prompt,
          model: "252968",
          conversationId: event.senderID 
        }
      });

      const text = (data?.textContent || "").replace(/<\/?em>/g, "*").trim();
      if (!text) {
        api.setMessageReaction("❌", event.messageID, () => {}, true);
        return api.sendMessage("❌ AI Girl did not return a response.", event.threadID, event.messageID);
      }

      if (!global.GoatBot.onReply) global.GoatBot.onReply = new Map();

      api.sendMessage(text, event.threadID, (err, info) => {
        if (err) {
          api.setMessageReaction("❌", event.messageID, () => {}, true);
          return;
        }
        api.setMessageReaction("✅", event.messageID, () => {}, true);

        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          author: event.senderID,
          conversationId: event.senderID
        });
      }, event.messageID);

    } catch (err) {
      console.error(err);
      api.setMessageReaction("❌", event.messageID, () => {}, true);
      api.sendMessage("❌ Error while continuing chat with AI Girl.", event.threadID, event.messageID);
    }
  }
};
