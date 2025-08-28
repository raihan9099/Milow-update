const { createCanvas } = require("canvas");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "balanceCard",
    aliases: ["balcard"],
    version: "1.0",
    author: "Raihan",
    shortDescription: "💰 Premium Metallic Balance Card",
    longDescription: "Generates a premium metallic-style balance card with gold border and elegant text.",
    category: "Utility"
  },

  onStart: async function({ api, event, args, usersData }) {
    const { senderID, threadID } = event;

    try {
      // Fetch user data
      const user = await usersData.get(senderID);
      if (!user || typeof user.money !== "number") 
        return api.sendMessage("🔒 User data not found or invalid.", threadID);

      // Balance text (optional override via args)
      const balanceText = args[0] || this.formatMoney(user.money);

      // Generate card
      const cardPath = await module.exports.generatePremiumBalanceCard(user.name || "User", balanceText);

      // Send card
      await api.sendMessage({ attachment: fs.createReadStream(cardPath) }, threadID);

      // Cleanup
      await fs.remove(cardPath);

    } catch (error) {
      console.error("Balance Card Error:", error);
      api.sendMessage("❌ Failed to generate balance card. Please try again.", threadID);
    }
  },

  generatePremiumBalanceCard: async function(userName, balance) {
    const width = 600;
    const height = 250;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Background: metallic gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#B5B5B5"); // Light gray
    gradient.addColorStop(1, "#8A8A8A"); // Dark gray
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Border: gold
    ctx.strokeStyle = "#D4AF37";
    ctx.lineWidth = 5;
    ctx.strokeRect(5, 5, width - 10, height - 10);

    // Header: "💰 BALANCE"
    ctx.fillStyle = "#fff";
    ctx.font = "bold 50px Sans";
    ctx.textAlign = "center";
    ctx.fillText("💰 BALANCE", width / 2, 80);

    // User Name
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 6;
    ctx.fillStyle = "#fff";
    ctx.font = "bold 40px Sans";
    ctx.fillText(userName, width / 2, 160);

    // Balance
    ctx.shadowBlur = 12;
    ctx.fillStyle = "#FFD700"; // Gold
    ctx.font = "bold 70px Sans";
    ctx.fillText(balance, width / 2, 260);

    // Save image
    const cardPath = path.join(__dirname, `premium_balance_${Date.now()}.png`);
    const buffer = canvas.toBuffer("image/png");
    await fs.writeFile(cardPath, buffer);

    return cardPath;
  },

  formatMoney: function(amount) {
    const units = ["", "K", "M", "B"];
    let unitIndex = 0;
    let num = Number(amount);

    while (num >= 1000 && unitIndex < units.length - 1) {
      num /= 1000;
      unitIndex++;
    }

    return num.toFixed(num % 1 ? 2 : 0) + units[unitIndex];
  }
};
