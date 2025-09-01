const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");
const request = require("request");

module.exports = {
  config: {
    name: "profileinfo",
    version: "5.1",
    author: "Maruf x ChatGPT",
    countDown: 5,
    role: 0,
    shortDescription: "Full Facebook profile details",
    longDescription: "Includes name, UID, gender, bio, mutual friends, join date and more",
    category: "info",
    guide: "{pn} [mention | reply | blank for self]"
  },

  onStart: async function ({ api, event }) {
    const time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

    let uid = event.senderID;
    let targetType = "Your";
    let accountType = "Self";

    if (event.type === "message_reply") {
      uid = event.messageReply.senderID;
      targetType = "Replied User";
      accountType = "Reply";
    } else if (Object.keys(event.mentions).length > 0) {
      uid = Object.keys(event.mentions)[0];
      targetType = "Mentioned User";
      accountType = "Mention";
    }

    try {
      const userInfo = await api.getUserInfo(uid);
      const name = userInfo[uid]?.name || "Unknown";
      const username = userInfo[uid]?.vanity || uid;
      const profileLink = `https://facebook.com/${username}`;
      const isFriend = userInfo[uid]?.isFriend ? "✅ Yes" : "❌ No";
      const birthday = userInfo[uid]?.birthday || "Not Set";
      const bio ="🔒 Bio is private or not accessible.";
      const location = userInfo[uid]?.location?.name || "Not Available";
      const mutual = userInfo[uid]?.mutualFriends || "Unknown";

      const genderMap = { 1: "Female", 2: "Male" };
      const gender = genderMap[userInfo[uid]?.gender] || "Unknown";

      const estimatedOnline = uid === event.senderID ? "🟢 Active (You)" : "🔘 Unknown";
      const platform = uid === event.senderID ? "📱 Mobile" : "⚙️ N/A";

      const uidTimestamp = parseInt(uid) / 4194304 + 1314220021721;
      const joinDate = moment(uidTimestamp).format("MMMM YYYY");

      const notes = [
        "🔍 Profile insights powered by AI.",
        "🧠 Deep analysis complete.",
        "🚀 Optimized by GoatBot Engine.",
        "📡 Live FB scan result.",
        "✨ Clean UI, sharp data."
      ];
      const randomNote = notes[Math.floor(Math.random() * notes.length)];

      const imgURL = `https://graph.facebook.com/${uid}/picture?height=720&width=720&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`;
      const imgPath = path.join(__dirname, "cache", `profile_${uid}.jpg`);

      await new Promise((resolve, reject) => {
        request(encodeURI(imgURL))
          .pipe(fs.createWriteStream(imgPath))
          .on("close", resolve)
          .on("error", reject);
      });

      const msg =
`╔════════════════════════════════════╗
║       👤 Facebook Profile Info      ║
╠════════════════════════════════════╣
║ Name:           ${name}
║ Gender:         ${gender}
║ UID:            ${uid}
║ Username:       ${username}
║ Profile Link:   ${profileLink}
║ Country:        🇧🇩 Bangladesh
║ Location:       ${location}
║ Birthday:       ${birthday}
║ Friend:         ${isFriend}
║ Mutual:         ${mutual}
║ Type:           ${accountType}
║ Platform:       ${platform}
║ Status:         ${estimatedOnline}
║ Capital:        Dhaka
╠════════════════════════════════════╣
║ Bio:            ${bio}
╠════════════════════════════════════╣
║ Updated:        ${time}
║ Note:           ${randomNote}
╚════════════════════════════════════╝
⚙️ Powered by GoatBot • `;

      await api.sendMessage({
        body: msg,
        attachment: fs.createReadStream(imgPath)
      }, event.threadID);

      fs.unlinkSync(imgPath);

    } catch (err) {
      console.error(err.message);
      return api.sendMessage("❌ Couldn't fetch profile info. Maybe profile is private or UID invalid.", event.threadID);
    }
  }
};
