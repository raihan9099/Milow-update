module.exports = {
 config: {
 name: "emojireply",
 aliases: [],
 version: "1.0",
 author: "Raihan",
 countDown: 5,
 role: 0,
 noPrefix: true, // No prefix required
 shortDescription: "Automatically replies with emoji and text",
 longDescription: "Whenever someone sends a message, the bot replies with a random emoji and a fun text message.",
 category: "Fun",
 },

 onStart: async function () {
 console.log("No-prefix Emoji Reply Command Loaded!");
 },

 onChat: async function({ event, api }) {
 const replies = [
 { text: "Haha, that’s funny! 😂", emoji: "😂" },
 { text: "Aww, so cute! 🥰", emoji: "🥰" },
 { text: "Hmm… thinking 🤔", emoji: "🤔" },
 { text: "Wow! That blew my mind 🤯", emoji: "🤯" },
 { text: "Yay! Let’s celebrate 🥳", emoji: "🥳" },
 { text: "Oh no! 😢", emoji: "😢" },
 { text: "Hehe, silly 😜", emoji: "😜" },
 { text: "Feeling cool 😎", emoji: "😎" },
 { text: "Oops! 😏", emoji: "😏" },
 { text: "Sleepy time 😴", emoji: "😴" }
 ];

 // Pick a random reply
 const randomReply = replies[Math.floor(Math.random() * replies.length)];

 // Send reply
 api.sendMessage(`${randomReply.emoji} | ${randomReply.text}`, event.threadID);
 }
};