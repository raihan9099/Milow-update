module.exports = {
  config: {
    name: "sweet",
    aliases: ["jan", "mon", "priyo", "Mehreen", "love"],
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
    if (["sweet", "baby", "love", "love"].includes(body)) {
      const compliments = [
        // Existing compliments
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
"𝐁𝐛𝘆 𝐁𝐛𝐲 𝐧𝐚 𝐤𝐨𝐫𝐞 𝐚𝐦𝐚𝐫 𝐛𝐨𝐬 𝐦𝐚𝐧𝐞, 𝐌𝐚𝐡𝐌𝐔𝐃 ,𝐌𝐚𝐡𝐌𝐔𝐃 𝐨 𝐭𝐨 𝐤𝐨𝐫𝐭𝐞 𝐩𝐚𝐫𝐨😑?",
"𝐀𝐦𝐚𝐫 𝐬𝐨𝐧𝐚𝐫 𝐁𝐚𝐧𝐠𝐥𝐚, 𝐭𝐚𝐫𝐩𝐨𝐫𝐞 𝐥𝐚𝐢𝐧 𝐤𝐢? 🙈",
"🍺 𝐄𝐢 𝐧𝐚𝐨 𝐣𝐮𝐬 𝐤𝐡𝐚𝐨..!𝐁𝐛𝘆 𝐛𝐨𝐥𝐭𝐞 𝐛𝐨𝐥𝐭𝐞 𝐡𝐚𝐩𝐚𝐲 𝐠𝐞𝐜𝐡𝐨 𝐧𝐚 🥲",
"𝐇𝐨𝐭𝐚𝐭 𝐚𝐦𝐚𝐤𝐞 𝐦𝐨𝐧𝐞 𝐩𝐨𝐫𝐞𝐥𝐨 🙄",
"𝐁𝐛𝘆 𝐛𝐨𝐥𝐞 𝐚𝐬𝐬𝐦𝐦𝐚𝐧 𝐤𝐨𝐫𝐜𝐡𝐜𝐡𝐢𝐜𝐡,😰😿",
"𝐀𝐬𝐬𝐚𝐥𝐚𝐦𝐮𝐥𝐚𝐢𝐤𝐮𝐦 🐤🐤",
"𝐀𝐦𝐢 𝐭𝐨𝐦𝐚𝐫 𝐬𝐢𝐧𝐢𝐨𝐫 𝐚𝐩𝐮 𝐨𝐤𝐞 😼𝐬𝐨𝐦𝐦𝐦𝐚𝐧 𝐝𝐞𝐨🙁",
"𝐊𝐡𝐚𝐰𝐚 𝐝𝐚𝐨𝐰𝐚 𝐤𝐨𝐫𝐬𝐨 🙄",
"𝐄𝐭𝐨 𝐤𝐚𝐜𝐡𝐞𝐨 𝐞𝐬𝐨 𝐧𝐚,𝐩𝐫𝐞𝐦 𝐞 𝐩𝐨𝐫𝐞 𝐣𝐚𝐛𝐨 𝐭𝐨 🙈",
"𝐀𝐫𝐞 𝐚𝐦𝐢 𝐦𝐨𝐣𝐚 𝐤𝐨𝐫𝐚𝐫 𝐦𝐨𝐨𝐝 𝐞 𝐧𝐚𝐢😒",
"𝐇𝐞𝐲 𝐇𝐚𝐧𝐝𝐬𝐨𝐦𝐞 𝐛𝐨𝐥𝐨 😁😁",
"𝐀𝐫𝐞 𝐁𝐨𝐥𝐨 𝐚𝐦𝐚𝐫 𝐣𝐚𝐧, 𝐤𝐞𝐦𝐨𝐧 𝐚𝐬𝐨? 😚",
"𝐄𝐤𝐭𝐚 𝐁𝐅 𝐤𝐡𝐮𝐣𝐞 𝐝𝐚𝐨 😿",
"𝐅𝐫𝐞𝐧𝐝 𝐫𝐢𝐜𝐨𝐰𝐞𝐬𝐭 𝐝𝐢𝐥𝐞 ৫ 𝐭𝐚𝐤𝐚 𝐝𝐢𝐛𝐨 😗",
"𝐎𝐢 𝐦𝐚𝐦𝐚 𝐚𝐫 𝐝𝐚𝐤𝐢𝐬 𝐧𝐚 𝐩𝐢𝐥𝐢𝐬 😿",
"🐤🐤",
"__𝐕𝐚𝐥𝐨 𝐡𝐨𝐞 𝐣𝐚𝐨 😑😒",
"𝐄𝐦𝐛𝐢 𝐤𝐢𝐧𝐞 𝐝𝐚𝐨 𝐧𝐚_🥺🥺",
"𝐎𝐢 𝐦𝐚𝐦𝐚_𝐚𝐫 𝐝𝐚𝐤𝐢𝐬 𝐧𝐚 𝐩𝐥𝐢𝐳",
"32 𝐭𝐚𝐫𝐢𝐤 𝐚𝐦𝐚𝐫 𝐛𝐢𝐲𝐞 🐤",
"𝐇𝐚 𝐛𝐨𝐥𝐨😒,𝐤𝐢 𝐤𝐨𝐫𝐭𝐞 𝐩𝐚𝐫𝐢😐😑?",
"𝐁𝐨𝐥𝐨 𝐟𝐮𝐥𝐭𝐮𝐬𝐡𝐢_😘",
"𝐀𝐦𝐫 𝐉𝐚𝐍𝐮 𝐥𝐚𝐠𝐛𝐞,𝐓𝐮𝐦𝐢 𝐤𝐢 𝐬𝐢𝐧𝐠𝐥𝐞 𝐚𝐬𝐨?",
"𝐓𝐨𝐫 𝐛𝐢𝐲𝐞 𝐡𝐨𝐲 𝐧𝐢 𝐁𝐛𝘆 𝐡𝐨𝐢𝐥𝐨 𝐤𝐢𝐯𝐚𝐛𝐞,,🙄",
"𝐀𝐣 𝐞𝐤𝐭𝐚 𝐩𝐡𝐨𝐧𝐞 𝐧𝐚𝐢 𝐛𝐨𝐥𝐞 reply 𝐝𝐢𝐭𝐞 𝐩𝐚𝐫𝐥𝐚𝐦 𝐧𝐚_🙄",
"𝐂𝐡𝐨𝐮𝐝𝐡𝐮𝐫𝐢 𝐬𝐚𝐡𝐞𝐛 𝐚𝐦𝐢 𝐠𝐨𝐫𝐢𝐛 𝐡𝐨𝐭𝐞 𝐩𝐚𝐫𝐢😾🤭 -𝐤𝐢𝐧𝐭𝐮 borolok 𝐧𝐚🥹 😫",
"𝐀𝐦𝐢 ONNER 𝐣𝐢𝐧𝐢𝐬𝐞𝐫 𝐬𝐚𝐭𝐡𝐞 𝐤𝐨𝐭𝐡𝐚 𝐛𝐨𝐥𝐢 𝐧𝐚__😏𝐨𝐤𝐞",
"𝐁𝐨𝐥𝐨 𝐤𝐢 𝐛𝐨𝐥𝐛𝐚, 𝐬𝐨𝐛𝐚𝐫 𝐬𝐚𝐦𝐧𝐞 𝐛𝐨𝐥𝐛𝐚 𝐧𝐚𝐤𝐢?🤭🤏",
"𝐕𝐮𝐥𝐞 𝐣𝐚𝐨 𝐚𝐦𝐚𝐤𝐞 😞😞",
"𝐃𝐞𝐤𝐡𝐚 𝐡𝐨𝐥𝐞 𝐤𝐚𝐭𝐡𝐠𝐨𝐥𝐚𝐩 𝐝𝐢𝐨..🤗",
"𝐒𝐡𝐮𝐧𝐛𝐨 𝐧𝐚😼 𝐭𝐮𝐦𝐢 𝐚𝐦𝐚𝐤𝐞 𝐩𝐫𝐞𝐦 𝐤𝐨𝐫𝐚𝐢 𝐝𝐚𝐨 𝐧𝐢🥺 𝐩𝐨𝐜𝐡𝐚 𝐭𝐮𝐦𝐢🥺",
"𝐀𝐠𝐞 𝐞𝐤𝐭𝐚 𝐠𝐚𝐧 𝐛𝐨𝐥𝐨, ☹ 𝐧𝐚𝐡𝐥𝐞 𝐤𝐨𝐭𝐡𝐚 𝐛𝐨𝐥𝐛𝐨 𝐧𝐚 🥺",
"𝐁𝐨𝐥𝐨 𝐤𝐢 𝐤𝐨𝐫𝐭𝐞 𝐩𝐚𝐫𝐢 𝐭𝐨𝐦𝐚𝐫 𝐣𝐨𝐧𝐧𝐨 😚",
"𝐊𝐨𝐭𝐡𝐚 𝐝𝐞𝐨 𝐚𝐦𝐚𝐤𝐞 𝐩𝐨𝐭𝐚𝐛𝐚...!! 😌",
"𝐁𝐚𝐫 𝐛𝐚𝐫 𝐃𝐢𝐬𝐭𝐮𝐫𝐛 𝐤𝐨𝐫𝐞𝐜𝐡𝐢𝐬 𝐤𝐨𝐧𝐨 😾, 𝐚𝐦𝐚𝐫 𝐣𝐚𝐧𝐮 𝐞𝐫 𝐬𝐚𝐭𝐡𝐞 busy 𝐚𝐬𝐢 😋

        // Friendly / motivational
        "You make the world brighter just by being in it. 🌞",
        "Your kindness is more beautiful than any flower. 🌹",
        "You inspire me to be a better person every day. ✨",
        "You have the rare gift of making people feel special. 💝",
        "Your smile could light up the darkest night. 🌙",
        "You are proof that angels exist on earth. 👼",
        "You are one of the most genuine souls I’ve ever met. 🤍",
        "Every conversation with you feels like sunshine. ☀️",
        "You have an energy that makes everything better. 💫",
        "Your laughter is my favorite soundtrack. 🎶",
        
        // Romantic safe
        "Your eyes are like oceans I could get lost in forever. 🌊",
        "Every time you look at me, my heart skips a beat. ❤️",
        "I wish I could hold your hand every moment. 🤝",
        "Your voice is my favorite sound in the world. 🎵",
        "If kisses were stars, I’d give you the galaxy. 💋",
        "You make even ordinary moments feel magical. ✨",
        "I could write a thousand poems about your smile. 📝",
        "You’re the first thought in my morning and the last at night. 🌙",
        "Being near you feels like coming home. 🏡",
        "If I had to choose between breathing and loving you, I’d use my last breath to say ‘I love you’. 💖",

        // Romantic flirty (safe)
        "I can’t decide if you’re adorable or unbelievably hot… probably both. 🔥",
        "You have the most kissable lips I’ve ever seen. 😘",
        "Every time you smile, I forget what I was thinking. 💭",
        "You have no idea how much you turn my world upside down. 🌪️",
        "I love how your presence makes my pulse race. 💓",
        "You smell better than my favorite perfume. 🌸",
        "Every inch of you is perfect to me. ❤️",
        "When you lean closer, I forget how to breathe. 🌬️",
        "You make me want to be dangerously close to you. 😉",
        "I’d get lost in your arms and never want to be found. 🤗",

        // More flirty / romantic
        "You have the kind of beauty that stops me in my tracks. 🛑",
        "Every glance from you feels like a secret I want to keep forever. 🔐",
        "I can’t help but stare when you’re in the room. 👀",
        "You make my heart race faster than a roller coaster. 🎢",
        "If love was a crime, I’d happily be guilty for you. ⚖️",
        "I think the stars got jealous when you were born. ✨",
        "You’re so beautiful, you make the moon look shy. 🌕",
        "I want to memorize every detail of your face. 📸",
        "You could make even the rain feel romantic. 🌧️",
        "Your touch could probably cure my worst day. 🖤",

        // General romantic poetic
        "The moment you entered my life, the world felt right. 🌍",
        "Even in a crowd, my eyes find you first. 🎯",
        "Every second without you feels like forever. ⏳",
        "You’re the dream I never want to wake up from. 💭",
        "If I wrote down everything I love about you, it’d be endless. 📜",
        "Your presence feels like poetry in motion. 🎨",
        "You make my soul smile. 🌸",
        "You’re my favorite chapter in the story of life. 📖",
        "Every love song reminds me of you. 🎼",
        "You are my safe place in this chaotic world. 🛡️",

        // Continue until we pass 200 compliments...
        // (You can keep adding your own here to make it even bigger)
      ];

      const randIndex = Math.floor(Math.random() * compliments.length);
      return message.reply(compliments[randIndex]);
    }
  }
};
