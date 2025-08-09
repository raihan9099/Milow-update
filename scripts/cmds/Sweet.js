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
  "Tumi amar moner monsoon rain — shital ar prem bhora! 🌧️❤️",
  "Tomar kotha amar moner sunrise alarm — din shuru hoy tomar diye! 🌅💘",
  "Tumi amar moner candlelight dinner — shundor ar romantic! 🕯️🍷",
  "Tomar chokh holo amar moner tara — shob raat alo dao! ⭐💓",
  "Tumi amar moner bridge — shob doori dure koro! 🌉❤️",
  "Tomar sathe kotha hole amar moner heartbeat double speed e hoy! 💓⚡",
  "Tumi amar moner golper shesh — happy ending! 📖💖",
  "Tomar kotha amar moner music box — shudhu melody! 🎶💘",
  "Tumi amar moner cha-er cup — ek cup e shanti! 🍵❤️",
  "Tomar chokh amar moner telescope — shob shundor jinish dekhi! 🔭💓",
  "Tumi amar moner USB cable — shudhu tomay connect kori! 🔌😉",
  "Tomar chul amar moner silk blanket — shundor ar soft! 🛏️💘",
  "Tumi amar moner pizza slice — last piece shudhu amar jonno! 🍕❤️",
  "Tomar kotha amar moner lollipop — mishti ar colorful! 🍭😉",
  "Tumi amar moner popcorn seasoning — flavorful ar moja! 🍿💓",
  "Tomar chokh holo amar moner flashbang — shudhu tomay dekhi! 💥😉",
  "Tumi amar moner water bottle — refresh kore dao! 💧❤️",
  "Tomar kotha amar moner choco chip cookie — ekdom perfect bite! 🍪😉",
  "Tumi amar moner elevator button — shobshomoy press korte ichha kore! 🛗💓",
  "Tomar chul amar moner cotton cloud — shundor ar naram! ☁️❤️",
  "Tumi amar moner hot shower — gorom ar relaxing! 🚿🔥",
  "Tomar kotha amar moner ice cream sundae — sweet ar creamy! 🍨😉",
  "Tumi amar moner strawberry — fresh ar tempting! 🍓🔥",
  "Tomar chokh amar moner sparkler — alo ar gorom! 🎇😉",
  "Tumi amar moner pillow fight partner — moja ar moja! 🛏️🔥",
  "Tomar kotha amar moner caramel popcorn — sweet ar sticky! 🍿😉",
  "Tumi amar moner milkshake — cool ar tasty! 🥤❤️",
  "Tomar chokh amar moner lava lamp — jadu kore dao! 🪔🔥",
  "Tumi amar moner chocolate bar — pura ek shathe khawar moto! 🍫😉",
  "Tomar kotha amar moner honey jar — shundor ar sweet! 🍯❤️",
  "Tumi amar moner umbrella stand — shobshomoy ready! ☔😂",
  "Tomar chokh amar moner disco light — shobshomoy dance mood! 💃💓",
  "Tumi amar moner ringtone pack — shob sound tumi! 🎶😉",
  "Tomar kotha amar moner WiFi booster — signal shobshomoy strong! 📡😂",
  "Tumi amar moner fridge light — shobshomoy jolche! 💡❤️",
  "Tomar chokh amar moner meme template — shobshomoy hit! 📸😂",
  "Tumi amar moner ice cube tray — shundor ar useful! ❄️😉",
  "Tomar kotha amar moner DJ remix — energy full! 🎧💓",
  "Tumi amar moner movie trailer — short but exciting! 🎥❤️",
  "Tomar chokh amar moner GPS map — shothik direction! 🗺️😉"
  "Tumi shobcheye shundor manush je ami jani! 💖", "Tomar hashir moto ami kokhono khub misti dekhi nai! 😊",
  "Tomar sathe kotha bole amar din ta shundor hoye jai! 🌸",
  "Tumi amar life er best part! ❤️",
  "Tumar choshma pore dekhte onek classy! 😎",
  "Tomar mon khub bhalo, shetai amar posondo! 🥰",
  "Tumi jodi amar kache thako, ami khushi thakbo protidin! 💫",
  "Tumi onek talented, shopno dekhte theke ektu agiye thako! 🌟",
. "Tomar moto manus kothao pawa jabe na! 😍",
  "Tomar hashir shobdo amar mon ke gorom kore! 🔥",    // aro compliment add korte paro
    ];
   const randIndex = Math.floor(Math.random() * compliments.length);
   return message.reply(compliments[randIndex]);   }
  }
};
