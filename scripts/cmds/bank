const fs = require("fs");
const pathFile = "./bank.json";

// Ensure bank.json exists
if (!fs.existsSync(pathFile)) {
    const sampleBank = {};
    for (let i = 1; i <= 15; i++) {
        sampleBank["user" + i] = {
            balance: Math.floor(Math.random() * 1000000),
            preloan: Math.random() < 0.3
        };
    }
    fs.writeFileSync(pathFile, JSON.stringify(sampleBank, null, 2));
}

// Helper functions
function loadBank() {
    return JSON.parse(fs.readFileSync(pathFile, "utf8"));
}

function saveBank(data) {
    fs.writeFileSync(pathFile, JSON.stringify(data, null, 2));
}

module.exports = {
    config: {
        name: "bank",
        aliases: [],
        version: "1.8",
        author: "Raihan Upgrade",
        countDown: 3,
        role: 0,
        description: "💰 Bank system with hidden storage, loan, deposit, withdraw & top list",
        category: "economy",
        guide: {
            en: "-bank bal | deposit [amount] | withdraw [amount/all] | top | loan"
        }
    },

    onStart: async function({ message, event, args, usersData }) {
        const senderID = event.senderID;

        // Ensure user exists
        try {
            await usersData.create(senderID);
        } catch (e) {}

        let user = await usersData.get(senderID);
        if (!user) user = { money: 0 };
        if (!user.money) user.money = 0;

        let bankData = loadBank();
        if (!bankData[senderID]) bankData[senderID] = { balance: 0, preloan: false };

        const action = args[0] ? args[0].toLowerCase() : null;
        let amount = parseInt(args[1]);

        if (!action) return message.reply("❌ Use: -bank bal | deposit [amount] | withdraw [amount/all] | top | loan");

        // Balance summary
        if (action === "bal" || action === "balance") {
            const wallet = Number(user.money).toLocaleString();
            const bankBal = Number(bankData[senderID].balance).toLocaleString();
            const loan = bankData[senderID].preloan ? "1" : "0";

            return message.reply(
                "🏦 Your Bank Account Summary:\n" +
                "💰 Wallet: " + wallet + "\n" +
                "🏦 Bank: " + bankBal + "\n" +
                "💳 Loan: " + loan
            );
        }

        // Deposit
        if (action === "deposit") {
            if (!amount || amount <= 0) return message.reply("❌ Enter a valid amount!");
            if (user.money < amount) return message.reply("❌ You don't have enough money!");
            user.money -= amount;
            bankData[senderID].balance += amount;
            await usersData.set(senderID, user);
            saveBank(bankData);
            return message.reply("✅ Deposited " + amount.toLocaleString() + " coins.\n💰 Bank balance: " + bankData[senderID].balance.toLocaleString());
        }

        // Withdraw
        if (action === "withdraw") {
            if (!amount && args[1] !== "all") return message.reply("❌ Enter a valid amount or 'all'!");
            if (args[1] === "all") amount = bankData[senderID].balance;
            if (amount <= 0) return message.reply("❌ Enter a valid amount!");
            if (bankData[senderID].balance < amount) return message.reply("❌ Insufficient bank balance!");

            bankData[senderID].balance -= amount;
            user.money += amount;
            await usersData.set(senderID, user);
            saveBank(bankData);
            return message.reply("✅ Withdrawn " + amount.toLocaleString() + " coins from your bank.\n💰 Bank balance: " + bankData[senderID].balance.toLocaleString());
        }

        // Loan
        if (action === "loan") {
            if (bankData[senderID].preloan) return message.reply("❌ You already took a loan!");
            const loanAmount = 1000000;
            user.money += loanAmount;
            bankData[senderID].preloan = true;
            await usersData.set(senderID, user);
            saveBank(bankData);
            return message.reply("💸 You received a loan of " + loanAmount.toLocaleString() + " coins!");
        }

        // Top 10
        if (action === "top") {
            const sorted = Object.keys(bankData)
                .map(id => ({ id, balance: bankData[id].balance }))
                .filter(u => u.balance > 0)
                .sort((a, b) => b.balance - a.balance)
                .slice(0, 10);

            if (!sorted.length) return message.reply("🏦 No bank deposits yet!");

            let topMsg = "🏦 Top 10 Bank Balances:\n";

            for (let i = 0; i < sorted.length; i++) {
                let userName = sorted[i].id;
                const idNum = Number(sorted[i].id);

                if (!isNaN(idNum)) {
                    try {
                        const userData = await usersData.get(idNum);
                        if (userData && userData.name) userName = userData.name;
                    } catch (e) {}
                }

                topMsg += (i + 1) + ". " + userName + ": " + sorted[i].balance.toLocaleString() + " coins\n";
            }

            return message.reply(topMsg);
        }

        return message.reply("❌ Invalid bank command!");
    }
};
