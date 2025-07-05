module.exports = {
  config: {
    name: "help",
    aliases: ["menu", "commands"],
    version: "2.7",
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
      categories[cat].push(cmd.config.name);
    }

    if (args[0]) {
      const query = args[0].toLowerCase();
      const cmd =
        allCommands.get(query) ||
        [...allCommands.values()].find((c) =>
          (c.config.aliases || []).includes(query)
        );
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
          : longDescription?.en ||
            (typeof shortDescription === "string"
              ? shortDescription
              : shortDescription?.en || "No description");

      const usage =
        typeof guide === "string"
          ? guide.replace(/{pn}/g, prefix)
          : guide?.en
          ? guide.en.replace(/{pn}/g, prefix)
          : `${prefix}${name}`;

      return message.reply(
        `✨ 𝘾𝙤𝙢𝙢𝙖𝙣𝙙 𝙄𝙣𝙛𝙤\n\n` +
          `➥ Name: ${name}\n` +
          `➥ Category: ${category || "Unknown"}\n` +
          `➥ Description: ${desc}\n` +
          `➥ Aliases: ${aliases?.length ? aliases.join(", ") : "None"}\n` +
          `➥ Usage: ${usage}\n` +
          `➥ Author: ${author || "Unknown"}\n` +
          `➥ Version: ${version || "1.0"}`
      );
    }

    const formatCommands = (cmds) =>
      cmds
        .sort()
        .map((cmd) => `°${cmd}`)
        .join("  ");

    let msg = `❯  ❲ ☠️ ❳  𝙉𝙀𝙓𝙊𝘽𝙊𝙏 Command List\n━━━━━━━━━━━ ✕ ━━━━━━━━━\n\n`;

    const sortedCats = Object.keys(categories).sort();
    for (const cat of sortedCats) {
      msg += `『 ${cat.toUpperCase()} 』\n`;
      msg += formatCommands(categories[cat]) + "\n\n";
    }

    msg += `➥ Total Commands » ${allCommands.size}\n`;
    msg += `➥ Use "${prefix}help [command name]" to get detailed info\n`;
    msg += `━━━━━━━━━━━ ✕ ━━━━━━━━━`;

    return message.reply(msg);
  }
};
