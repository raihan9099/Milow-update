module.exports = {
	config: {
		name: "approve",
		version: "1.4",
		author: "Raihan_milows",
		countDown: 5,
		role: 2, // Admin-only for approve/remove/list
		description: "Approve a group, get thread ID, contact admin, or info check",
		category: "admin",
		guide: {
			en: "{pn} <threadID> - Approve a group by its thread ID\n{pn} list - Show all approved groups\n{pn} remove <threadID> - Remove approval from a group\n{pn} getid - Get this group's thread ID (everyone)\n{pn} callad - Contact the bot admin (everyone)\n{pn} info - Check if group is approved (everyone)"
		}
	},

	langs: {
		en: {
			missingThreadId: "⚠️ Please provide a thread ID to approve.",
			invalidThreadId: "⚠️ Invalid thread ID.",
			groupApproved: "✅ Group approved successfully!\n📝 Group name: %1\n🆔 Thread ID: %2",
			groupAlreadyApproved: "⚠️ This group is already approved.",
			approvalRemoved: "✅ Approval removed from group: %1 (%2)",
			groupNotApproved: "⚠️ This group is not approved.",
			approvedGroupsList: "📋 List of approved groups:\n\n%1",
			noApprovedGroups: "📋 No groups have been approved yet.",
			errorGettingGroupInfo: "❌ Could not get group information. Thread ID may be invalid.",
			invalidSubcommand: "⚠️ Invalid subcommand. Use: approve <threadID>, approve list, approve remove <threadID>, getid, callad, or info",
			threadId: "🆔 Thread ID of this group: %1",
			contactAdmin: "📞 You can contact the bot admin here: [Click Here](https://m.me/hydrocarbonn)",
			notApproved: "⚠️ *Your group is not approved!*\n\n📌 Please contact the admin using the command: `callad`\n💬 Or send a message directly via Messenger: [Click here](https://m.me/hydrocarbonn)\n\nThank you!"
		}
	},

	onStart: async function ({ message, args, threadsData, api, getLang }) {
		const subcommand = args[0]?.toLowerCase();

		if (!subcommand) return message.reply(getLang("missingThreadId"));

		// === Everyone commands ===
		if (subcommand === "getid") {
			return message.reply(getLang("threadId", message.threadID));
		}

		if (subcommand === "callad") {
			return message.reply(getLang("contactAdmin"));
		}

		if (subcommand === "info") {
			try {
				const threadID = message.threadID;
				const threadData = await threadsData.get(threadID);

				if (!threadData?.data?.groupApproved) {
					return message.reply(getLang("notApproved"));
				} else {
					return message.reply("✅ This group is approved. You can use all bot features.");
				}
			} catch (err) {
				console.error("Error checking group approval:", err);
				return message.reply("❌ Could not check group approval status.");
			}
		}

		// === Admin-only commands ===
		if (["list", "remove"].includes(subcommand) || !isNaN(subcommand)) {
			if (message.senderID !== api.getCurrentUserID()) return; // Admin check
		}

		// List approved groups
		if (subcommand === "list") {
			try {
				const allThreads = await threadsData.getAll();
				const approvedGroups = allThreads.filter(thread => thread.data.groupApproved === true);

				if (approvedGroups.length === 0) return message.reply(getLang("noApprovedGroups"));

				const groupsList = approvedGroups
					.map((thread, i) => `${i + 1}. ${thread.threadName || "Unknown"} (${thread.threadID})`)
					.join("\n");

				return message.reply(getLang("approvedGroupsList", groupsList));
			} catch (err) {
				console.error("Error listing approved groups:", err);
				return message.reply("❌ Error retrieving approved groups list.");
			}
		}

		// Remove approval
		if (subcommand === "remove") {
			const threadID = args[1];
			if (!threadID || isNaN(threadID)) return message.reply(getLang("invalidThreadId"));

			try {
				const threadData = await threadsData.get(threadID);
				if (!threadData.data.groupApproved) return message.reply(getLang("groupNotApproved"));

				await threadsData.set(threadID, false, "data.groupApproved");
				return message.reply(getLang("approvalRemoved", threadData.threadName || "Unknown", threadID));
			} catch (err) {
				console.error("Error removing approval:", err);
				return message.reply(getLang("errorGettingGroupInfo"));
			}
		}

		// Approve group
		const threadID = subcommand;
		if (isNaN(threadID)) return message.reply(getLang("invalidThreadId"));

		try {
			let threadData;
			try {
				threadData = await threadsData.get(threadID);
			} catch {
				try {
					const threadInfo = await api.getThreadInfo(threadID);
					threadData = await threadsData.create(threadID, threadInfo);
				} catch {
					return message.reply(getLang("errorGettingGroupInfo"));
				}
			}

			if (threadData.data.groupApproved === true) return message.reply(getLang("groupAlreadyApproved"));

			await threadsData.set(threadID, true, "data.groupApproved");

			return message.reply(getLang("groupApproved", threadData.threadName || "Unknown", threadID));
		} catch (err) {
			console.error("Error approving group:", err);
			return message.reply(getLang("errorGettingGroupInfo"));
		}
	}
};
