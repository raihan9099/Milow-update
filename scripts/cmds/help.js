const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

function getClosestCommand(name) {
  const lowerName = name.toLowerCase();
  let closest = null;
  let minDist = Infinity;

  for (const cmdName of commands.keys()) {
    const dist = levenshteinDistance(lowerName, cmdName.toLowerCase());
    if (dist < minDist) {
      minDist = dist;
      closest = cmdName;
    }
  }
  if (minDist <= 3) return closest;
  return null;
}

function levenshteinDistance(a, b) {
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }
  return matrix[b.length][a.length];
}

module.exports = {
  config: {
    name: "help",
    version: "2.2",
    author: "raihan",
    countDown: 5,
    role: 0,
    shortDescription: { en: "View command usage and list all commands directly" },
    longDescription: { en: "View command usage and list all commands directly with pages" },
    category: "info",
    guide: { en: "{pn} /help [category] or /help commandName" },
    priority: 1,
  },

  onStart: async function ({ message, args, event, role }) {
    const { threadID } = event;
    const prefix = getPrefix(threadID);
    const categories = {};

    for (const [name, value] of commands) {
      if (!value?.config || typeof value.onStart !== "function") continue;
      if (value.config.role > 1 && role < value.config.role) continue;

      const category = value.config.category?.toLowerCase() || "uncategorized";
      if (!categories[category]) categories[category] = [];
      categories[category].push(name);
    }

    const rawInput = args.join(" ").trim();

    // Show full list if no argument
    if (!rawInput) {
      let allCategories = Object.keys(categories).sort();

      // Move image/gen categories to bottom
      allCategories = allCategories.sort((a, b) => {
        if (a.includes("image") || a.includes("gen")) return 1;
        if (b.includes("image") || b.includes("gen")) return -1;
        return a.localeCompare(b);
      });

      const perPage = 10;
      let page = parseInt(args[0]) || 1;
      let totalPages = Math.ceil(allCategories.length / perPage);
      if (page > totalPages) page = totalPages;

      const start = (page - 1) * perPage;
      const end = start + perPage;
      const showCategories = allCategories.slice(start, end);

      let msg = "╔═══════════════╗\n";
      msg += "       𝑴𝒊𝒍𝒐𝒘 𝑯𝑬𝑳𝑷 𝑴𝑬𝑵𝑼\n";
      msg += "╚═══════════════╝\n";

      for (const category of showCategories) {
        const cmdList = categories[category];
        msg += `┍━━━[ ${category.toUpperCase()} ]\n`;
        const sortedNames = cmdList.sort((a, b) => a.localeCompare(b));
        for (const cmdName of sortedNames) {
          msg += `┋〄 ${cmdName}\n`;
        }
        msg += "┕━━━━━━━━━━━━◊\n";
      }

      msg += `\n📑 Page: ${page}/${totalPages}`;
      msg += "\n┍━━━[ INFO ]━━━◊\n";
      msg += `┋➥ Total Commands: [${commands.size}]\n`;
      msg += `┋➥ Prefix: ${prefix}\n`;
      msg += `┋➥ Owner: raihan\n`;
      msg += "┕━━━━━━━━━━━◊";

      const replyMsg = await message.reply(msg);

      // Auto unsend after 40s
      setTimeout(() => {
        message.unsend(replyMsg.messageID);
      }, 40 * 1000);

      return;
    }

    // Command specific info
    const commandName = rawInput.toLowerCase();
    const command = commands.get(commandName) || commands.get(aliases.get(commandName));

    if (!command || !command?.config) {
      const suggestion = getClosestCommand(commandName);
      if (suggestion) {
        return message.reply(`❌ Command "${commandName}" not found.\n👉 Did you mean: "${suggestion}"?`);
      } else {
        return message.reply(`❌ Command "${commandName}" not found.\nTry: /help or /help [category]`);
      }
    }

    const configCommand = command.config;
    const roleText = roleTextToString(configCommand.role);
    const longDescription = configCommand.longDescription?.en || "No description available.";
    const guideBody = configCommand.guide?.en || "No guide available.";
    const usage = guideBody.replace(/{pn}/g, `${prefix}${configCommand.name}`);

    const msg = `
╔══ [ COMMAND INFO ] ══╗
┋🧩 Name       : ${configCommand.name}
┋🗂️ Category   : ${configCommand.category || "Uncategorized"}
┋📜 Description: ${longDescription}
┋🔁 Aliases    : None
┋⚙️ Version    : ${configCommand.version || "1.0"}
┋🔐 Permission : ${configCommand.role} (${roleText})
┋⏱️ Cooldown   : ${configCommand.countDown || 5}s
┋👑 Author     : raihan
┋📖 Usage      : ${usage}
╚════════════════════╝`;

    const replyMsg = await message.reply(msg);
    setTimeout(() => {
      message.unsend(replyMsg.messageID);
    }, 40 * 1000);
  },
};

function roleTextToString(role) {
  switch (role) {
    case 0: return "All users";
    case 1: return "Group Admins";
    case 2: return "Bot Admins";
    default: return "Unknown";
  }
}
