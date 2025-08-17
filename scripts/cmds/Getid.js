module.exports = {
	config: {
		name: "getid",
		version: "1.0",
		author: "nexo-here",
		countDown: 5,
		role: 0, // Everyone can use
		description: "Get the thread ID of a group",
		category: "utility",
		guide: {
			en: "{pn} - Get the thread ID of this group"
		}
	},

	langs: {
		en: {
			threadId: "🆔 Thread ID of this group: %1",
			errorGettingInfo: "❌ Could not get thread information."
		}
	},

	onStart: async function({ message, getLang }) {
		try {
			const threadID = message.threadID;
			return message.reply(getLang("threadId", threadID));
		} catch (err) {
			console.error("Error getting thread ID:", err);
			return message.reply(getLang("errorGettingInfo"));
		}
	}
};
