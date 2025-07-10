const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

module.exports = {
  config: {
    name: "midjourney",
    aliases: ["mj"],
    version: "1.0",
    author: "nexo_here",
    countDown: 10,
    role: 0,
    shortDescription: "Generate Midjourney style AI images",
    longDescription: "Generate 4 grid image from Midjourney styled API and allow U/V image selection.",
    category: "ai-image",
    guide: "{pn} <prompt>"
  },

  onStart: async function ({ args, message, event, api }) {
    const prompt = args.join(" ");
    if (!prompt) return message.reply("❌ Please provide a prompt.");

    api.setMessageReaction("⏳", event.messageID, () => {}, true);

    const url = `https://renzweb.onrender.com/api/mj-proxy-pub?prompt=${encodeURIComponent(prompt)}&usePolling=usePolling`;

    try {
      const res = await axios.get(url);
      const results = res.data?.results;

      if (!Array.isArray(results) || results.length < 4) return message.reply("❌ Failed to generate 4 images.");

      const imagePaths = [];
      for (let i = 0; i < 4; i++) {
        const imageResponse = await axios.get(results[i], { responseType: "arraybuffer" });
        const fileName = `mj_${Date.now()}_${i}.jpg`;
        const filePath = path.join(__dirname, "cache", fileName);
        fs.writeFileSync(filePath, Buffer.from(imageResponse.data, "binary"));
        imagePaths.push(filePath);
      }

      const canvas = createCanvas(1024, 1024);
      const ctx = canvas.getContext("2d");
      const imgs = await Promise.all(imagePaths.map(p => loadImage(p)));

      ctx.drawImage(imgs[0], 0, 0, 512, 512);
      ctx.drawImage(imgs[1], 512, 0, 512, 512);
      ctx.drawImage(imgs[2], 0, 512, 512, 512);
      ctx.drawImage(imgs[3], 512, 512, 512, 512);

      const finalPath = path.join(__dirname, "cache", `mj_grid_${Date.now()}.jpg`);
      fs.writeFileSync(finalPath, canvas.toBuffer("image/jpeg"));

      message.reply({
        attachment: fs.createReadStream(finalPath),
        body: "Available actions\n[U1, U2, U3, U4]\n[V1, V2, V3, V4]"
      }, (err, info) => {
        if (err) return;
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          author: event.senderID,
          images: imagePaths
        });
        api.setMessageReaction("✅", event.messageID, () => {}, true);
      });

    } catch (e) {
      console.error(e);
      api.setMessageReaction("❌", event.messageID, () => {}, true);
      message.reply("❌ Failed to generate image.");
    }
  },

  onReply: async function ({ event, Reply, api, message }) {
    const { author, images } = Reply;
    if (event.senderID !== author) return;

    const match = event.body.toUpperCase().match(/([UV])([1-4])/);
    if (!match) return;

    const index = parseInt(match[2]) - 1;
    const selectedPath = images[index];

    if (!fs.existsSync(selectedPath)) {
      return message.reply("❌ Image not found.");
    }

    api.setMessageReaction("⏳", event.messageID, () => {}, true);
    message.reply({ attachment: fs.createReadStream(selectedPath) }, () => {
      api.setMessageReaction("✅", event.messageID, () => {}, true);
      images.forEach(fp => fs.existsSync(fp) && fs.unlinkSync(fp));
      global.GoatBot.onReply.delete(event.messageID);
    });
  }
};
