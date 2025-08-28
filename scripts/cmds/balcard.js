const fs = require("fs-extra");
const path = require("path");
const puppeteer = require("puppeteer");

module.exports = {
  config: {
    name: "balanceCard",
    aliases: ["balcard"],
    version: "1.0",
    author: "Raihan",
    shortDescription: "💰 Premium Self-contained Balance Card",
    longDescription: "Generates a premium HTML/CSS-style balance card with Unicode icons only, no external links.",
    category: "Utility"
  },

  onStart: async function({ api, event, args, usersData }) {
    const { senderID, threadID } = event;

    try {
      const user = await usersData.get(senderID);
      if(!user || typeof user.money !== "number") 
        return api.sendMessage("🔒 User data not found or invalid.", threadID);

      const userName = user.name || "User";
      const balance = args[0] || this.formatMoney(user.money);
      const userID = senderID;

      const htmlContent = this.generateHTMLCard(userName, balance, userID);

      const imagePath = path.join(__dirname, `balance_card_${Date.now()}.png`);
      const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
      const page = await browser.newPage();
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
      await page.setViewport({ width: 500, height: 500 });
      const cardElement = await page.$('body > div.balance-card');
      await cardElement.screenshot({ path: imagePath });
      await browser.close();

      await api.sendMessage({ attachment: fs.createReadStream(imagePath) }, threadID);
      await fs.remove(imagePath);

    } catch (err) {
      console.error("Balance Card Error:", err);
      api.sendMessage("❌ Failed to generate balance card.", threadID);
    }
  },

  generateHTMLCard: function(userName, balance, userID) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #2c1f0e;
          }
          .balance-card {
            background: linear-gradient(145deg, #A67C52, #C19A6B);
            color: white; padding: 30px 40px; border-radius: 20px; width: 450px;
            border: 3px solid #D4AF37; box-shadow: 0 15px 30px rgba(0,0,0,0.5);
            display: flex; flex-direction: column; gap: 20px;
          }
          .card-header { text-align: center; font-size: 30px; font-weight: bold; color: #FFD700; }
          .card-header span { margin: 0 15px; }
          .user-details { display: flex; flex-direction: column; gap: 10px; }
          .user-info { display: flex; align-items: center; gap: 15px; font-size: 26px; font-weight: 600; }
          .user-id { font-size: 16px; color: #f5deb3; padding-left: 36px; margin-top: -10px; }
          .balance { text-align: center; font-size: 50px; font-weight: bold; color: #2ecc71; margin-top: 10px; text-shadow: 0 2px 8px rgba(0,0,0,0.5); }
        </style>
      </head>
      <body>
        <div class="balance-card">
          <div class="card-header">
            <span>💳</span>
            Premium Balance
            <span>💳</span>
          </div>
          <div class="user-details">
            <div class="user-info">
              👤 ${userName}
            </div>
            <div class="user-id">
              ID ${userID}
            </div>
          </div>
          <div class="balance">💰 ${balance}</div>
        </div>
      </body>
      </html>
    `;
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
