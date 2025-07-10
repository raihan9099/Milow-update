const axios = require("axios");

module.exports = {
  config: {
    name: "prompt",
    aliases: ["p"],
    version: "1.2",
    author: "nexo_here",
    countDown: 5,
    role: 0,
    shortDescription: "Extract prompt from image",
    longDescription: "Reply to an image and get only its AI prompt",
    category: "ai-tools",
    guide: {
      en: "Reply to an AI-generated image and type: prompt"
    }
  },

  onStart: async function ({ message, event, api }) {
    const reply = event.messageReply;

    if (!reply || !reply.attachments || reply.attachments[0].type !== "photo") {
      return message.reply("❌ Please reply to an image to extract its prompt.");
    }

    const imageUrl = reply.attachments[0].url;

    api.setMessageReaction("⏳", event.messageID, () => {}, true);

    try {
      const response = await axios.get(`https://api.oculux.xyz/api/promptv1?image=${encodeURIComponent(imageUrl)}`);
      const prompt = response.data?.reply;

      if (!prompt) {
        api.setMessageReaction("❌", event.messageID, () => {}, true);
        return message.reply("❌ No prompt found for this image.");
      }

      api.setMessageReaction("✅", event.messageID, () => {}, true);
      return message.reply(prompt); // Only the prompt text
    } catch (err) {
      console.error("Prompt extract error:", err.message);
      api.setMessageReaction("❌", event.messageID, () => {}, true);
      return message.reply("❌ Failed to extract prompt from the image.");
    }
  }
};
