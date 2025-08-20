const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

// Simple fuzzy search for suggestion
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

// Levenshtein distance function (edit distance)
function levenshteinDistance(a, b) {
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,      // deletion
        matrix[j - 1][i] + 1,      // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  return matrix[b.length][a.length];
}

module.exports = {
  config: {
    name: "help",
    version: "1.26",
    author: "Raihan",
    countDown: 5,
    role: 0,
    shortDescription: { en: "View command usage and list all commands directly" },
    longDescription: { en: "View command usage and list all commands directly" },
    category: "info",
    guide: { en: "{pn} / help [category] or help commandName" },
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

    // Show full help list if no argument
    if (!rawInput) {
      let msg = "╔══════════════════╗\n";
      msg += "   𝐑𝐀𝐈𝐇𝐀𝐍 𝐀𝐈 𝐇𝐄𝐋𝐏 𝐌𝐄𝐍𝐔\n";
      msg += "╚══════════════════╝\n";

      for (const category of Object.keys(categories).sort()) {
        const cmdList = categories[category];
        msg += `┍━━━[ ${category.toUpperCase()} ]\n`;

        const sortedNames = cmdList.sort((a, b) => a.localeCompare(b));
        for (const cmdName of sortedNames) {
          msg += `┋〄 ${cmdName}\n`;
        }

        msg += "┕━━━━━━━━━━━━◊\n";
      }

      msg += "┍━━━[INFO]━━━◊\n";
      msg += `┋➥ TOTAL CMD : [${commands.size}]\n`;
      msg += `┋➥ PREFIX    : ${prefix}\n`;
      msg += `┋➥ OWNER     : Raihan\n`;
      msg += "┕━━━━━━━━━━━◊";

      const sent = await message.reply(msg);

      // Auto unsend after 30s
      setTimeout(() => {
        message.unsend(sent.messageID);
      }, 30000);

      return;
    }

    // Show command info for specific command
    const commandName = rawInput.toLowerCase();
    const command = commands.get(commandName) || commands.get(aliases.get(commandName));

    if (!command || !command?.config) {
      const suggestion = getClosestCommand(commandName);
      if (suggestion) {
        return message.reply(`❌ Command "${commandName}" khuje paoya jay nai.\n👉 Did you mean: "${suggestion}"?`);
      } else {
        return message.reply(`❌ Command "${commandName}" khuje paoya jay nai.\nTry: /help or /help [category]`);
      }
    }

    const configCommand = command.config;
    const roleText = roleTextToString(configCommand.role);
    const longDescription = configCommand.longDescription?.en || "No description available.";
    const guideBody = configCommand.guide?.en || "No guide available.";
    const usage = guideBody.replace(/{pn}/g, `${prefix}${configCommand.name}`);

    const msg = `
╔══════════════════╗
   𝐑𝐀𝐈𝐇𝐀𝐍 𝐀𝐈 𝐂𝐎𝐌𝐌𝐀𝐍𝐃
╚══════════════════╝
┋🧩 Name       : ${configCommand.name}
┋🗂️ Category   : ${configCommand.category || "Uncategorized"}
┋📜 Description: ${longDescription}
┋🔁 Aliases    : ${configCommand.aliases?.join(", ") || "None"}
┋⚙️ Version    : ${configCommand.version || "1.0"}
┋🔐 Permission : ${configCommand.role} (${roleText})
┋⏱️ Cooldown   : ${configCommand.countDown || 5}s
┋👑 Author     : Raihan
┋📖 Usage      : ${usage}
╚════════════════════╝`;

    const sent = await message.reply(msg);

    // Auto unsend after 30s
    setTimeout(() => {
      message.unsend(sent.messageID);
    }, 30000);
  },
};

// Helper to convert role number to text
function roleTextToString(role) {
  switch (role) {
    case 0: return "All users";
    case 1: return "Group Admins";
    case 2: return "Bot Admins";
    default: return "Unknown";
  }
} 
