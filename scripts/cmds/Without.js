module.exports = {
  config: {
    name: "autoRejectAdd",
    version: "1.5",
    author: "ChatGPT",
    description: "Notify admin log group when bot is added to unauthorized groups",
    category: "system"
  },

  // Dummy onStart (required by GoatBot)
  onStart: async function () {
    return;
  },

  // Event handler
  onEvent: async function ({ api, event }) {
    // Only handle group add events
    if (event.logMessageType === "log:subscribe" && event.logMessageData?.addedParticipants) {
      const botID = api.getCurrentUserID();
      const addedBots = event.logMessageData.addedParticipants.filter(p => p.userFbId == botID);

      if (addedBots.length > 0) {
        const groupID = event.threadID;

        // Get group name for message
        let threadName = "Unknown";
        try {
          const info = await api.getThreadInfo(groupID);
          threadName = info.threadName || "Unknown";
        } catch (e) {}

        // ✅ Only notify admin log group
        const logGroupID = "1281189423446256"; // your admin log group
        api.sendMessage(
          `📢 Bot was added to a new group!\n📝 Group: ${threadName}\n🆔 Thread ID: ${groupID}`,
          logGroupID
        );

        // 🔹 Optional: auto-leave restricted group after notifying
        // await api.removeUserFromGroup(botID, groupID);
      }
    }
  }
};
