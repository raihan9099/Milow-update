module.exports = {
  config: {
    name: "leave",
    aliases: ["out", "exitgroup"],
    version: "1.0",
    author: "nexo_here",
    shortDescription: "Leave from a group",
    longDescription: "Make the bot leave the current group or a specified group by tid",
    category: "owner",
    guide: "{pn}leave [tid]"
  },

  onStart: async function ({ message, args, api, event }) {
    // args[0] = tid if provided
    const tid = args[0];

    // Check if message is from group chat or if tid provided
    if (!tid && !event.isGroup) {
      return message.reply("❌ Please use this command inside a group or provide a group tid.");
    }

    try {
      let targetThreadId;

      if (tid) {
        // If tid given, use it
        targetThreadId = tid;
      } else {
        // else use current thread id
        targetThreadId = event.threadID;
      }

      // Leave the group using api
      await api.removeUserFromGroup(api.getCurrentUserID(), targetThreadId);
      // or api.leaveGroup(targetThreadId) যদি তোমার API তে থাকে

      message.reply(`✅ Left the group with tid: ${targetThreadId}`);
    } catch (error) {
      console.error(error);
      message.reply(`❌ Failed to leave group. Make sure the tid is correct and bot is admin.`);
    }
  }
};