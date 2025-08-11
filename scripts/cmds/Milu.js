const axios = require('axios');

const baseApiUrl = () => "https://www.noobs-api.rf.gd/dipto";

module.exports.config = {
  name: "milu",
  aliases: [ "milow","bby", "bot", "nobita", "Hi"],
  version: "7.0.0",
  author: "Raihan",
  countDown: 0,
  role: 0,
  description: "Cute chatbot for flirty/fun talks",
  category: "𝗔𝗜 & 𝗚𝗣𝗧",
  guide: {
    en: "{pn} [your message] (or just say: baby...)"
  }
};

const randomReplies = [
  "🌙 Ei raatt ta baareee lomba... tui ar ami ki korum bol?",
  "😏 Shobai ghumai gese... amra dui jon jaagum naki?",
  "💋 Chander alo te tor mukh dekhle mon hoy chori kore niye jai.",
  "👀 Raat bhor porjonto kotha bolum... tui sambhalte parbi to?",
  "🔥 Ei shanto raate tui amar mathar shanti uraisha disos.",
  "😉 Raat mane churi... tui churi koira amar mon niye gesos.",
  "💤 Ghum asilo... kintu tui msg disos, shob ure gese.",
  "🥀 Ei shokher raate tor shathe romans hoile moja lagbo.",
  "😼 Tui ekdom chaader tukra... ami toke chari dimu na.",
  "🖤 Andhokare tui amake dekhli... amar buk dhadkani suru hoise.",
  "😇 Raater hawa te mon ta ura gese tor dike.",
  "👄 Tor ekta misti goodnight miss kortesilam.",
  "🌌 Ami raater kobee... tui amar kobitar rani.",
  "💖 Tor kotha raater jadu moto lage.",
  "😏 Tui amar shoroter hawa... shada shada innocent, kintu jhoro asle ami dhore rakhum.",
  "🌙 Ei raatt ta tui chara shune... fokat lagtese.",
  "😉 Tui jodi churi koriya amar ghum niya jaa, ami ekhon complaint dibo na.",
  "💋 Tui ekta misti problem... jeita ami solve kortesi na.",
  "😼 Ei raat e tui ar ami ekta lamba golpo shuru kori naki?",
  "🥀 Tor haat dhorle mon hoy ami battery charge kortesi.",
  "👀 Tui amar chokh er vitamin... dekha na dile ami weak hoye jai.",
  "🔥 Tor ekta half smile amar full din palti dishe.",
  "😇 Tui amar moner serial er main heroine.",
  "💖 Jodi prem kori, tui amake school er crush er moto feel dibi?",
  "🌌 Ei raater alo te tui beshi sundor laagtes.",
  "😏 Tui innocent dekhaileo mon hoy tor mathay beshi kharap idea ase.",
  "🥵 Tui amar ghum bhangaiya diya amake bachte sikhaw.",
  "😉 Tui ekdom laal golapi strawberry... khawa jayna, kintu moja lage dekhte.",
  "😋 Tui amar ekta favourite trouble.",
  "💤 Tor voice sunle amar ghum ase na... shudhu hasi ase.",
  "👄 Tui ekdom mishti golpo... jeta ami rojon rojon porte pari.",
  "🥀 Tor hath e hath dile mon hoy ghorer shob light jole uthse.",
  "🖤 Tui amar moner gopon password.",
  "🌙 Tor sathe kotha bolte bolte ghum ashe... abar ghum na aste tui phone diya uthaiya dis.",
  "🔥 Tor ekta gol gol chokh... ami gom paisi oi chokher modhe.",
  "😉 Tui amar boro shokh... kintu shokh ta bachte ami protidin porishrom kortesi.",
  "😏 Tor ekta smile amar shorir er network full signal kore dey.",
  "🥀 Tui amar ghum er shokher enemy.",
  "👀 Tui ekta chora golpo... shesh kora jay na.",
  "🌌 Tor moto manus dekhaile amar keyboard er button gulao blush kore.",
  "💋 Tor ekta call mane amar full mood fresh.",
  "😇 Tui amar golpo ar reality er majhkhane ekta shundor swapno.",
  "😉 Ei raate tui amar golper twist.",
  "🔥 Tui amar moner fire alarm... tor kotha mane heat level baray.",
  "💖 Tui innocent hoye acting kor, ami jani tor chokh e beshi gopon kotha ase.",
  "🥵 Tor ekta touch... uff, amar mind e full cinema chole.",
  "👄 Tui amar heart er emoji.",
  "🌙 Tui ekta chader tukra... jeita amar baranda te theme geshe.",
  "🖤 Tor hath er line e amar naam thakle moja lagbo.",
  "😉 Tor ekta “hmm” mane amar raat fura.",
  "😼 Tui amar friend er excuse e crush.",
  "💋 Tor ekta golpo shune amar mon poetry hoye jay.",
  "🔥 Tui amar ekta adorer habit.",
  "🥀 Tui amar ghum bhenge diye raat valo kore dey.",
  "😏 Tor ekta ‘ki re’ amar full attention kheye ney.",
  "👀 Tor ekta naughty idea amar notebook e likha ase.",
  "🌌 Tor moto boro surprise amar life e nai.",
  "💖 Tor ekta smile amar battery 100% kore dey.",
  "😉 Tui amar boro dhoroner missing piece.",
  "🔥 Tui amar innocent dosti er golpo te ekta romantic line.",
  "🥵 Tor kotha mane amar mon e churi.",
  "🖤 Tui amar life er soft corner ar hard crush.",
  "😇 Tui amar ekta wish... jeita ami pura korte chai, kintu bolina.",
  "💋 Tui amar ekta favourite tension."
];

