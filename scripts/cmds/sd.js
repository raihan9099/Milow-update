const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "stablediffution",
    aliases: ["sd"],
    version: "1.1",
    author: "NEXXO",
    countDown: 10,
    role: 0,
    shortDescription: "Generate image using Stable Diffusion",
    longDescription: "Generate AI image via stable diffusion (Siputzx API)",
    category: "ai-image",
    guide: {
      en: "{pn} [prompt]\nExample: {pn} a cyberpunk city at night"
    }
  },

  onStart: async function ({ args, message, event, api }) {
    const prompt = args.join(" ");
    if (!prompt) return message.reply("❌ Please provide a prompt.\nExample: sd a warrior in dark forest");

    // React loading
    api.setMessageReaction("⏳", event.messageID, () => {}, true);

    const url = `https://api.siputzx.my.id/api/ai/stable-diffusion?prompt=${encodeURIComponent(prompt)}`;

    try {
      const res = await axios.get(url, { responseType: "arraybuffer" });

      const fileName = `${Date.now()}_sd.jpg`;
      const filePath = path.join(__dirname, "cache", fileName);
      fs.writeFileSync(filePath, Buffer.from(res.data, "binary"));

      // Send image without caption
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
