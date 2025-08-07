module.exports = {
  config: {
    name: "tree",
    version: "4.5",
    author: "nexo_here",
    shortDescription: "Show all available commands",
    longDescription: "Displays a clean and premium-styled categorized list of commands.",
    category: "system",
    guide: "{pn}help [command name]"
  },

  onStart: async function ({ message, args, prefix }) {
    const allCommands = global.GoatBot.commands;
    const categories = {};

    const emojiMap = {
      ai: "🤖",
      "ai-image": "🖼️",
      group: "👥",
      system: "⚙️",
      fun: "🎉",
      owner: "👑",
      config: "🧩",
      economy: "💰",
      media: "🎬",
      "18+": "🔞",
      tools: "🧰",
      utility: "📦",
      info: "ℹ️", 
      image: "🏜️",
      game: "🎮",
      admin: "⚠️",
      rank: "📈",
      boxchat: "🦥",
      others: "📁"
    };

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
      const cat = cleanCategoryName(cmd.config.category);
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(cmd.config.name);
    }

    // Single command detail
    if (args[0]) {
      const query = args[0].toLowerCase();
      const cmd =
        allCommands.get(query) ||
        [...allCommands.values()].find((c) => (c.config.aliases || []).includes(query));
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
        typeof longDescription === "string"
          ? longDescription
          : longDescription?.en || shortDescription?.en || shortDescription || "No description";

      const usage =
        typeof guide === "string"
          ? guide.replace(/{pn}/g, prefix)
          : guide?.en?.replace(/{pn}/g, prefix) || `${prefix}${name}`;

      return message.reply(
        `☠️ 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗜𝗡𝗙𝗢 ☠️\n\n` +
        `➥ Name: ${name}\n` +
        `➥ Category: ${category || "Uncategorized"}\n` +
        `➥ Description: ${desc}\n` +
        `➥ Aliases: ${aliases?.length ? aliases.join(", ") : "None"}\n` +
        `➥ Usage: ${usage}\n` +
        `➥ Developer: Chitron Bhattacharya\n` +
        `➥ Version: ${version || "1.0"}`
      );
    }

    const formatCommands = (cmds) =>
      cmds
        .sort()
        .map((cmd) => `│ ∘ ${cmd}`)
        .join("\n");

    // Main command list
    let msg = `╭━ 🎯 𝑵𝑬𝑿𝑶𝑩𝑶𝑻 𝑪𝑶𝑴𝑴𝑨𝑵𝑫𝑺 ━╮\n`;

    const sortedCategories = Object.keys(categories).sort();
    for (const cat of sortedCategories) {
      const emoji = emojiMap[cat] || "📁";
      msg += `\n${emoji} ${cat.toUpperCase()}\n`;
      msg += `${formatCommands(categories[cat])}\n`;
    }

    msg += `\n╰➤ Use: ${prefix}help [command name] for details`;

    return message.reply(msg);
  }
};
