 module.exports = {
  config: {
    name: "help",
    version: "1.0",
    author: "ChatGPT by Maisha's Janu 😉",
    category: "info",
    description: "Show commands by category in stylish box",
    guide: "{pn} [page|command name]",
  },

  onStart: async function({ message, args, prefix }) {
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
      admin: "🛠️",
      rank: "📈",
      boxchat: "🦥",
      others: "📁",
    };

    // Group commands by category
    for (const [, cmd] of allCommands) {
      const cat = (cmd.config.category || "others").toLowerCase();
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(cmd.config.name);
    }

    // If user requests single command info
    if (args[0]) {
      const query = args[0].toLowerCase();
      const cmd =
        allCommands.get(query) ||
        [...allCommands.values()].find((c) => (c.config.aliases || []).includes(query));
      if (!cmd) return message.reply(`❌ Command "${query}" not found.`);

      const { name, description, guide, category, aliases, version, author } = cmd.config;

      const desc =
        typeof description === "string"
          ? description
          : description?.en || "No description";

      const usage =
        typeof guide === "string"
          ? guide.replace(/{pn}/g, prefix)
          : guide?.en?.replace(/{pn}/g, prefix) || `${prefix}${name}`;

      return message.reply(
        `📌 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗜𝗡𝗙𝗢\n\n` +
        `➤ Name: ${name}\n` +
        `➤ Category: ${category || "Uncategorized"}\n` +
        `➤ Description: ${desc}\n` +
        `➤ Aliases: ${aliases?.length ? aliases.join(", ") : "None"}\n` +
        `➤ Usage: ${usage}\n` +
        `➤ Author: ${author || "Unknown"}\n` +
        `➤ Version: ${version || "1.0"}`
      );
    }

    // Format commands per category for main list
    const formatCommands = (cmds) =>
      cmds
        .sort()
        .map((cmd) => `⚡ ${cmd}`)
        .join("\n");

    // Compose message with boxes
    let msg = "";

    for (const cat of Object.keys(categories).sort()) {
      const emoji = emojiMap[cat] || "📁";
      msg += `┏━━━ ${emoji} 𝙈𝙚𝙣𝙪: ${capitalize(cat)} ━━━┓\n`;
      msg += `${formatCommands(categories[cat])}\n\n`;
    }

    return message.reply(msg.trim());
  },
};

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
