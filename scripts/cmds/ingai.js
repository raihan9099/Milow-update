const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "imgai",
    aliases: ["hfimage", "aiimg"],
    version: "1.0",
    author: "ChatGPT",
    countDown: 10,
    role: 0,
    shortDescription: { en: "Generate AI image using Hugging Face Stable Diffusion" },
    longDescription: { en: "Generate image from prompt using Hugging Face API" },
    category: "ai",
    guide: { en: "{pn} [prompt]" }
  },

  onStart: async function ({ message, args }) {
    if (!args || args.length === 0) {
      return message.reply("❗ Please provide a prompt.");
    }

    const prompt = args.join(" ");
    await message.reply(`⏳ Generating image for: "${prompt}"`);

    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer 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`,
            Accept: "application/json",
          },
          responseType: "arraybuffer",
        }
      );

      const imgBuffer = Buffer.from(response.data, "binary");
      const imgPath = path.join(__dirname, `hfimg_${Date.now()}.png`);

      fs.writeFileSync(imgPath, imgBuffer);

      await message.reply({
        body: `🖼️ Here is your image for: "${prompt}"`,
        attachment: fs.createReadStream(imgPath),
      });

      fs.unlinkSync(imgPath);
    } catch (error) {
      console.error(error.response?.data || error.message);
      return message.reply(
        "❌ Error generating image. Try again later or check API token."
      );
    }
  },
};
