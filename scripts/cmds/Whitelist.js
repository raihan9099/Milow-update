const fs = require("fs");
const path = require("path");

// whitelist.json path
const wlFile = path.join(__dirname, "../../whitelist.json");

// Load whitelist
function loadWL() {
  if (!fs.existsSync(wlFile)) fs.writeFileSync(wlFile, JSON.stringify([]));
  return JSON.parse(fs.readFileSync(wlFile));
}

// Save whitelist
function saveWL(list) {
  fs.writeFileSync(wlFile, JSON.stringify(list, null, 2));
}

module.exports = {
  config: {
    name: "whitelist",
    aliases: ["wl"],
    version: "1.0",
    author: "Raihan",
    role: 2, // Only bot admin can manage WL
    shortDescription: "Manage bot whitelist",
    longDescription: "Add/remove/list users allowed to use the bot",
    category: "admin"
  },

  onStart: async function ({ args, event, api }) {
    let wl = loadWL();
    const action = args[0];
    const uid = args[1];

    if (!action) return api.sendMessage("⚠ Usage: wl add <uid> | wl remove <uid> | wl list", event.threadID, event.messageID);

    // Add UID
    if (action === "add") {
      if (!uid) return api.sendMessage("⚠ Provide UID to add", event.threadID, event.messageID);
      if (!wl.includes(uid)) {
        wl.push(uid);
        saveWL(wl);
        return api.sendMessage(`✅ UID ${uid} added to whitelist`, event.threadID, event.messageID);
      } else return api.sendMessage("⚠ UID already in whitelist", event.threadID, event.messageID);
    }

    // Remove UID
    if (action === "remove") {
      if (!uid) return api.sendMessage("⚠ Provide UID to remove", event.threadID, event.messageID);
      wl = wl.filter(id => id !== uid);
      saveWL(wl);
      return api.sendMessage(`🗑 UID ${uid} removed from whitelist`, event.threadID, event.messageID);
    }

    // List all
    if (action === "list") {
      if (wl.length === 0) return api.sendMessage("⚠ Whitelist is empty", event.threadID, event.messageID);
      return api.sendMessage("✅ Whitelisted UIDs:\n" + wl.join("\n"), event.threadID, event.messageID);
    }

    return api.sendMessage("⚠ Invalid action. Use: add/remove/list", event.threadID, event.messageID);
  }
};
