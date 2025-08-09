module.exports = {
  config: {
    name: "sweet",
    aliases: ["shona", "jaan", "mon", "priyo", "pakhi", "meherin",
    "shimu", "gulabo", "laila", "romi", "toni", "dudu", "mimi", "lolo", "ratna", "priti",
    "amor", "tumi", "darling", "love", "sunshine", "starlight", "angel", "cutie", "treasure", "beloved",
    "sweety", "chotto", "mone", "ghumer", "ridoy", "chhobi", "mosh", "goru", "goat", "goatie", "compliment", "praise", "love"],
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
    if (["sweet", "compliment", "praise", "love"].includes(body)) {
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
