module.exports = {
  config: {
    name: "slots",
    aliases: ["slot", "spin"],
    version: "2.3",
    author: "Raihan Upgrade",
    countDown: 3,
    role: 0,
    description: "🎰 Dynamic Slot Machine with coins & stylish headers",
    category: "game",
    guide: {
      en: "{pn} [bet]"
    }
  },

  onStart: async function ({ message, event, args, usersData, api }) {
    const { senderID } = event;
    const bet = parseInt(args[0]);

    // Format money
    const formatMoney = (amount) => {
      if (isNaN(amount)) return "💲0";
      amount = Number(amount);
      const scales = [
        { value: 1e15, suffix: 'Q', color: '🌈' },
        { value: 1e12, suffix: 'T', color: '✨' },
        { value: 1e9,  suffix: 'B', color: '💎' },
        { value: 1e6,  suffix: 'M', color: '💰' },
        { value: 1e3,  suffix: 'k', color: '💵' }
      ];
      const scale = scales.find(s => amount >= s.value);
      if (scale) {
        const scaledValue = (amount / scale.value).toFixed(2).replace(/\.00$/, "");
        return `${scale.color}${scaledValue}${scale.suffix}`;
      }
      return `💲${amount.toLocaleString()}`;
    };

    // Validate
    if (isNaN(bet) || bet <= 0) return message.reply("❌ Please enter a valid bet!");
    const user = await usersData.get(senderID);
    if (user.money < bet) return message.reply(`❌ You need ${formatMoney(bet - user.money)} more to play!`);

    // Headers (5 styles)
    const headers = [
      "╔══════════════╗\n 🎰 SLOT MACHINE 🎰\n╚══════════════╝",
      "🎰━━ SLOT MACHINE ━━🎰",
      "★彡[ 🎰 SLOT MACHINE 🎰 ]彡★",
      "✪✪✪  🎰 SLOT MACHINE 🎰  ✪✪✪",
      "[ 🎰 SLOT MACHINE 🎰 ]"
    ];
    const header = headers[Math.floor(Math.random() * headers.length)];

    // Symbols with weights
    const symbols = [
      { emoji: "🍒", weight: 30 },
      { emoji: "🍋", weight: 25 },
      { emoji: "🍇", weight: 20 },
      { emoji: "🍉", weight: 15 },
      { emoji: "⭐",  weight: 7 },
      { emoji: "7️⃣", weight: 3 }
    ];

    const roll = () => {
      const totalWeight = symbols.reduce((sum, s) => sum + s.weight, 0);
      let random = Math.random() * totalWeight;
      for (const s of symbols) {
        if (random < s.weight) return s.emoji;
        random -= s.weight;
      }
      return symbols[0].emoji;
    };

    const slot1 = roll(), slot2 = roll(), slot3 = roll();

    // Win calc
    let winnings = 0, outcome, winType = "", bonus = "", coinsEarned = 0;
    if (slot1 === "7️⃣" && slot2 === "7️⃣" && slot3 === "7️⃣") {
      winnings = bet * 10;
      coinsEarned = bet * 5; // jackpot → many coins
      outcome = "🔥 MEGA JACKPOT! TRIPLE 7️⃣!";
      winType = "💎 MAX WIN";
      bonus = "🎆 BONUS: +3% boost!";
    } 
    else if (slot1 === slot2 && slot2 === slot3) {
      winnings = bet * 5;
      coinsEarned = bet * 3;
      outcome = "💰 JACKPOT! 3 matching!";
      winType = "💫 BIG WIN";
    } 
    else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
      winnings = bet * 2;
      coinsEarned = bet * 1;
      outcome = "✨ NICE! 2 matching!";
      winType = "🌟 WIN";
    } 
    else if (Math.random() < 0.5) {
      winnings = bet * 1.5;
      coinsEarned = Math.floor(bet * 0.5);
      outcome = "🎯 LUCKY SPIN! Bonus!";
      winType = "🍀 SMALL WIN";
    } 
    else {
      winnings = -bet;
      coinsEarned = 0; // loss, no coin
      outcome = "💸 Better luck next time!";
      winType = "☠️ LOSS";
    }

    let newBalance = user.money + winnings;
    if (slot1 === "7️⃣" && slot2 === "7️⃣" && slot3 === "7️⃣") newBalance *= 1.03;
    if (newBalance < 0) newBalance = 0;

    // save both money & coins
    await usersData.set(senderID, { 
      money: newBalance, 
      coins: (user.coins || 0) + coinsEarned 
    });

    const resultText = winnings >= 0 
      ? `🟢 WON: ${formatMoney(winnings)}` 
      : `🔴 LOST: ${formatMoney(bet)}`;

    // First "spinning" message
    const spinMsg = await message.reply(`${header}\n\n\n🎰 [ ⏳ | ⏳ | ⏳ ] 🎰\n\nSpinning...`);

    // After 2s → show result
    setTimeout(() => {
      api.editMessage(
        `${header}\n\n\n🎰 [ ${slot1} | ${slot2} | ${slot3} ] 🎰\n\n${outcome}\n${winType}\n${bonus ? bonus + "\n" : ""}${resultText}\n💰 Balance: ${formatMoney(newBalance)}\n🪙 Coins Earned: ${coinsEarned}\n\n💡 TIP: Higher bets = higher jackpot chance!`,
        spinMsg.messageID
      );
    }, 2000);
  }
};
