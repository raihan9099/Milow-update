const axios = require("axios");

module.exports = {
  config: {
    name: "deepseek",
    aliases: ["ds"],
    version: "1.0",
    author: "nexo_here",
    shortDescription: "Chat with DeepSeek AI (text or image)",
    longDescription: "Send a question or image to DeepSeek v3 API and receive a clean AI response.",
    category: "ai",
    guide: "{pn}deepseek <your question> or reply to an image.",
  },

  onStart: async function ({ api, event, args }) {
    const apikey = "66e0cfbb-62b8-4829-90c7-c78cacc72ae2";
    let query;

    // Check if replying to an image
    const reply = event.messageReply;
    if (
      reply &&
      reply.attachments &&
      reply.attachments.length > 0 &&
      reply.attachments[0].type === "photo"
    ) {
      query = reply.attachments[0].url;
    } else if (args.length > 0) {
      query = args.join(" ");
    } else {
      return api.sendMessage(
        "❌ Please provide a question or reply to an image.",
        event.threadID,
        event.messageID
      );
    }

    const url = `https://kaiz-apis.gleeze.com/api/deepseek-v3?ask=${encodeURIComponent(query)}&apikey=${apikey}`;

    try {
      const res = await axios.get(url);
      const responseText = res.data?.response;
      if (!responseText) {
        return api.sendMessage("⚠️ No response received from DeepSeek.", event.threadID, event.messageID);
      }

      return api.sendMessage(responseText, event.threadID, event.messageID);
    } catch (err) {
      console.error("DeepSeek API Error:", err.message);
      return api.sendMessage("❌ Failed to contact DeepSeek API.", event.threadID, event.messageID);
    }
  }
};