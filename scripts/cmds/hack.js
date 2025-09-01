const { loadImage, createCanvas } = require("canvas");
const fs = require("fs-extra");
const axios = require("axios");

module.exports = {
  config: {
    name: "hack",
    author: "Jubayer",
    countDown: 5,
    role: 0,
    category: "system",
    shortDescription: {
      en: "Generates a 'hacking' image with the user's profile picture.",
    },
  },

  wrapText: (ctx, name, maxWidth) => {
    return new Promise(resolve => {
      if (ctx.measureText(name).width < maxWidth) return resolve([name]);
      if (ctx.measureText('W').width > maxWidth) return resolve([name]);
      const words = name.split(' ');
      const lines = [];
      let line = '';
      while (words.length > 0) {
        let split = false;
        while (ctx.measureText(words[0]).width >= maxWidth) {
          const temp = words[0];
          words[0] = temp.slice(0, -1);
          if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
          else {
            split = true;
            words.splice(1, 0, temp.slice(-1));
          }
        }
        if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) line += `${words.shift()} `;
        else {
          lines.push(line.trim());
          line = '';
        }
        if (words.length === 0) lines.push(line.trim());
      }
      return resolve(lines);
    });
  },

  onStart: async function ({ event, usersData, api }) {
    const mentionID = Object.keys(event.mentions)[0];

    if (!mentionID) {
      return api.sendMessage("Please Mention Someone ⁉️", event.threadID, event.messageID);
    }

    const pathImg = __dirname + "/cache/hack_bg.png";
    const pathAvt = __dirname + "/cache/hack_avt.png";

    const name = await usersData.getName(mentionID);

    const backgroundList = [
      "https://drive.google.com/uc?id=1RwJnJTzUmwOmP3N_mZzxtp63wbvt9bLZ"
    ];
    const bgURL = backgroundList[Math.floor(Math.random() * backgroundList.length)];

    const avatarData = (
      await axios.get(
        `https://graph.facebook.com/${mentionID}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
        { responseType: "arraybuffer" }
      )
    ).data;
    fs.writeFileSync(pathAvt, Buffer.from(avatarData, "utf-8"));

    const bgData = (await axios.get(bgURL, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathImg, Buffer.from(bgData, "utf-8"));

    const baseImage = await loadImage(pathImg);
    const baseAvatar = await loadImage(pathAvt);

    const canvas = createCanvas(baseImage.width, baseImage.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseAvatar, 83, 437, 100, 101);

    ctx.font = "400 23px Arial";
    ctx.fillStyle = "#1878F3";
    ctx.textAlign = "start";

    const lines = await this.wrapText(ctx, name, 1160);
    ctx.fillText(lines.join('\n'), 200, 497);

    const finalBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, finalBuffer);
    fs.removeSync(pathAvt);

    return api.sendMessage(
      {
        body: ``,
        attachment: fs.createReadStream(pathImg)
      },
      event.threadID,
      () => fs.unlinkSync(pathImg),
      event.messageID
    );
  }
};
