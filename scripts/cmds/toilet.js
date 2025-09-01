const fs = require("fs-extra");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

module.exports = {
  config: {
    name: "toilet",
    version: "3.2",
    author: "Maruf & ChatGPT",
    countDown: 2,
    role: 0,
    shortDescription: "🚽 Flush someone to the toilet",
    longDescription: "Mention someone and place their profile picture inside the toilet bowl (smaller PP).",
    category: "fun",
    guide: "{pn} @mention"
  },

  onStart: async function ({ event, api, usersData }) {
    const mentionIDs = Object.keys(event.mentions);

    if (mentionIDs.length === 0) {
      return api.sendMessage(
        "🚽 Tag someone to flush them into the toilet!",
        event.threadID,
        event.messageID
      );
    }

    const targetID = mentionIDs[0];
    const targetName = event.mentions[targetID];

    const toiletPath = path.join(__dirname, "Cache", "toilet.png");
    if (!fs.existsSync(toiletPath)) {
      return api.sendMessage(
        "❌ Toilet background image not found! Put toilet.png in scripts/cmds/Cache/",
        event.threadID,
        event.messageID
      );
    }

    // GoatBot built-in avatar fetch (no Graph API)
    const avatarURL = await usersData.getAvatarUrl(targetID);
    const avatar = await loadImage(avatarURL);

    // Background
    const background = await loadImage(toiletPath);
    const canvas = createCanvas(background.width, background.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Avatar size: Smaller (35% of width instead of 45%)
    const avatarSize = Math.floor(canvas.width * 0.35);

    // Center horizontally
    const avatarX = (canvas.width - avatarSize) / 2;

    // Position vertically (slightly adjusted)
    const avatarY = canvas.height * 0.72 - avatarSize / 2;

    // Circular mask for avatar
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

    const outputPath = path.join(__dirname, "Cache", `toilet_${Date.now()}.jpg`);
    await fs.writeFile(outputPath, canvas.toBuffer());

    await api.sendMessage(
      {
        body: `🚽 ${targetName} just got flushed into the toilet!`,
        mentions: [{ id: targetID, tag: targetName }],
        attachment: fs.createReadStream(outputPath),
      },
      event.threadID,
      async () => {
        await fs.unlink(outputPath);
      }
    );
  },
};
