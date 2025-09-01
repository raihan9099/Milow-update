const axios = require("axios");
const baseUrl = "https://raw.githubusercontent.com/Saim12678/Caption-/cb09081c2e6e9c282914e0812a7b0a8f054e0367/captions";

const exampleCaption = (prefix = "/") => `Example:
 ${prefix}caption anime
 ${prefix}caption love
 ${prefix}caption sad`;

const availableCategories = [
  "anime", "attitude", "alone", "breakup", "birthday",
  "emotional", "friendship", "funny", "islamic", "love",
  "motivational", "romantic", "sad", "success", "advice"
];

module.exports = {
  config: {
    name: "caption",
    version: "1.1",
    author: "Ew'r Saim",
    role: 0,
    aliases: ["quote"],
    shortDescription: { en: "Get Bangla & English captions by category" },
    longDescription: { en: "Anime, love, sad, attitude, motivational, advice etc. captions." },
    category: "media",
    guide: { en: "{pn} [category]" }
  },

  onStart: async function ({ args, message }) {
    const prefix = global.GoatBot.config.prefix;
    const category = args[0]?.toLowerCase();

    if (!category || !availableCategories.includes(category)) {
      const list = availableCategories.map(c => `• ${c}`).join("\n");
      return message.reply(
        `❌ | Please provide a valid caption category.\n\n✅ Available categories:\n${list}\n\n${exampleCaption(prefix)}`
      );
    }

    try {
      const url = `${baseUrl}/${category}.json`;
      const res = await axios.get(url);
      const captions = res.data;

      if (!Array.isArray(captions) || captions.length === 0) {
        return message.reply("❌ | No captions found for this category.");
      }

      const randomCaption = captions[Math.floor(Math.random() * captions.length)];
      const { bn, en } = randomCaption;

      if (!bn || !en) {
        return message.reply("❌ | Failed to fetch caption. Please try again later.");
      }

      return message.reply(
`✅ | Here's your >${category}< caption:

┍━[ 𝐁𝐚𝐧𝐠𝐥𝐚 ]
┋❍ ${bn}
┕━━━━━━━━━━━━━━☆

┍━[ 𝐄𝐧𝐠𝐥𝐢𝐬𝐡 ]
┋❍ ${en}
┕━━━━━━━━━━━━━━☆`
      );
    } catch (err) {
      console.error(err);
      return message.reply("❌ | Failed to load caption. Please try again later.");
    }
  }
};
