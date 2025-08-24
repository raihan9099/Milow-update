// scripts/cmds/casino.js
const fs = require("fs");
const path = require("path");

// Persistent storage
const dataFile = path.join(__dirname, "userdata.json");

// Load or initialize user data
let userData = { balances: {}, dailySpins: {}, guesses: {} };
if (fs.existsSync(dataFile)) {
  try {
    userData = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  } catch (e) {
    console.error("Error reading userdata.json, starting fresh.");
  }
}

const emojiChoices = ["🍒", "🍋", "🍉", "⭐", "💎", "7️⃣"];

function saveData() {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(userData, null, 2));
  } catch (e) {
    console.error("Error writing userdata.json:", e);
  }
}

function getBalance(uid) {
  if (!userData.balances[uid]) userData.balances[uid] = 100;
  return userData.balances[uid];
}

function updateBalance(uid, amount) {
  userData.balances[uid] = Math.max(0, getBalance(uid) + amount);
  saveData();
  return userData.balances[uid];
}

function getDailySpins(uid) {
  if (!userData.dailySpins[uid]) userData.dailySpins[uid] = 0;
  return userData.dailySpins[uid];
}

function incrementDailySpin(uid) {
  if (!userData.dailySpins[uid]) userData.dailySpins[uid] = 0;
  userData.dailySpins[uid]++;
  saveData();
}

module.exports = {
  name: "casino",
  author: "Raihan",
  category: "fun",
  description: "Emoji Casino Game with persistent JSON storage",
  cooldown: 2,

  onStart: async function ({ api, event, args }) {
    const { threadID, senderID } = event;
    const cmd = args[0] ? args[0].toLowerCase() : "";

    if (cmd === "bal") {
      return api.sendMessage(`💰 Your balance: ${getBalance(senderID)} coins`, threadID);
    }

    if (cmd === "spin") {
      const bet = parseInt(args[1]);
      if (!bet || bet <= 0) return api.sendMessage("⚠️ Usage: /spin <amount>", threadID);
      if (getBalance(senderID) < bet) return api.sendMessage("❌ Not enough coins!", threadID);
      if (getDailySpins(senderID) >= 20) return api.sendMessage("🛑 Daily spin limit reached (20/day).", threadID);

      incrementDailySpin(senderID);

      const roll = [
        emojiChoices[Math.floor(Math.random() * emojiChoices.length)],
        emojiChoices[Math.floor(Math.random() * emojiChoices.length)],
        emojiChoices[Math.floor(Math.random() * emojiChoices.length)],
      ];

      let resultMsg = `🎰 [ ${roll.join(" | ")} ] 🎰\n`;
      if (roll[0] === roll[1] && roll[1] === roll[2]) {
        updateBalance(senderID, bet * 5);
        resultMsg += `✨ JACKPOT! You won ${bet * 5} coins!\n`;
      } else if (roll[0] === roll[1] || roll[1] === roll[2] || roll[0] === roll[2]) {
        updateBalance(senderID, bet * 2);
        resultMsg += `✅ Nice! You won ${bet * 2} coins!\n`;
      } else {
        updateBalance(senderID, -bet);
        resultMsg += `❌ You lost ${bet} coins!\n`;
      }

      resultMsg += `💰 Balance: ${getBalance(senderID)} | Spins today: ${getDailySpins(senderID)}/20`;
      return api.sendMessage(resultMsg, threadID);
    }

    if (cmd === "guess") {
      const bet = parseInt(args[1]);
      if (!bet || bet <= 0) return api.sendMessage("⚠️ Usage: /guess <amount>", threadID);
      if (getBalance(senderID) < bet) return api.sendMessage("❌ Not enough coins!", threadID);

      const target = emojiChoices[Math.floor(Math.random() * emojiChoices.length)];
      const options = [...emojiChoices].sort(() => 0.5 - Math.random()).slice(0, 3);
      if (!options.includes(target)) options[Math.floor(Math.random() * 3)] = target;

      userData.guesses[senderID] = { target, bet, options };
      saveData();

      return api.sendMessage(
        `🤔 Guess the correct emoji!\nOptions: 1) ${options[0]}  2) ${options[1]}  3) ${options[2]}\nReply with 1, 2, or 3.`,
        threadID
      );
    }

    return api.sendMessage("⚠️ Commands: /bal | /spin <amount> | /guess <amount>", threadID);
  },

  onReply: async function ({ api, event }) {
    const { threadID, senderID, body } = event;
    const game = userData.guesses[senderID];
    if (!game) return;

    const choice = parseInt(body.trim());
    if (![1, 2, 3].includes(choice)) return api.sendMessage("⚠️ Reply with 1, 2, or 3 only!", threadID);

    const { target, bet, options } = game;
    const chosenEmoji = options[choice - 1];

    let msg = "";
    if (chosenEmoji === target) {
      updateBalance(senderID, bet * 3);
      msg = `✅ Correct! It was ${target}. You won ${bet * 3} coins!`;
    } else {
      updateBalance(senderID, -bet);
      msg = `❌ Wrong! The answer was ${target}. You lost ${bet} coins.`;
    }

    msg += `\n💰 Balance: ${getBalance(senderID)}`;
    delete userData.guesses[senderID];
    saveData();

    return api.sendMessage(msg, threadID);
  },
};
