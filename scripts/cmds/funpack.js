const axios = require("axios");

module.exports = {
  config: {
    name: "funpack",
    aliases: ["fun", "fp"],
    version: "1.0",
    author: "Nisanxnx",
    countDown: 5,
    role: 0,
    shortDescription: "Fun + Roast + Meme",
    longDescription: "র‌্যান্ডম roast, meme এবং quote দেয়",
    category: "fun",
    guide: "{p}{n} @tag"
  },

  onStart: async function ({ event, message, args, usersData }) {
    const mention = Object.keys(event.mentions)[0] || event.senderID;
    const userName = await usersData.getName(mention);

    // Random roast
    const roasts = [
      `${userName}, তোমার মগজটা কি ফ্রি ট্রায়াল ভার্সনে চলছে?`,
      `${userName}, তুমি কি জানো তোমার লজিক NASA-তে পাঠালে তারা বন্ধ হয়ে যাবে!`,
      `এহ ${userName}, তোমার চিন্তার ধরণ দেখে মনে হচ্ছে WiFi-তে শুধু 2G চলছে!`
    ];
    const roast = roasts[Math.floor(Math.random() * roasts.length)];

    // Random funny quotes
    const quotes = [
      "জীবনে সবকিছুতে সিরিয়াস হলে Facebook কে ব্যবহার করবে?",
      "বাহিরে যত গরম, ভেতরে তত কুল—এটাই ফ্যান।",
      "হাসি সবচেয়ে সস্তা থেরাপি।"
    ];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    // Meme (free API)
    let memeURL = "";
    try {
      const memeRes = await axios.get("https://meme-api.com/gimme");
      memeURL = memeRes.data.url;
    } catch (e) {
      memeURL = "https://i.ibb.co/4N6Vb9j/funny-meme.jpg"; // fallback
    }

    message.reply({
      body: `🤣 **${userName} এর জন্য ফানপ্যাক!**\n\n🔥 Roast: ${roast}\n\n💡 Quote: ${quote}`,
      attachment: await global.utils.getStreamFromURL(memeURL)
    });
  }
};
