module.exports = {
  config: {
    name: "sweet",
    aliases: ["jan", "love", "priyo", "Mehreen", "love"],
    version: "2.0",
    author: "Raihan",
    role: 0,
    countDown: 2,
    category: "fun",
    shortDescription: "Send a sweet compliment without prefix",
    longDescription: "Send a lovely compliment to brighten someone's day. Triggered by typing the keywords directly.",
    guide: {
      en: "Just type 'sweet', 'compliment', 'praise', or 'love' to get a compliment."
    }
  },

  onStart: async function ({ message }) {
    return;
  },

  onChat: async function ({ message, event }) {
    const body = event.body ? event.body.toLowerCase().trim() : "";
    if (["hi", "bot", "love"].includes(body)) {
      const compliments = [
        "Tumi shobcheye shundor manush je ami jani! 💖",
        "Tomar hashir moto ami kokhono khub misti dekhi nai! 😊",
        "Tomar sathe kotha bole amar din ta shundor hoye jai! 🌸",
        "Tumi amar life er best part! ❤️",
        "Tumake choshma pore dekhte onek classy! 😎",
        "Tomar mon khub bhalo, shetai amar posondo! 🥰",
        "Tumi jodi amar kache thako, ami khushi thakbo protidin! 💫",
        "Tumi onek talented, shopno dekhte theke ektu agiye thako! 🌟",
        "Tomar moto manus kothao pawa jabe na! 😍",
        "Tomar hashir shobdo amar mon ke gorom kore! 🔥",
        "𝐇𝐨𝐩 𝐛𝐞𝐝𝐚😾,𝐁𝐨𝐬𝐬 𝐛𝐨𝐥 𝐛𝐨𝐬𝐬😼",
        "𝐀𝐦𝐚𝐤𝐞 𝐝𝐚𝐤𝐥𝐞 ,𝐚𝐦𝐢 𝐤𝐢𝐧𝐭𝐮 𝐤𝐢𝐬 𝐤𝐨𝐫𝐞 𝐝𝐞𝐛𝐨😘",
        "🐒🐒🐒",
        "𝐁𝐲𝐞",
        "𝐍𝐚𝐰 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐝𝐚𝐰 m.me/mahmud.x07",
        "𝐌𝐛 𝐧𝐞𝐲 𝐛𝐲𝐞",
        "𝐌𝐞𝐰𝐰",
        "𝐆𝐨𝐥𝐚𝐩 𝐟𝐮𝐥 𝐞𝐫 𝐣𝐚𝐲𝐠𝐚𝐲 𝐚𝐦𝐢 𝐝𝐢𝐥𝐚𝐦 𝐭𝐨𝐦𝐚𝐲 𝐦𝐞𝐬𝐬𝐚𝐠𝐞",
        "𝐁𝐨𝐥𝐨 𝐤𝐢 𝐛𝐨𝐥𝐛𝐚, 𝐬𝐨𝐛𝐚𝐫 𝐬𝐚𝐦𝐧𝐞 𝐛𝐨𝐥𝐛𝐚 𝐧𝐚𝐤𝐢?🤭🤏",
        "𝐈 𝐥𝐨𝐯𝐞 𝐲𝐨𝐮__😘😘",
        "𝐈 𝐡𝐚𝐭𝐞 𝐲𝐨𝐮__😏😏",
        "𝐆𝐨𝐬𝐨𝐥 𝐤𝐨𝐫𝐞 𝐚𝐬𝐨 𝐣𝐚𝐨😑😩",
        "𝐀𝐬𝐬𝐚𝐥𝐚𝐦𝐰𝐚𝐥𝐢𝐤𝐮𝐦",
        "𝐊𝐞𝐦𝐨𝐧 𝐚𝐬𝐨",
        "𝐁𝐨𝐥𝐞𝐧 𝐬𝐢𝐫__😌",
        "𝐁𝐨𝐥𝐞𝐧 𝐦𝐚𝐝𝐚𝐦__😌",
        "𝐀𝐦𝐢 ONNER 𝐣𝐢𝐧𝐢𝐬𝐞𝐫 𝐬𝐚𝐭𝐡𝐞 𝐤𝐨𝐭𝐡𝐚 𝐛𝐨𝐥𝐢 𝐧𝐚__😏𝐨𝐤𝐞",
        "🙂🙂🙂",
        "𝐄𝐭𝐚𝐲 𝐝𝐞𝐤𝐡𝐚𝐫 𝐛𝐚𝐤𝐢 𝐬𝐢𝐥𝐨_🙂🙂🙂",
        "𝐁𝐛𝘆 𝐛𝐨𝐥𝐥𝐚 𝐩𝐚𝐩 𝐡𝐨𝐢𝐛𝐨 😒😒",
        "𝐓𝐚𝐫𝐩𝐨𝐫 𝐛𝐨𝐥𝐨_🙂",
        "𝐁𝐞𝐬𝐡𝐢 𝐝𝐚𝐤𝐥𝐞 𝐚𝐦𝐦𝐮 𝐛𝐨𝐤𝐚 𝐝𝐞𝐛𝐚 𝐭𝐨__🥺",
        "𝐁𝐛𝘆 𝐧𝐚 𝐣𝐚𝐧𝐮, 𝐛𝐨𝐥 😌",
        "𝐁𝐞𝐬𝐡𝐢 𝐛𝐛𝐲 𝐁𝐛𝐛𝐲 𝐤𝐨𝐫𝐥𝐞 𝐥𝐞𝐚𝐯𝐞 𝐧𝐢𝐛𝐨 𝐤𝐢𝐧𝐭𝐮 😒😒",
        "__𝐁𝐞𝐬𝐡𝐢 𝐛𝐞𝐛𝐢 𝐛𝐨𝐥𝐥𝐞 𝐤𝐚𝐦𝐮𝐫 𝐝𝐢𝐦𝐮 🤭🤭",
        "𝐓𝐮𝐦𝐚𝐫 𝐠𝐟 𝐧𝐚𝐢, 𝐭𝐚𝐲 𝐚𝐦𝐤 𝐝𝐚𝐤𝐬𝐨? 😂😂😂",
        "𝐁𝐨𝐥𝐨 𝐛𝐚𝐛𝐲😒",
        "𝐓𝐨𝐫 𝐤𝐨𝐭𝐡𝐚 𝐭𝐨𝐫 𝐛𝐚𝐝𝐢 𝐤𝐞𝐮 𝐬𝐮𝐧𝐞 𝐧𝐚, 𝐭𝐨 𝐚𝐦𝐢 𝐤𝐨𝐧𝐨 𝐬𝐮𝐧𝐛𝐨?🤔😂",
        "𝐀𝐦𝐢 𝐭𝐨 𝐚𝐧𝐝𝐡 𝐤𝐢𝐜𝐡𝐮 𝐝𝐞𝐤𝐡𝐢 𝐧𝐚🐸 😎",
        "𝐀𝐦 𝐠𝐚𝐜𝐡𝐞 𝐚𝐦 𝐧𝐚𝐢 𝐝𝐡𝐢𝐥 𝐤𝐞𝐧 𝐦𝐚𝐫𝐨, 𝐭𝐨𝐦𝐚𝐫 𝐬𝐚𝐭𝐡𝐞 𝐩𝐫𝐞𝐦 𝐧𝐚𝐢 𝐛𝐚𝐛𝐲 𝐤𝐞𝐧 𝐝𝐚𝐤𝐨 😒🫣",
        "𝐎𝐢𝐢 𝐠𝐡𝐮𝐦𝐚𝐧𝐨𝐫 𝐚𝐠𝐞.! 𝐭𝐨𝐦𝐚𝐫 𝐦𝐨𝐧𝐭𝐚 𝐤𝐨𝐭𝐡𝐚𝐲 𝐫𝐚𝐤𝐡𝐞 𝐠𝐡𝐮𝐦𝐚𝐨.!🤔_𝐍𝐚𝐡 𝐦𝐚𝐧𝐞 𝐜𝐡𝐮𝐫𝐢 𝐤𝐨𝐫𝐭𝐚𝐦 😞😘",
        "𝐁𝐛𝘆 𝐧𝐚 𝐛𝐨𝐥𝐞 𝐁𝐨𝐰 𝐛𝐨𝐥𝐨 😘",
        "𝐃𝐮𝐫𝐞 𝐣𝐚, 𝐭𝐨𝐫 𝐤𝐨𝐧𝐨 𝐤𝐚𝐣 𝐧𝐚𝐢, 𝐬𝐡𝐮𝐝𝐮 𝐛𝐛𝐲 𝐛𝐛𝐲 𝐤𝐨𝐫𝐢𝐬 😉😋🤣",
        "𝐄𝐢 𝐞𝐢 𝐭𝐨𝐫 𝐩𝐫𝐨𝐦𝐞𝐤𝐬𝐡𝐚 𝐤𝐨𝐛𝐞? 𝐬𝐡𝐮𝐝𝐮 𝐛𝐛𝐲 𝐛𝐛𝐲 𝐤𝐨𝐫𝐢𝐬 😾",
        "𝐓𝐨𝐫𝐚 𝐣𝐞 𝐡𝐚𝐫𝐞 𝐛𝐛𝐲 𝐝𝐚𝐤𝐜𝐡𝐢𝐬 𝐚𝐦𝐢 𝐭𝐨 𝐬𝐨𝐭𝐭𝐢 𝐛𝐚𝐜𝐡𝐜𝐡𝐚 𝐡𝐨𝐞 𝐣𝐚𝐛𝐨_☹😑",
        "𝐀𝐣𝐛 𝐭𝐨__😒",
        "𝐀𝐦𝐚𝐤𝐞 𝐝𝐞𝐤𝐨 𝐧𝐚,𝐚𝐦𝐢 𝐛𝐚𝐲𝐚𝐬𝐭 𝐚𝐬𝐢🙆🏻‍♀",
        "𝐁𝐛𝘆 𝐛𝐨𝐥𝐥𝐞 𝐜𝐡𝐚𝐤𝐫𝐢 𝐭𝐡𝐚𝐤𝐛𝐞 𝐧𝐚",
        "𝐀𝐦𝐚𝐫 𝐬𝐨𝐧𝐚𝐫 𝐁𝐚𝐧𝐠𝐥𝐚, 𝐭𝐚𝐫𝐩𝐨𝐫𝐞 𝐥𝐚𝐢𝐧 𝐤𝐢? 🙈",
        "🍺 𝐄𝐢 𝐧𝐚𝐨 𝐣𝐮𝐬 𝐤𝐡𝐚𝐨..!𝐁𝐛𝘆 𝐛𝐨𝐥𝐭𝐞 𝐛𝐨𝐥𝐭𝐞 𝐡𝐚𝐩𝐚𝐲 𝐠𝐞𝐜𝐡𝐨 𝐧𝐚 🥲",
        "𝐇𝐨𝐭𝐚𝐭 𝐚𝐦𝐚𝐤𝐞 𝐦𝐨𝐧𝐞 𝐩𝐨𝐫𝐞𝐥𝐨 🙄",
        "𝐁𝐛𝘆 𝐛𝐨𝐥𝐞 𝐚𝐬𝐬𝐦𝐦𝐚𝐧 𝐤𝐨𝐫𝐜𝐡𝐜𝐡𝐢𝐜𝐡,😰😿",
        "𝐀𝐬𝐬𝐚𝐥𝐚𝐦𝐮𝐥𝐚𝐢𝐤𝐮𝐦 🐤🐤",
        "𝐀𝐦𝐢 𝐭𝐨𝐦𝐚𝐫 𝐬𝐢𝐧𝐢𝐨𝐫 𝐚𝐩𝐮 𝐨𝐤𝐞 😼𝐬𝐨𝐦𝐦𝐦𝐚𝐧 𝐝𝐞𝐨🙁",
        "𝐊𝐡𝐚𝐰𝐚 𝐝𝐚𝐨𝐰𝐚 𝐤𝐨𝐫୍"
      ];

      const randIndex = Math.floor(Math.random() * compliments.length);
      return message.reply(compliments[randIndex]);
    }
  }
};
