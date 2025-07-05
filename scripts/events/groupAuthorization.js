
const { getTime } = global.utils;

module.exports = {
	config: {
		name: "groupAuthorization",
		version: "1.0",
		author: "Assistant",
		envConfig: {
			enable: true
		},
		category: "events"
	},

	langs: {
		vi: {
			unauthorizedGroup: "Nhóm của bạn chưa được ủy quyền. Để được ủy quyền, vui lòng tham gia nhóm hỗ trợ tại: https://m.me/j/AbZX5he4yIFsgui_/",
			leftGroup: "Bot đã rời khỏi nhóm chưa được ủy quyền: %1"
		},
		en: {
			unauthorizedGroup: "Your group is unauthorized. To get authorization, please join the support group at: https://m.me/j/AbZX5he4yIFsgui_/",
			leftGroup: "Bot left unauthorized group: %1"
		}
	},

	onStart: async ({ api, event, threadsData, getLang }) => {
		if (event.logMessageType === "log:subscribe" && 
			event.logMessageData.addedParticipants.some(item => item.userFbId == api.getCurrentUserID())) {
			
			return async function () {
				const { threadID, author } = event;
				const { config } = global.GoatBot;
				
				// Check if the person who added the bot is an admin
				if (config.adminBot.includes(author)) {
					return; // Admin added the bot, no need to check authorization
				}

				try {
					// Check if group is already approved
					const threadData = await threadsData.get(threadID);
					if (threadData.data.groupApproved === true) {
						return; // Group is approved, continue normally
					}

					// Send unauthorized message
					await api.sendMessage(getLang("unauthorizedGroup"), threadID);
					
					// Wait a bit then leave the group
					setTimeout(async () => {
						try {
							await api.removeUserFromGroup(api.getCurrentUserID(), threadID);
							
							// Log to admin
							const threadInfo = await api.getThreadInfo(threadID);
							const threadName = threadInfo.threadName || threadID;
							
							for (const adminID of config.adminBot) {
								await api.sendMessage(
									getLang("leftGroup", `${threadName} (${threadID})`),
									adminID
								);
							}
						} catch (err) {
							console.error("Error leaving unauthorized group:", err);
						}
					}, 3000); // 3 second delay
					
				} catch (err) {
					console.error("Error in group authorization check:", err);
				}
			};
		}
	}
};
