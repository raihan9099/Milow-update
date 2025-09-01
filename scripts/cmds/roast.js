module.exports = {
  config: {
    name: "roast",
    version: "1.1",
    author: "ChatGPT",
    countDown: 5,
    role: 0,
    description: {
      en: "Send a funny roast to a tagged user or yourself",
      bn: "ট্যাগ করা ইউজারকে বা নিজের কাছে মজার রোস্ট পাঠাও"
    },
    category: "fun",
    guide: {
      en: "{pn} [tag] - Sends a random roast message to tagged user or yourself",
      bn: "{pn} [ট্যাগ] - ট্যাগ করা ইউজার বা নিজের কাছে রোস্ট পাঠাবে"
    }
  },

  onStart: async function({ message, args, event }) {
    const roasts = [
      'তোমার IQ তে সমস্যা আছে, নাকি তুমি শুধু মজা করছো?',
      'তোমার হাসি শুনলে, বৃষ্টি থামবে!',
      'তোমার চুল দেখে মনে হয়, বিদ্যুৎ চলে গেছে!',
      'তোমার চোখে কিছু নেই, শুধু অন্ধকার!',
      'তোমার কথা শুনে মনে হয়, বুদ্ধি হারিয়ে ফেলেছো!',
      'তুমি যদি আরও অলস হতে পারো, তাহলে ঘুম থেকে টপকে উঠতে পারবে না!',
      'তোমার মস্তিষ্ক এত ছোট যে, সেটি দেখাতে মাইক্রোস্কোপ লাগে!',
      'তোমার স্মৃতিশক্তি ময়লার ব্যাগের মতো, কিছুই মনে থাকে না!',
      'তুমি কথা বলো না, বরং বায়ু পার্টিকল ছেড়ে দাও!',
      'তোমার পরিশ্রম দেখে মনে হয়, তুমি অলসতার গর্বিত প্রতিনিধী!',
      'তুমি যদি আরো ফোকাস করো, তাহলে হয়তো একটা কাজ করতে পারবে!',
      'তোমার চেহারা দেখে মনে হয়, কাল্পনিক প্রাণী!',
      'তুমি এত ধীর যে, ঘড়ির পুঁটি তোমাকে ছাড়িয়ে গেছে!',
      'তুমি এমন একেকজন, যাদের কথা শুনে অন্যরা ডিম্বাশয় পড়ে!',
      'তোমার হাসি শুনে মনে হয়, ব্যথা কমে!',
      'তুমি যদি বই পড়তে পারো, তবে আজও সেটা দেখিনি!',
      'তোমার কাজ করার স্টাইল দেখে মনে হয়, বাচ্চাদের জন্য অলসতা একটি ধরন!',
      'তুমি যখন হাসো, পাখিরা ড্রাম বাজায়!',
      'তোমার জোকস শুনে মনে হয়, সময় নষ্ট করছো!',
      'তুমি যদি একটু বেশি চেষ্টা করো, হয়তো একটু ভালো হতে পারো!',
    ];

    const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];

    // event.mentions হলো বটের মেসেজ থেকে ট্যাগ করা ইউজার আইডি গুলো
    let targetName;

    if (event.mentions && Object.keys(event.mentions).length > 0) {
      // প্রথম ট্যাগ করা ইউজারের নাম নিন
      const firstMentionId = Object.keys(event.mentions)[0];
      const firstMentionName = event.mentions[firstMentionId].replace(/\s/g, '') || "User";

      targetName = firstMentionName;
    } else {
      // ট্যাগ না থাকলে মেসেজ পাঠানো ব্যক্তির নাম নিন
      targetName = event.senderName || "You";
    }

    return message.reply(`${targetName}, ${randomRoast}`);
  }
};
