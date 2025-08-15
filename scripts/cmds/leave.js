module.exports = {
  config: {
    name: "leave",
    aliases: ["out", "exitgroup"],
    version: "1.1",
    author: "nexo_here",
    shortDescription: "Leave from a group",
    longDescription: "Make the bot leave the current group or a specified group by tid",
    category: "owner",
    guide: "{pn}leave [tid]"
  },

  onStart: async function ({ message, args, api, event, usersData, threadsData }) {
    const tid = args[0];
    const threadID = event.threadID;
    const senderID = event.senderID;

    // Only allow in group or if tid provided
    if (!tid && !event.isGroup) {
      return message.reply("❌ Please use this command inside a group or provide a group tid.");
    }

    // === PERMISSION CHECK ===

    // 1. Check if user is bot admin
    const botAdmins = global.GoatBot.config?.admins || []; // Adjust this line if your config path is different
    const isBotAdmin = botAdmins.includes(senderID);

    // 2. Check if user is group admin
    let isGroupAdmin = false;

    try {
      const threadInfo = await api.getThreadInfo(tid || threadID);
      isGroupAdmin = threadInfo.adminIDs.some(admin => admin.id == senderID);
    } catch (e) {
      return message.reply("❌ Could not fetch group info to verify permissions.");
    }

    if (!isBotAdmin && !isGroupAdmin) {
      return message.reply("⛔ Only group admins or bot admins can use this command.");
    }

    // === LEAVE LOGIC ===
    try {
      const targetThreadId = tid || threadID;
      await api.removeUserFromGroup(api.getCurrentUserID(), targetThreadId);
      message.reply(`✅ Left the group with tid: ${targetThreadId}`);
    } catch (error) {
      console.error(error);
      message.reply(`❌ Failed to leave group. Make sure the tid is correct and the bot is admin.`);
    }
  }
};
