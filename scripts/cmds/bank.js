var fs = require("fs");
var pathFile = __dirname + "/bank.json";

// Ensure bank.json exists
if (!fs.existsSync(pathFile)) {
    fs.writeFileSync(pathFile, JSON.stringify({}, null, 2));
}

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
        version: "2.0",
        author: "Raihan Upgrade",
        countDown: 3,
        role: 0,
        description: "💰 Bank system with deposit, withdraw, loan & top list",
        category: "economy",
        guide: {
            en: "-bank bal | deposit [amount] | withdraw [amount/all] | top | loan"
        }
    },

    onStart: async function(data) {
        var message = data.message;
        var event = data.event;
        var args = data.args;
        var usersData = data.usersData;

        var senderID = Number(event.senderID);
        var user = await usersData.get(senderID);

        var bankData = loadBank();
        if (!bankData[senderID]) {
            bankData[senderID] = { balance: 0, preloan: false };
        }

        var action = args[0] ? args[0].toLowerCase() : "";
        var amount = parseInt(args[1]);

        if (action === "bal" || action === "balance") {
            return message.reply("💰 Your bank balance: " + bankData[senderID].balance.toLocaleString() + " coins");
        }

        if (action === "deposit") {
            if (!amount || amount <= 0) return message.reply("❌ Enter a valid amount!");
            if (user.money < amount) return message.reply("❌ You don't have enough money!");
            user.money -= amount;
            bankData[senderID].balance += amount;
            await usersData.set(senderID, user);
            saveBank(bankData);
            return message.reply("✅ Deposited " + amount.toLocaleString() + " coins.\n💰 Bank balance: " + bankData[senderID].balance.toLocaleString());
        }

        if (action === "withdraw") {
            if (!amount && args[1] !== "all") return message.reply("❌ Enter a valid amount or 'all'!");

            if (args[1] === "all") {
                amount = bankData[senderID].balance;
                if (amount <= 0) return message.reply("❌ Your bank is empty!");
            }

            if (amount <= 0) return message.reply("❌ Enter a valid amount!");
            if (bankData[senderID].balance < amount) return message.reply("❌ Insufficient bank balance!");

            bankData[senderID].balance -= amount;
            user.money += amount;
            await usersData.set(senderID, user);
            saveBank(bankData);
            return message.reply("✅ Withdrawn " + amount.toLocaleString() + " coins.\n💰 Bank balance: " + bankData[senderID].balance.toLocaleString());
        }

        if (action === "loan") {
            if (bankData[senderID].preloan) return message.reply("❌ You already took a loan!");
            var loanAmount = 1000000;
            user.money += loanAmount;
            bankData[senderID].preloan = true;
            await usersData.set(senderID, user);
            saveBank(bankData);
            return message.reply("💸 You received a loan of " + loanAmount.toLocaleString() + " coins!");
        }

        if (action === "top") {
            var ids = Object.keys(bankData);
            var rich = [];
            for (var i = 0; i < ids.length; i++) {
                var id = Number(ids[i]);
                if (bankData[id] && bankData[id].balance > 0) {
                    rich.push({ id: id, balance: bankData[id].balance });
                }
            }

            if (rich.length === 0) return message.reply("🏦 No bank deposits yet!");

            rich.sort(function(a, b) { return b.balance - a.balance; });
            if (rich.length > 10) rich = rich.slice(0, 10);

            var topMsg = "🏦 Top 10 Bank Balances:\n";
            for (var j = 0; j < rich.length; j++) {
                var dataUser = await usersData.get(rich[j].id);
                var name = (dataUser && dataUser.name) ? dataUser.name : rich[j].id;
                topMsg += (j + 1) + ". " + name + ": " + rich[j].balance.toLocaleString() + " coins\n";
            }
            return message.reply(topMsg);
        }

        return message.reply("❌ Invalid bank command!");
    }
};
