const { getStreamFromURL } = global.utils;
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "honey",
    version: "1.1",
    author: "ᴀɴɪᴋ_🐢",
    countDown: 0,
    role: 0,
    shortDescription: "ᴏᴡɴᴇʀ ɪɴꜰᴏ ᴡɪᴛʜ ɪᴍᴀɢᴇ",
    longDescription: "ᴅɪꜱᴘʟᴀʏꜱ ᴏᴡɴᴇʀ ɪɴꜰᴏ ᴡɪᴛʜ ꜰɪxᴇᴅ ꜰʙ ɪᴍᴀɢᴇ",
    category: "info",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message, event, api }) {
    const imgURL = "https://graph.facebook.com/100081481443727/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
    
    try {
      const stream = await getStreamFromURL(imgURL);
      const threadInfo = await api.getThreadInfo(event.threadID);
      const threadName = threadInfo.threadName || "ᴜɴᴋɴᴏᴡɴ ɢʀᴏᴜᴘ";
      const time = moment().tz("Asia/Dhaka").format("hh:mm A, dddd");

      const caption = `
╭────────────────⊙
│ ♥︎ᴀꜱꜱᴀʟᴀᴍᴜ ᴡᴀʟᴀɪᴋᴜᴍ♥︎              
├────────────────❖
├──❯     ♡︎_ɪɴꜰᴏ_♡︎            
├‣ɴᴀᴍᴇ : 𝚄𝚖𝚖𝚎 𝙷𝚘𝚗𝚎𝚢 🎀
                               
├‣ʙᴀꜱᴀ : 𝙲𝚑𝚒𝚝𝚝𝚊𝚐𝚘𝚗𝚐 🐥               
├‣ꜱᴛᴅʏ : 𝙷𝚂𝙲 𝚌𝚘𝚖𝚙𝚕𝚎𝚝𝚎 25              
├──❯     ♡︎_ᴄᴏɴᴛᴀᴄᴛ_♡︎               
├‣ꜰʙ : https://www.facebook.com/fh.honey.607              
├‣ᴛᴛ : 𝚊𝚛𝚞𝚗𝚒𝚔𝚊_𝚒𝚕𝚑𝚊𝚗𝟲𝟬𝟳                   
├──❯ ♡︎_ʀᴇʟᴀᴛɪᴏɴ ꜱʜɪᴘ_♡︎                
├‣ꜱᴛᴀᴛᴜꜱ : 𝙼𝚒𝚗𝚐𝚎𝚕 (🥺)
├‣ᴄʀᴜꜱʜ   : 𝙽𝚘𝚗𝚎
├──❯   ♡︎_ɢᴄ ɪɴꜰᴏ_♡︎
├‣ɢᴄ ɴᴀᴍᴇ : ${threadName}
├‣⏳ ᴛɪᴍᴇ : ${time}  
├‣ᴘʀᴇꜰɪx  : ( / )
├────────────────❖
│ ❀ᴛʜᴀɴᴋꜱ ꜰᴏʀ ᴜꜱɪɴɢ❀
㋛︎───────────㋛︎`;

      message.reply({ body: caption, attachment: stream });
    } catch (e) {
      console.error(e);
      message.reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ʟᴏᴀᴅ ɪᴍᴀɢᴇ ᴏʀ ɪɴꜰᴏ.");
    }
  }
};
