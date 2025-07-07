const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "stabilityai",
    aliases: ["st"],
    version: "1.0",
    author: "NEXXO",
    countDown: 10,
    role: 0,
    shortDescription: "Generate image using Stability AI",
    longDescription: "Create premium images using stabilityai endpoint",
    category: "ai-image",
    guide: {
      en: "{pn} [prompt]\nExample: {pn} an astronaut riding a tiger on mars"
    }
  },

  onStart: async function ({ args, message, event, api }) {
    const prompt = args.join(" ");
    if (!prompt) return message.reply("❌ Please provide a prompt.\nExample: st a futuristic city underwater");

    // React loading
    api.setMessageReaction("⏳", event.messageID, () => {}, true);

    const url = `https://api.siputzx.my.id/api/ai/stabilityai?prompt=${encodeURIComponent(prompt)}`;

    try {
      const res = await axios.get(url, { responseType: "arraybuffer" });

      const fileName = `${Date.now()}_stability.jpg`;
      const filePath = path.join(__dirname, "cache", fileName);
      fs.writeFileSync(filePath, Buffer.from(res.data, "binary"));

      message.reply({ attachment: fs.createReadStream(filePath) }, () => {
        fs.unlinkSync(filePath);
        api.setMessageReaction("✅", event.messageID, () => {}, true);
      });

    } catch (err) {
      console.error(err);
      api.setMessageReaction("❌", event.messageID, () => {}, true);
    }
  }
};
        
