const axios = require("axios");

// Fetch base API URL
const getBaseApiUrl = async () => {
  try {
    const res = await axios.get("https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json");
    return res.data.api;
  } catch (err) {
    console.error("Failed to fetch base API URL:", err);
    return null;
  }
};

module.exports.config = {
  name: "fbcover",
  version: "6.9",
  hasPermission: 0,
  credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  description: "Facebook cover generator",
  commandCategory: "cover",
  usages: "name - title - address - email - phone - color (default = white)",
  cooldowns: 5,
  onStart: true
};

// Runs automatically when bot starts
module.exports.onStart = async function ({ api }) {
  const baseUrl = await getBaseApiUrl();
  if (!baseUrl) {
    console.log("[FB Cover] Base API is not reachable! Module might not work.");
  } else {
    console.log("[FB Cover] Base API is reachable. Module ready!");
  }
};

// Runs when command is used
module.exports.run = async function ({ api, event, args, Users }) {
  const input = args.join(" ");

  let targetID;
  if (event.type === "message_reply" && event.messageReply) {
    targetID = event.messageReply.senderID;
  } else {
    targetID = Object.keys(event.mentions)[0] || event.senderID;
  }

  const targetName = await Users.getNameUser(targetID);

  if (!input) {
    return api.sendMessage(
      `You can create your Facebook Cover using:\n${global.config.PREFIX}fbcover v1/v2/v3 - name - title - address - email - phone - color (default = white)`,
      event.threadID,
      event.messageID
    );
  }

  const parts = input.split("-").map(p => p.trim());
  const version = parts[0] || "v1";
  const name = parts[1] || "";
  const subname = parts[2] || "";
  const address = parts[3] || "";
  const email = parts[4] || "";
  const phone = parts[5] || "";
  const color = parts[6] || "white";

  api.sendMessage("Processing your cover, please wait...", event.threadID, (err, info) => {
    setTimeout(() => api.unsendMessage(info.messageID), 4000);
  });

  const baseUrl = await getBaseApiUrl();
  if (!baseUrl) {
    return api.sendMessage("Failed to fetch the API base URL.", event.threadID);
  }

  const url = `${baseUrl}/cover/${version}?name=${encodeURIComponent(name)}&subname=${encodeURIComponent(subname)}&number=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}&email=${encodeURIComponent(email)}&colour=${encodeURIComponent(color)}&uid=${targetID}`;

  try {
    const response = await axios.get(url, { responseType: "stream" });
    api.sendMessage(
      {
        body: `⋆✦⋆────────⋆✦⋆
✧⃝•🩷 FIRST NAME: ${name}
✧⃝•💜 SECOND NAME: ${subname}
✧⃝•🤍 ADDRESS: ${address}
✧⃝•💛 MAIL: ${email}
✧⃝•❤️‍🩹 PHONE NO.: ${phone}
✧⃝•💖 COLOR: ${color}
✧⃝•❤️ USER NAME: ${targetName}
✧⃝•💛 Version: ${version}
⋆✦⋆────────⋆✦⋆`,
        attachment: response.data
      },
      event.threadID,
      event.messageID
    );
  } catch (err) {
    console.error(err);
    api.sendMessage("An error occurred while generating the FB cover.", event.threadID);
  }
};
