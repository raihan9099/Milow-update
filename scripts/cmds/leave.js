module.exports = {
  config: {
    name: "leave",
    aliases: ["out", "exitgroup"],
    version: "1.2",
    athour " MD_Raihan",
    shortDescription: "Leave from a group",
    longDescription: "Make the bot leave the current group or a specified group by tid",
    category: "owner",
    guide: "{pn}leave [tid]"
  },

  onStart: async function ({ message, args, api, event }) {
    const tid = args[0];
    const threadID = event.threadID;
    const senderID = event.senderID;
    const targetThreadId = tid || threadID;

    // ✅ Check bot owner
    const botAdmins = global.GoatBot.config?.admins || [];
    const isBotAdmin = botAdmins.includes(senderID);

    // ✅ If not bot admin, check group admin
    let isGroupAdmin = false;

    if (!isBotAdmin) {
      try {
        const threadInfo = await api.getThreadInfo(targetThreadId);
        isGroupAdmin = threadInfo.adminIDs.some(admin => admin.id == senderID);
      } catch (e) {
        return message.reply("❌ Could not fetch group info to verify permissions.");
      }
    }

    // ❌ If not bot admin and not group admin
    if (!isBotAdmin && !isGroupAdmin) {
      return message.reply("⛔ Only group admins or bot admins can use this command.");
    }

    // ✅ Try to leave the group
    try {
      await api.removeUserFromGroup(api.getCurrentUserID(), targetThreadId);
      message.reply(`✅ Left the group with tid: ${targetThreadId}`);
    } catch (error) {
      console.error("Leave error:", error);
      message.reply(`❌ Failed to leave. Make sure the bot is in the group and has permission.`);
    }
  }
};
