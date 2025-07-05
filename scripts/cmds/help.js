module.exports = {
  config: {
    name: "help",
    aliases: ["menu", "commands"],
    version: "2.6",
    author: "nexo_here",
    shortDescription: "Show all available commands",
    longDescription: "Display a categorized list of all available commands.",
    category: "system",
    guide: "{pn}help [command name]"
  },

  onStart: async function ({ message, args, prefix }) {
    const allCommands = global.GoatBot.commands;
    const categories = {};

    const cleanCategoryName = (text) => {
      if (!text) return "others";
      return text
        .normalize("NFKD")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
    };

    for (const [name, cmd] of allCommands) {
      const rawCat = cmd.config.category || "others";
      const cat = cleanCategoryName(rawCat);
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push({
        name: cmd.config.name,
        desc: (typeof cmd.config.shortDescription === "string")
            ? cmd.config.shortDescription
            : (cmd.config.shortDescription?.en || "")
      });
    }

    if (args[0]) {
      const query = args[0].toLowerCase();
      const cmd = allCommands.get(query) || [...allCommands.values()].find(c => (c.config.aliases || []).includes(query));
      if (!cmd) return message.reply(`❌ Command "${query}" not found.`);

      const {
        name,
        version,
        author,
        guide,
        category,
        shortDescription,
        longDescription,
        aliases
      } = cmd.config;

      const desc =
        (typeof longDescription === "string")
          ? longDescription
          : (longDescription?.en || (typeof shortDescription === "string" ? shortDescription : (shortDescription?.en || "No description")));

      return message.reply(
        `✨ Command Info\n\n` +
        `Name: ${name}\n` +
        `Category: ${category || "Unknown"}\n` +
        `Description: ${desc}\n` +
        `Aliases: ${aliases?.length ? aliases.join(", ") : "None"}\n` +
        `Usage: ${guide ? guide.replace(/{pn}/g, prefix) : prefix + name}\n` +
        `Author: ${author || "Unknown"}\n` +
        `Version: ${version || "1.0"}`
      );
    }

    // Do not change author name nexo_here without permission!!!!!!
    const emojiMap = {
      system: "⚙️",       // System / Settings
      ai: "🤖",           // AI or Bot related
      "ai-image": "🖼️",    // AI Image generation
      info: "ℹ️",         // Info commands
      fun: "🎉",           // Fun & games
      media: "🎬",         // Media (video/music)
      economy: "💰",       // Economy / Money
      games: "🎮",         // Games
      tools: "🧰",         // Tools / Utilities
      owner: "👑",         // Owner or Admin
      others: "📦",        // Others / Miscellaneous
      nsfw: "🔞",          // NSFW content
      image: "🌄",         // Image related
      social: "🌐",        // Social / Chat
      music: "🎵",         // Music
      weather: "☀️",       // Weather
      chat: "💬",          // Chatbot or conversation
      help: "❓",          // Help commands
    };

    let msg = "❯  ❲ ☠️ ❳  𝙉𝙚𝙭𝙤𝘽𝙊𝙏 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗟𝗶𝘀𝘁\n━━━━━━━━━━━ ✕ ━━━━━━━━━\n";

    const sortedCats = Object.keys(categories).sort();
    for (const cat of sortedCats) {
      const cmds = categories[cat]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(c => `• ${c.name}`)
        .join("  ");
      msg += `${emojiMap[cat] || "📦"} ${cat.toUpperCase()}\n${cmds}\n\n`;
    }

    msg += `➥ View command details: ${prefix}help [command name]\n`;
    msg += `➥ Developed by: @nexo_here\n━━━━━━━━━━━ ✕ ━━━━━━━━━`;

    return message.reply(msg);
  }
};
