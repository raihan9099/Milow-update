module.exports = {
  config: {
    name: "sweet",
    aliases: ["compliment", "praise", "love"],
    version: "1.1",
    author: "Raihan",
    role: 0,
    countDown: 2,
    category: "fun",
    shortDescription: "Send a sweet compliment without prefix",
    longDescription: "Send a lovely compliment to brighten someone's day, triggers by typing compliment directly.",
    guide: {
      en: "Just type 'sweet' or 'compliment' to get a sweet compliment."
    }
  },

  onStart: async function ({ message }) {
    // dummy function, no prefix used so no action here
    return;
  },

  onChat: async function ({ message, event }) {
    const body = event.body ? event.body.toLowerCase().trim() : "";
    if (["sweet", "compliment", "praise", "love"].includes(body)) {
      const compliments = [
        "Tumi shobcheye shundor manush je ami jani! 💖",
        "Tomar hashir moto ami kokhono khub misti dekhi nai! 😊",
        "Tomar sathe kotha bole amar din ta shundor hoye jai! 🌸",
        "Tumi amar life er best part! ❤️",
        "Tumar choshma pore dekhte onek classy! 😎",
        "Tomar mon khub bhalo, shetai amar posondo! 🥰",
        "Tumi jodi amar kache thako, ami khushi thakbo protidin! 💫",
        "Tumi onek talented, shopno dekhte theke ektu agiye thako! 🌟",
        "Tomar moto manus kothao pawa jabe na! 😍",
        "Tomar hashir shobdo amar mon ke gorom kore! 🔥",
        // aro compliment add korte paro
      ];
      const randIndex = Math.floor(Math.random() * compliments.length);
      return message.reply(compliments[randIndex]);
    }
  }
};