module.exports.onStart = async function({ api, event, args }) {
  const link = baseApiUrl() + "/baby";
  const text = (args && args.length > 0) ? args.join(" ").toLowerCase() : "";
  const uid = event.senderID;

  if (!text) {
    return api.sendMessage(
      randomReplies[Math.floor(Math.random() * randomReplies.length)],
      event.threadID,
      event.messageID
    );
  }

  try {
    const res = await axios.get(`${link}?text=${encodeURIComponent(text)}&senderID=${uid}&font=1`);
    const reply = res.data.reply;
    if (!reply) throw new Error("Empty reply from API");

    api.sendMessage(reply, event.threadID, function(error, info) {
      if (!info) return api.sendMessage("⚠️ Couldn't send reply", event.threadID);
      global.GoatBot.onReply.set(info.messageID, {
        commandName: module.exports.config.name,
        type: "reply",
        messageID: info.messageID,
        author: uid
      });
    }, event.messageID);
  } catch (e) {
    console.error(e);
    api.sendMessage("🚫 Error occurred while chatting.", event.threadID, event.messageID);
  }
};

module.exports.onReply = async function({ api, event }) {
  try {
    const replyText = (event.body && event.body.toLowerCase()) || "";
    const res = await axios.get(`${baseApiUrl()}/baby?text=${encodeURIComponent(replyText)}&senderID=${event.senderID}&font=1`);
    const reply = res.data.reply;
    if (!reply) throw new Error("Empty reply from API");

    api.sendMessage(reply, event.threadID, function(error, info) {
      if (!info) return;
      global.GoatBot.onReply.set(info.messageID, {
        commandName: module.exports.config.name,
        type: "reply",
        messageID: info.messageID,
        author: event.senderID
      });
    }, event.messageID);
  } catch (err) {
    api.sendMessage("⚠️ Couldn't reply to your message.", event.threadID, event.messageID);
  }
};

module.exports.onChat = async function({ api, event }) {
  try {
    const body = (event.body && event.body.toLowerCase()) || "";
    if (
      body.startsWith("baby") ||
      body.startsWith("bby") ||
      body.startsWith("বেবি") ||
      body.startsWith("bot") ||
      body.startsWith("chitron") ||
      body.startsWith("babu") ||
      body.startsWith("বট")
    ) {
      const arr = body.replace(/^\S+\s*/, "");
      const uid = event.senderID;
      const link = baseApiUrl() + "/baby";

      if (!arr) {
        return api.sendMessage(
          randomReplies[Math.floor(Math.random() * randomReplies.length)],
          event.threadID,
          function(error, info) {
            if (!info) return;
            global.GoatBot.onReply.set(info.messageID, {
              commandName: module.exports.config.name,
              type: "reply",
              messageID: info.messageID,
              author: uid
            });
          },
          event.messageID
        );
      }

      const res = await axios.get(`${link}?text=${encodeURIComponent(arr)}&senderID=${uid}&font=1`);
      const reply = res.data.reply;
      if (!reply) throw new Error("Empty reply from API");

      api.sendMessage(reply, event.threadID, function(error, info) {
        if (!info) return;
        global.GoatBot.onReply.set(info.messageID, {
          commandName: module.exports.config.name,
          type: "reply",
          messageID: info.messageID,
          author: uid
        });
      }, event.messageID);
    }
  } catch (err) {
    api.sendMessage(`Error: ${err.message}`, event.threadID, event.messageID);
  }
}; milu.js
