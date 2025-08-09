module.exports = {
  config: {
    name: "help",
    version: "1.1",
    author: "Raihan",
    category: "system",
    shortDescription: "Show command list",
    longDescription: "Stylish categorized commands with deep aligned small command lists",
    guide: "{pn}help [command name]",
  },

  onStart: async function({ message, args, prefix }) {
    const allCommands = global.GoatBot.commands;
    const categories = {};

    const emojiMap = {
      admin: "🛠️",
      fun: "🎮",
      utility: "🌍",
      system: "⚙️",
      image: "🖼️",
      boxchat: "📦",
      owner: "👑",
      ai: "🤖",
      game: "🎲",
      economy: "💰",
      contact: "📞",
      tools: "🧰",
      others: "📁",
    };

    const cleanCategoryName = (text) => (text ? text.toLowerCase().trim() : "others");

    // Group commands by category
    for (const [name, cmd] of allCommands) {
      const cat = cleanCategoryName(cmd.config.category);
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(cmd.config.name);
    }

    if (args[0]) {
      const query = args[0].toLowerCase();
      const cmd = allCommands.get(query) || [...allCommands.values()].find(c => (c.config.aliases || []).includes(query));
      if (!cmd) return message.reply(`❌ Command "${query}" not found.`);

      const { name, version, author, guide, category, shortDescription } = cmd.config;

      return message.reply(
        `╭─⊙『  𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐈𝐍𝐅𝐎 』\n` +
        `│✧ 𝐍𝐚𝐦𝐞: ${name}\n` +
        `│✧ 𝐂𝐚𝐭𝐞𝐠𝐨𝐫𝐲: ${category || "Uncategorized"}\n` +
        `│✧ 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧: ${shortDescription || "No description"}\n` +
        `│✧ 𝐔𝐬𝐚𝐠𝐞: ${typeof guide === "string" ? guide.replace(/{pn}/g, prefix) : `${prefix}${name}`}\n` +
        `│✧ 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: ${version || "1.0"}\n` +
        `│✧ 𝐀𝐮𝐭𝐡𝐨𝐫: ${author || "Unknown"}\n` +
        `╰────────────⊙`
      );
    }

    // Format commands: if <= 4 cmds, vertical deep aligned else inline
    const formatCommands = (cmds) => {
      if (cmds.length <= 4) {
        return cmds
          .sort()
          .map(cmd => `│  ✧ ${cmd}`)
          .join("\n");
      } else {
        return cmds
          .sort()
          .map(cmd => `✧ ${cmd}`)
          .join("  ");
      }
    };

    let msg = "";

    for (const cat of Object.keys(categories).sort()) {
      const emoji = emojiMap[cat] || emojiMap["others"];
      msg += `╭━━━ ${emoji} 𝐂𝐀𝐓𝐄𝐆𝐎𝐑𝐘: ${cat.toUpperCase()} ━━━╮\n`;
      msg += formatCommands(categories[cat]) + "\n";
      msg += "╰────────────⊙\n\n";
    }

    msg += `Use ${prefix}help [command name] for detailed info`;

    return message.reply(msg);
  }
};
