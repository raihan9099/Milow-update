module.exports = {
  config: {
    name: "help",
    aliases: ["hlp", "cmd", "start"],
    version: "5.1",
    author: "Raihan_ Milow",
    countDown: 5,
    role: 0,
    shortDescription: "Show all commands with pagination & auto-delete menu",
    longDescription: "Commands list with page controls and menu auto delete after 20 seconds",
    category: "info",
    guide: {
      en: "{pn} [command name|next|prev|page number]"
    }
  },

  onStart: async function ({ api, event, commandName, args }) {
    try {
      if (!global.GoatBot || !global.GoatBot.commands || !global.GoatBot.config) {
        return api.sendMessage(
          "⚠️ GoatBot core not loaded properly. Please restart the bot.",
          event.threadID,
          event.messageID
        );
      }

      const prefix = global.GoatBot.config.prefix || ".";
      const commands = [...global.GoatBot.commands.values()];

      // If user requests a specific command
      if (args.length && isNaN(args[0])) {
        const query = args[0].toLowerCase();
        const cmd = commands.find(
          c => c.config.name === query || (c.config.aliases && c.config.aliases.includes(query))
        );

        if (!cmd) {
          return api.sendMessage(`❌ Command not found: ${args[0]}`, event.threadID, event.messageID);
        }

        const detailMsg =
          `📄 𝗖𝗼𝗺𝗺𝗮𝗻𝗱: ${cmd.config.name}\n` +
          `🔖 Aliases: ${cmd.config.aliases?.join(", ") || "None"}\n` +
          `📌 Description: ${cmd.config.longDescription || cmd.config.shortDescription || "No description"}\n` +
          `📂 Category: ${cmd.config.category || "Uncategorized"}\n` +
          `⌛ Cooldown: ${cmd.config.countDown || 3}s\n` +
          `✍ Author: ${cmd.config.author}`;

        return api.sendMessage(detailMsg, event.threadID, event.messageID);
      }

      // Group commands by category
      const priorityCategories = ["AI", "IMAGECREATE"];
      const categories = {};

      for (const cmd of commands) {
        let cat = cmd.config.category ? cmd.config.category.toUpperCase() : "UNCATEGORIZED";
        if (cat.includes("IMAGE")) cat = "IMAGECREATE";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(cmd);
      }

      const sortedCategoryKeys = [
        ...priorityCategories.filter(cat => categories[cat]),
        ...Object.keys(categories)
          .filter(cat => !priorityCategories.includes(cat))
          .sort(),
      ];

      // Format commands for display
      const formattedCommands = [];
      for (const category of sortedCategoryKeys) {
        if (!categories[category] || !categories[category].length) continue;
        formattedCommands.push(`╭─────⭔『 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗬: ${category} 』`);
        categories[category].forEach(cmd => {
          let line = `│✧ ${cmd.config.name}`;
          if (cmd.config.aliases?.length) line += ` (aliases: ${cmd.config.aliases.join(", ")})`;
          formattedCommands.push(line);
        });
        formattedCommands.push("╰────────────⭓");
        formattedCommands.push(""); // keep blank line for spacing
      }

      // Pagination logic
      const PAGE_SIZE = 20;
      const totalPages = Math.ceil(formattedCommands.length / PAGE_SIZE);
      let currentPage = 1;

      if (args.length) {
        const input = args[0].toLowerCase();
        if (input === "next") currentPage = Math.min(totalPages, parseInt(event.body?.match(/page:(\d+)/)?.[1] || 1) + 1);
        else if (input === "prev") currentPage = Math.max(1, parseInt(event.body?.match(/page:(\d+)/)?.[1] || 1) - 1);
        else if (!isNaN(input)) currentPage = Math.min(totalPages, Math.max(1, parseInt(input)));
      }

      function buildPage(page) {
        const start = (page - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        const pageContent = formattedCommands.slice(start, end).join("\n");

        return (
          `${pageContent}\n` +
          "╰─────⭔──────────⭓\n" +
          "╭─────⭔『 𝗜𝗻𝗳𝗼 』\n" +
          `│ Page ${page}/${totalPages} | Total commands: ${commands.length}\n` +
          `│ Type: ${prefix}${commandName} <command> for details\n` +
          `│ Type: ${prefix}${commandName} next | prev | [page number]\n` +
          "╰────────────⭓\n\n" +
          "╭─────⭔『 𝗘𝗻𝗷𝗼𝘆 🍀 』\n" +
          "│ > Powered by Raihan & Milow\n" +
          "╰────────────⭓"
        );
      }

      const sentMessage = await api.sendMessage(buildPage(currentPage), event.threadID, event.messageID);

      // Auto-delete message after 20 seconds
      setTimeout(async () => {
        try {
          await api.unsendMessage(sentMessage.messageID);
        } catch {}
      }, 20000);

    } catch (error) {
      console.error("Error in help command:", error);
      api.sendMessage("❌ An unexpected error occurred.", event.threadID, event.messageID);
    }
  }
};
