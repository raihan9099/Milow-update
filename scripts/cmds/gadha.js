const fs = require("fs-extra");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

module.exports = {
  config: {
    name: "gadha",
    version: "1.0",
    author: "Maruf & ChatGPT",
    countDown: 2,
    role: 0,
    shortDescription: "🐴 Turn someone into a gadha (donkey)",
    longDescription: "Mention someone and place their profile picture on a donkey's face.",
    category: "fun",
    guide: "{pn} @mention"
  },

  onStart: async function ({ event, api, usersData }) {
    const mentionIDs = Object.keys(event.mentions);

    if (mentionIDs.length === 0) {
      return api.sendMessage(
        "🐴 Tag someone to turn them into a gadha!",
        event.threadID,
        event.messageID
      );
    }

    const targetID = mentionIDs[0];
    const targetName = event.mentions[targetID];

    const gadhaPath = path.join(__dirname, "Cache", "gadha.png");
    if (!fs.existsSync(gadhaPath)) {
      return api.sendMessage(
        "❌ Gadha image not found! Put gadha.png in scripts/cmds/Cache/",
        event.threadID,
        event.messageID
      );
    }

    // Get avatar URL (GoatBot way)
    const avatarURL = await usersData.getAvatarUrl(targetID);
    const avatar = await loadImage(avatarURL);

    // Load gadha image
    const gadhaImage = await loadImage(gadhaPath);
    const canvas = createCanvas(gadhaImage.width, gadhaImage.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(gadhaImage, 0, 0);

    // ✅ Adjusted size and position of profile pic
    const avatarSize = 140;
    const avatarX = 70;
    const avatarY = 55;

    // Draw circular profile pic
    ctx.save();
    ctx.beginPath();
    ctx.arc(
      avatarX + avatarSize / 2,
      avatarY + avatarSize / 2,
      avatarSize / 2,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
    ctx.restore();

    const outputPath = path.join(__dirname, "Cache", `gadha_${Date.now()}.jpg`);
    await fs.writeFile(outputPath, canvas.toBuffer());

    await api.sendMessage(
      {
        body: `🐴 ${targetName} এখন একটা গাধা হয়ে গেছে! 😂`,
        mentions: [{ id: targetID, tag: targetName }],
        attachment: fs.createReadStream(outputPath),
      },
      event.threadID,
      async () => {
        await fs.unlink(outputPath);
      }
    );
  }
};
