module.exports.config = {
  name: "rankup",
  version: "7.6.8",
  hasPermssion: 1,
  credits: "Kreysh (edited to English by Raihan)",
  description: "Announce user rank up with an image",
  commandCategory: "Edit-IMG",
  dependencies: {
    "fs-extra": ""
  },
  cooldowns: 2,
};

module.exports.handleEvent = async function({ api, event, Currencies, Users, getText }) {
  var { threadID, senderID } = event;
  const { loadImage, createCanvas } = require("canvas");
  const fs = global.nodemodule["fs-extra"];
  const axios = global.nodemodule["axios"];
  let pathImg = __dirname + "/noprefix/rankup/rankup.png";
  let pathAvt1 = __dirname + "/cache/Avtmot.png";
  var id1 = event.senderID;

  threadID = String(threadID);
  senderID = String(senderID);

  const thread = global.data.threadData.get(threadID) || {};

  let exp = (await Currencies.getData(senderID)).exp;
  exp += 1; // fixed increment

  if (isNaN(exp)) return;

  if (typeof thread["rankup"] != "undefined" && thread["rankup"] == false) {
    await Currencies.setData(senderID, { exp });
    return;
  };

  const curLevel = Math.floor((Math.sqrt(1 + (4 * exp / 3) + 1) / 2));
  const level = Math.floor((Math.sqrt(1 + (4 * (exp + 1) / 3) + 1) / 2));

  if (level > curLevel && level != 1) {
    const name = global.data.userName.get(senderID) || await Users.getNameUser(senderID);
    var message = (typeof thread.customRankup == "undefined") ? msg = getText("levelup") : msg = thread.customRankup;

    message = message
      .replace(/\{name}/g, name)
      .replace(/\{level}/g, level);

    var background = [
      "https://i.ibb.co/DffbB7x/2-7-BDCACE.png",
      "https://i.ibb.co/606p1ZF/1-C0-CF112.png",
      "https://i.ibb.co/54b5KY6/3-10100-BC.png",
      "https://i.ibb.co/4RHd3mM/4-AB4-CF2-B.png",
      "https://i.ibb.co/7WHKF0H/9-498-C5-E0.png",
      "https://i.ibb.co/nPfY3HN/8-ADA7767.png",
      "https://i.ibb.co/Ldctgw4/5-49-F92-DC.png",
      "https://i.ibb.co/J29hdFW/6-EB49-EF4.png"
    ];

    var rd = background[Math.floor(Math.random() * background.length)];

    let getAvtmot = (
      await axios.get(
        `https://graph.facebook.com/${id1}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
        { responseType: "arraybuffer" }
      )
    ).data;
    fs.writeFileSync(pathAvt1, Buffer.from(getAvtmot, "utf-8"));

    let getbackground = (
      await axios.get(`${rd}`, { responseType: "arraybuffer" })
    ).data;
    fs.writeFileSync(pathImg, Buffer.from(getbackground, "utf-8"));

    let baseImage = await loadImage(pathImg);
    let baseAvt1 = await loadImage(pathAvt1);
    let canvas = createCanvas(baseImage.width, baseImage.height);
    let ctx = canvas.getContext("2d");
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    ctx.rotate(-25 * Math.PI / 180);
    ctx.drawImage(baseAvt1, 90, 330, 340, 340);

    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);
    fs.removeSync(pathAvt1);

    api.sendMessage(
      { body: message, mentions: [{ tag: name, id: senderID }], attachment: fs.createReadStream(pathImg) },
      event.threadID,
      () => fs.unlinkSync(pathImg)
    );
  }

  await Currencies.setData(senderID, { exp });
  return;
}

module.exports.languages = {
  "en": {
    "on": "on",
    "off": "off",
    "successText": "Rankup notification updated successfully!",
    "levelup": "🎉 Congratulations {name}, you just reached level {level}! Keep it up 🚀"
  }
}

module.exports.run = async function({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["rankup"] == "undefined" || data["rankup"] == false) data["rankup"] = true;
  else data["rankup"] = false;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["rankup"] == true) ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
}
