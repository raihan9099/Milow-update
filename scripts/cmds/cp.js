const fs = require("fs");

module.exports = {
  config: {
    name: "cp",
    aliases: ["colorpicker"],
    version: "1.0",
    author: "Mehrin x ChatGPT",
    countDown: 5,
    role: 0,
    shortDescription: "Pick the correct color to win coins",
    longDescription: "A color picker betting game where you guess the correct color",
    category: "Games"
  },

  onStart: async function () { },

  onChat: async function ({ event, api, args }) {
    const userID = event.senderID;
    const bet = parseInt(args[0]);
    if (!bet || bet <= 0) {
      return api.sendMessage("⚠️ Please enter a valid bet amount.\nExample: cp 100", event.threadID, event.messageID);
    }

    // JSON file setup
    const file = __dirname + "/cp.json";
    if (!fs.existsSync(file)) fs.writeFileSync(file, "{}");
    const data = JSON.parse(fs.readFileSync(file));

    // Init balance if user not exists
    if (!data[userID]) data[userID] = { balance: 5000 };

    const user = data[userID];
    if (user.balance < bet) {
      return api.sendMessage("💸 You don't have enough money to play.", event.threadID, event.messageID);
    }

    // Deduct bet temporarily
    user.balance -= bet;

    // Possible colors
    const colors = ["🟡", "🔵", "⚪"];
    const options = [
      { num: 1, color: colors[Math.floor(Math.random() * colors.length)] },
      { num: 2, color: colors[Math.floor(Math.random() * colors.length)] },
      { num: 3, color: colors[Math.floor(Math.random() * colors.length)] }
    ];

    const correctOption = options[Math.floor(Math.random() * options.length)];

    // Save current round
    user.currentRound = {
      bet,
      correct: correctOption.num,
      correctColor: correctOption.color
    };

    fs.writeFileSync(file, JSON.stringify(data, null, 2));

    const msg = `🎨 PICK THE COLOR!\n\n` +
      options.map(o => `${o.num}. ${o.color}`).join("   ") +
      `\n\n➡️ Reply with 1, 2, or 3`;

    api.sendMessage(msg, event.threadID, (err, info) => {
      if (err) return;
      global.GoatBot.onReply.set(info.messageID, {
        type: "cp",
        name: "cp",
        author: userID,
        messageID: info.messageID
      });
    });
  },

  onReply: async function ({ event, api, Reply }) {
    const userID = event.senderID;
    const file = __dirname + "/cp.json";
    const data = JSON.parse(fs.readFileSync(file));
    const user = data[userID];

    if (!user || !user.currentRound) {
      return api.sendMessage("⚠️ No active game found!", event.threadID, event.messageID);
    }

    const choice = parseInt(event.body);
    if (![1, 2, 3].includes(choice)) {
      return api.sendMessage("⚠️ Please reply with 1, 2, or 3 only.", event.threadID, event.messageID);
    }

    const { bet, correct, correctColor } = user.currentRound;
    let resultMsg = "";

    if (choice === correct) {
      const win = bet * 2;
      user.balance += bet + win; // Return bet + win
      resultMsg = `✅ Correct! The color was ${correctColor}\n💰 You won ${win} coins!\n💵 Balance: ${user.balance}`;
    } else {
      // Already deducted bet
      resultMsg = `❌ Wrong! The correct was ${correct} ${correctColor}\n💸 You lost ${bet} coins\n💵 Balance: ${user.balance}`;
    }

    delete user.currentRound;

    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    api.sendMessage(resultMsg, event.threadID, event.messageID);
  }
};
