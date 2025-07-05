const axios = require("axios");

let sessionMemory = {}; // Store user conversation memory

module.exports = {
	config: {
		name: "gpt",
		aliases: ["chatgpt", "ai", "assistant"],
		version: "1.2",
		author: "nexo_here",
		countDown: 3,
		role: 0,
		shortDescription: "Chat with GPT-4o-pro AI, supports text, images, and video",
		longDescription: "Chat conversationally with GPT, supports image/video detection, clear memory with 'gpt clear'",
		category: "ai",
		guide: {
			en: "{pn} [message] - Chat with AI, reply to image/video, say 'gpt clear' to reset conversation"
		},
		usePrefix: true
	},

	onStart: async function ({ api, event, args }) {
		const userID = event.senderID.toString();

		// Get user message from args or reply message text if args empty
		let userMessage = args.join(" ").trim();
		if (!userMessage && event.messageReply) {
			if (event.messageReply.body) {
				userMessage = event.messageReply.body.trim();
			} else if (event.messageReply.attachments?.length > 0) {
				userMessage = ""; // We'll handle image/video below
			}
		}

		// Detect message type (text, image, video)
		let messageType = "text";
		let attachmentUrl = "";

		if (event.messageReply?.attachments?.length > 0) {
			const att = event.messageReply.attachments[0];
			if (att.type === "photo") {
				messageType = "image";
				attachmentUrl = att.url;
			} else if (att.type === "video") {
				messageType = "video";
				attachmentUrl = att.url;
			}
		}

		// Clear conversation memory command
		if (userMessage.toLowerCase() === "gpt clear") {
			delete sessionMemory[userID];
			return api.sendMessage("🗑️ Conversation memory cleared! You can start fresh now.", event.threadID, event.messageID);
		}

		// If no input at all, ask user to send something
		if (!userMessage && messageType === "text") {
			return api.sendMessage("❌ Please type something or reply to an image/video to chat.", event.threadID, event.messageID);
		}

		// Initialize memory for new users
		if (!sessionMemory[userID]) {
			sessionMemory[userID] = [];
		}

		// Prepare input text for API
		let inputText = "";
		if (messageType === "image") {
			inputText = `User sent an image: ${attachmentUrl}. Message: ${userMessage}`;
		} else if (messageType === "video") {
			inputText = `User sent a video: ${attachmentUrl}. Message: ${userMessage}`;
		} else {
			inputText = userMessage;
		}

		// Save user message to memory
		sessionMemory[userID].push({ role: "user", content: inputText });

		try {
			// Call GPT-4o-pro API
			const res = await axios.get("https://kaiz-apis.gleeze.com/api/gpt-4o-pro", {
				params: {
					ask: inputText,
					uid: userID,
					imageUrl: messageType === "image" ? attachmentUrl : "",
					apikey: "66e0cfbb-62b8-4829-90c7-c78cacc72ae2"
				},
				timeout: 60000
			});

			const replyText = res.data?.response || "Sorry, no response from AI.";

			// Save AI response to memory
			sessionMemory[userID].push({ role: "assistant", content: replyText });

			// Send reply message WITHOUT author prefix
			api.sendMessage(replyText, event.threadID, event.messageID);

		} catch (error) {
			console.error("[gpt] Error:", error);
			api.sendMessage("❌ Error communicating with AI. Please try again later.", event.threadID, event.messageID);
		}
	}
};