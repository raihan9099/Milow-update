const { getPrefix } = global.utils;
const { commands } = global.GoatBot;

module.exports = {
  config: {
    name: "menu",
    version: "1.3",
    author: "raihan",
    countDown: 0,
    role: 0,
    shortDescription: "Show command categories",
    longDescription: "Display all command categories with numbers to view commands",
    category: "info",
    guide: "{prefix} or reply with number"
  },

  onStart: async function ({ message, event, args }) {
    const { threadID, messageID } = event;
    const prefix = getPrefix(threadID);
    const categories = {};
    
    // Group commands by category
    for (const [name, value] of commands) {
      if (!value?.config || typeof value.onStart !== "function") continue;
      
      const category = value.config.category?.toLowerCase() || "uncategorized";
      if (!categories[category]) categories[category] = [];
      categories[category].push(name);
    }
    
    // Sort categories by command count (fewer commands first)
    const sortedCategories = Object.entries(categories)
      .sort((a, b) => a[1].length - b[1].length)
      .map(entry => entry[0]);
    
    const input = args.join(" ").trim().toLowerCase();
    
    // Show all categories if no argument
    if (!input) {
      let msg = "🌸  𝐂𝐀𝐓𝐄𝐆𝐎𝐑𝐈𝐄𝐒  𝐌𝐄𝐍𝐔  🌸\n\n";
      
      let index = 1;
      for (const category of sortedCategories) {
        const commandCount = categories[category].length;
        msg += `${index}. ${category.toUpperCase()} » ${commandCount} cmd\n`;
        index++;
      }
      
      msg += "\n💡 Reply with number to view commands\n";
      msg += `📌 Example: Reply "1" for ${sortedCategories[0]}`;
      
      return message.reply(msg, (err, info) => {
        if (!err) {
          // Store category list for reply handling
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            author: event.senderID,
            categories: sortedCategories
          });
        }
      });
    }
    
    // Handle numeric input
    const categoryIndex = sortedCategories.findIndex(cat => cat.toLowerCase() === input);
    if (!isNaN(input) && parseInt(input) > 0 && parseInt(input) <= sortedCategories.length) {
      const selectedCategory = sortedCategories[parseInt(input) - 1];
      await showCategoryCommands(message, selectedCategory, prefix, categories[selectedCategory]);
      return;
    }
    
    // Handle category name input
    if (categoryIndex !== -1) {
      const selectedCategory = sortedCategories[categoryIndex];
      await showCategoryCommands(message, selectedCategory, prefix, categories[selectedCategory]);
      return;
    }
    
    return message.reply(`❌ Invalid category. Use "${prefix}menu" to see available categories.`);
  },

  onReply: async function ({ message, event, Reply, args }) {
    const { author, categories } = Reply;
    if (event.senderID !== author) return;
    
    const input = args.join(" ").trim();
    const prefix = getPrefix(event.threadID);
    
    if (!isNaN(input) && parseInt(input) > 0 && parseInt(input) <= categories.length) {
      const categoryIndex = parseInt(input) - 1;
      const category = categories[categoryIndex];
      
      // Get commands for this category
      const categoryCommands = [];
      for (const [name, value] of commands) {
        if (!value?.config || typeof value.onStart !== "function") continue;
        
        const cmdCategory = value.config.category?.toLowerCase() || "uncategorized";
        if (cmdCategory === category) {
          categoryCommands.push(name);
        }
      }
      
      await showCategoryCommands(message, category, prefix, categoryCommands);
    }
  }
};

// Function to show commands in a category
async function showCategoryCommands(message, category, prefix, categoryCommands) {
  let msg = `📁  ${category.toUpperCase()}\n\n`;
  
  // Show commands in two columns
  const half = Math.ceil(categoryCommands.length / 2);
  const firstColumn = categoryCommands.slice(0, half);
  const secondColumn = categoryCommands.slice(half);
  
  for (let i = 0; i < half; i++) {
    const cmd1 = firstColumn[i] ? `${prefix}${firstColumn[i]}` : '';
    const cmd2 = secondColumn[i] ? `${prefix}${secondColumn[i]}` : '';
    
    if (cmd1 && cmd2) {
      msg += `${cmd1.padEnd(20)} ${cmd2}\n`;
    } else if (cmd1) {
      msg += `${cmd1}\n`;
    }
  }
  
  msg += `\n📊 Total: ${categoryCommands.length} commands`;
  
  await message.reply(msg);
}
