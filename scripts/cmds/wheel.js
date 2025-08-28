module.exports = {
  config: {
    name: "wheel",
    version: "3.2",
    author: "Raihan",
    shortDescription: "🎡 Ultra-Stable Wheel Game",
    longDescription: "Guaranteed smooth spinning experience with automatic fail-safes and animated spin preview",
    category: "Game",
    guide: {
      en: "{p}wheel <amount>"
    }
  },

  onStart: async function ({ api, event, args, usersData }) {
    const { senderID, threadID } = event;
    let betAmount = 0;

    try {
      betAmount = this.sanitizeBetAmount(args[0]);
      if (!betAmount) {
        return api.sendMessage(
          `❌ Invalid bet amount! Usage: ${global.GoatBot.config.prefix}wheel 500`,
          threadID
        );
      }

      const user = await usersData.get(senderID);
      if (!this.isValidUserData(user)) {
        return api.sendMessage(
          "🔒 Account verification failed. Please contact support.",
          threadID
        );
      }

      if (betAmount > user.money) {
        return api.sendMessage(
          `❌ Insufficient balance! You have: ${this.formatMoney(user.money)}`,
          threadID
        );
      }

      const { result, winAmount } = await this.executeSpin(api, threadID, betAmount);

      const newBalance = user.money + winAmount;
      await usersData.set(senderID, { money: newBalance });

      return api.sendMessage(
        this.generateResultText(result, winAmount, betAmount, newBalance),
        threadID
      );

    } catch (error) {
      console.error("Wheel System Error:", error);
      return api.sendMessage(
        `🎡 System recovered! Your ${this.formatMoney(betAmount)} coins are safe. Try spinning again.`,
        threadID
      );
    }
  },

  sanitizeBetAmount: function(input) {
    const amount = parseInt(String(input || "").replace(/[^0-9]/g, ""));
    return amount > 0 ? amount : null;
  },

  isValidUserData: function(user) {
    return user && typeof user.money === "number" && user.money >= 0;
  },

  async executeSpin(api, threadID, betAmount) {
    const wheelSegments = [
      { emoji: "🍒", multiplier: 0.5, weight: 20 },
      { emoji: "🍋", multiplier: 1, weight: 30 },
      { emoji: "🍊", multiplier: 2, weight: 25 },
      { emoji: "🍇", multiplier: 3, weight: 15 },
      { emoji: "💎", multiplier: 5, weight: 7 },
      { emoji: "💰", multiplier: 10, weight: 3 }
    ];

    // 1️⃣ Send placeholder
    let msg = await api.sendMessage("🌀 Spinning the wheel...", threadID);

    // 2️⃣ Animate spin preview
    for (let i = 0; i < 5; i++) {
      const randomPreview = Array(3).fill(0).map(() => {
        const seg = wheelSegments[Math.floor(Math.random() * wheelSegments.length)];
        return seg.emoji;
      }).join(" | ");

      await new Promise(r => setTimeout(r, 800));

      try {
        await api.editMessage(`🎡 Wheel: ${randomPreview}`, msg.messageID, threadID);
      } catch {
        // fallback if edit not supported
        await api.unsendMessage(msg.messageID);
        const newMsg = await api.sendMessage(`🎡 Wheel: ${randomPreview}`, threadID);
        msg.messageID = newMsg.messageID;
      }
    }

    // 3️⃣ Calculate real result
    const totalWeight = wheelSegments.reduce((sum, seg) => sum + seg.weight, 0);
    const randomValue = Math.random() * totalWeight;
    let cumulativeWeight = 0;
    const result = wheelSegments.find(seg => {
      cumulativeWeight += seg.weight;
      return randomValue <= cumulativeWeight;
    }) || wheelSegments[0];

    const winAmount = Math.floor(betAmount * result.multiplier) - betAmount;

    // 4️⃣ Edit message to final result
    try {
      await api.editMessage(
        `🎡 FINAL RESULT: ${result.emoji}\n\n` +
        this.getOutcomeText(result.multiplier, winAmount, betAmount),
        msg.messageID,
        threadID
      );
    } catch {
      // fallback if edit fails
      await api.sendMessage(
        `🎡 FINAL RESULT: ${result.emoji}\n\n` +
        this.getOutcomeText(result.multiplier, winAmount, betAmount),
        threadID
      );
    }

    return { result, winAmount };
  },

  generateResultText: function(result, winAmount, betAmount, newBalance) {
    const resultText = [
      `🎡 WHEEL STOPPED ON: ${result.emoji}`,
      "",
      this.getOutcomeText(result.multiplier, winAmount, betAmount),
      `💰 NEW BALANCE: ${this.formatMoney(newBalance)}`
    ].join("\n");

    return resultText;
  },

  getOutcomeText: function(multiplier, winAmount, betAmount) {
    if (multiplier < 1) return `❌ LOST: ${this.formatMoney(betAmount * 0.5)}`;
    if (multiplier === 1) return "➖ BROKE EVEN";
    return `✅ WON ${multiplier}X! (+${this.formatMoney(winAmount)})`;
  },

  formatMoney: function(amount) {
    const units = ["", "K", "M", "B"];
    let unitIndex = 0;

    while (amount >= 1000 && unitIndex < units.length - 1) {
      amount /= 1000;
      unitIndex++;
    }

    return amount.toFixed(amount % 1 ? 2 : 0) + units[unitIndex];
  }
};
