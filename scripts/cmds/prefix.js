const fs = require("fs-extra");
const moment = require("moment-timezone");
const { utils } = global;

// Premium prefix designs (random pick)
const prefixDesigns = [
  "╭✧📘✧╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰✧⏰✧╯  ᴛɪᴍᴇ: {time}\n╭✧⏳✧╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰✧👑✧╯  ᴅᴇᴠ: RaiHan",
  "⊱🌟🌐🌟⊰  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n⊱🌟🛸🌟⊰  ʏᴏᴜʀ ʙᴏx: {thread}\n⊱🌟📘🌟⊰  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n⊱🌟⏰🌟⊰  ᴛɪᴍᴇ: {time}\n⊱🌟⏳🌟⊰  ᴜᴘᴛɪᴍᴇ: {uptime}\n⊱🌟👑🌟⊰  ᴅᴇᴠ: RaiHan",
  "╭❂🌐❂╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰❂🛸❂╯  ʏᴏᴜʀ ʙᴏx: {thread}\n╭❂📘❂╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰❂⏰❂╯  ᴛɪᴍᴇ: {time}\n╭❂⏳❂╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰❂👑❂╯  ᴅᴇᴠ: RaiHan",
  "✦⊱🌐⊰✦  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n✦⊱🛸⊰✦  ʏᴏᴜʀ ʙᴏx: {thread}\n✦⊱📘⊰✦  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n✦⊱⏰⊰✦  ᴛɪᴍᴇ: {time}\n✦⊱⏳⊰✦  ᴜᴘᴛɪᴍᴇ: {uptime}\n✦⊱👑⊰✦  ᴅᴇᴠ: RaiHan",
  // --- Minimalist & Simple Brackets ---
  "╭🌐╮ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰🛸╯ ʏᴏᴜʀ ʙᴏx: {thread}\n╭📘╮ ᴄᴍɴᴅ: {thread}help\n╰⏰╯ ᴛɪᴍᴇ: {time}\n╭⏳╮ ᴜᴘᴛɪᴍᴇ: {uptime}\n╰👑╯ ᴅᴇᴠ: RaiHan",
  "《🌐》 ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n《🛸》 ʏᴏᴜʀ ʙᴏx: {thread}\n《📘》 ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n《⏰》 ᴛɪᴍᴇ: {time}\n《⏳》 ᴜᴘᴛɪᴍᴇ: {uptime}\n《👑》 ᴅᴇᴠ: RaiHan",
  "【🌐】 ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n【🛸】 ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n【📘】 ᴄᴍɴᴅ: {thread}help\n【⏰】 ᴛɪᴍᴇ: {time}\n【⏳】 ᴜᴘᴛɪᴍᴇ: {uptime}\n【👑】 ᴅᴇᴠ: RaiHan",
  "『🌐』 ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n『🛸』 ʏᴏᴜʀ ʙᴏx: {thread}\n『📘』 ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n『⏰』 ᴛɪᴍᴇ: {time}\n『⏳』 ᴜᴘᴛɪᴍᴇ: {uptime}\n『👑』 ᴅᴇᴠ: RaiHan",
  "〖🌐〗 ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n〖🛸〗 ʏᴏᴜʀ ʙᴏx: {thread}\n〖📘〗 ᴄᴍɴᴅ: {thread}help\n〖⏰〗 ᴛɪᴍᴇ: {time}\n〖⏳〗 ᴜᴘᴛɪᴍᴇ: {uptime}\n〖👑〗 ᴅᴇᴠ: RaiHan",
  "「🌐」 ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n「🛸」 ʏᴏᴜʀ ʙᴏx: {thread}\n「📘」 ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n「⏰」 ᴛɪᴍᴇ: {time}\n「⏳」 ᴜᴘᴛɪᴍᴇ: {uptime}\n「👑」 ᴅᴇᴠ: RaiHan",
  // --- Line & Arrow Styles ---
  "|🌐| ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n|🛸| ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n|📘| ᴄᴍɴᴅ: {thread}help\n|⏰| ᴛɪᴍᴇ: {time}\n|⏳| ᴜᴘᴛɪᴍᴇ: {uptime}\n|👑| ᴅᴇᴠ: RaiHan",
  "~🌐~ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n~🛸~ ʏᴏᴜʀ ʙᴏx: {thread}\n~📘~ ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n~⏰~ ᴛɪᴍᴇ: {time}\n~⏳~ ᴜᴘᴛɪᴍᴇ: {uptime}\n~👑~ ᴅᴇᴠ: RaiHan",
  ">🌐< ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n>🛸< ʏᴏᴜʀ ʙᴏx: {thread}\n>📘< ᴄᴍɴᴅ: {thread}help\n>⏰< ᴛɪᴍᴇ: {time}\n>⏳< ᴜᴘᴛɪᴍᴇ: {uptime}\n>👑< ᴅᴇᴠ: RaiHan",
  "»🌐« ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n»🛸« ʏᴏᴜʀ ʙᴏx: {thread}\n»📘« ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n»⏰« ᴛɪᴍᴇ: {time}\n»⏳« ᴜᴘᴛɪᴍᴇ: {uptime}\n»👑« ᴅᴇᴠ: RaiHan",
  "◈🌐◈ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n◈🛸◈ ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n◈📘◈ ᴄᴍɴᴅ: {thread}help\n◈⏰◈ ᴛɪᴍᴇ: {time}\n◈⏳◈ ᴜᴘᴛɪᴍᴇ: {uptime}\n◈👑◈ ᴅᴇᴠ: RaiHan",
  // --- Box-Drawing Characters ---
  "╔🌐╗ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╚🛸╝ ʏᴏᴜʀ ʙᴏx: {thread}\n╔📘╗ ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╚⏰╝ ᴛɪᴍᴇ: {time}\n╔⏳╗ ᴜᴘᴛɪᴍᴇ: {uptime}\n╚👑╝ ᴅᴇᴠ: RaiHan",
  "╭─🌐─╮ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰─🛸─╯ ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n╭─📘─╮ ᴄᴍɴᴅ: {thread}help\n╰─⏰─╯ ᴛɪᴍᴇ: {time}\n╭─⏳─╮ ᴜᴘᴛɪᴍᴇ: {uptime}\n╰─👑─╯ ᴅᴇᴠ: RaiHan",
  "╭━🌐━╮ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰━🛸━╯ ʏᴏᴜʀ ʙᴏx: {thread}\n╭━📘━╮ ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰━⏰━╯ ᴛɪᴍᴇ: {time}\n╭━⏳━╮ ᴜᴘᴛɪᴍᴇ: {uptime}\n╰━👑━╯ ᴅᴇᴠ: RaiHan",
  "╟🌐╢ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╟🛸╢ ʏᴏᴜʀ ʙᴏx: {thread}\n╟📘╢ ᴄᴍɴᴅ: {thread}help\n╟⏰╢ ᴛɪᴍᴇ: {time}\n╟⏳╢ ᴜᴘᴛɪᴍᴇ: {uptime}\n╟👑╢ ᴅᴇᴠ: RaiHan",
  "╠🌐╣ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╠🛸╣ ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n╠📘╣ ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╠⏰╣ ᴛɪᴍᴇ: {time}\n╠⏳╣ ᴜᴘᴛɪᴍᴇ: {uptime}\n╠👑╣ ᴅᴇᴠ: RaiHan",
  "╭═🌐═╮ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰═🛸═╯ ʏᴏᴜʀ ʙᴏx: {thread}\n╭═📘═╮ ᴄᴍɴᴅ: {thread}help\n╰═⏰═╯ ᴛɪᴍᴇ: {time}\n╭═⏳═╮ ᴜᴘᴛɪᴍᴇ: {uptime}\n╰═👑═╯ ᴅᴇᴠ: RaiHan",
  // --- Star & Sparkle Themes ---
  "★🌐★ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n★🛸★ ʏᴏᴜʀ ʙᴏx: {thread}\n★📘★ ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n★⏰★ ᴛɪᴍᴇ: {time}\n★⏳★ ᴜᴘᴛɪᴍᴇ: {uptime}\n★👑★ ᴅᴇᴠ: RaiHan",
  "☆🌐☆ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n☆🛸☆ ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n☆📘☆ ᴄᴍɴᴅ: {thread}help\n☆⏰☆ ᴛɪᴍᴇ: {time}\n☆⏳☆ ᴜᴘᴛɪᴍᴇ: {uptime}\n☆👑☆ ᴅᴇᴠ: RaiHan",
  "✪🌐✪ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n✪🛸✪ ʏᴏᴜʀ ʙᴏx: {thread}\n✪📘✪ ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n✪⏰✪ ᴛɪᴍᴇ: {time}\n✪⏳✪ ᴜᴘᴛɪᴍᴇ: {uptime}\n✪👑✪ ᴅᴇᴠ: RaiHan",
  "✴🌐✴ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n✴🛸✴ ʏᴏᴜʀ ʙᴏx: {thread}\n✴📘✴ ᴄᴍɴᴅ: {thread}help\n✴⏰✴ ᴛɪᴍᴇ: {time}\n✴⏳✴ ᴜᴘᴛɪᴍᴇ: {uptime}\n✴👑✴ ᴅᴇᴠ: RaiHan",
  "✵🌐✵ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n✵🛸✵ ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n✵📘✵ ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n✵⏰✵ ᴛɪᴍᴇ: {time}\n✵⏳✵ ᴜᴘᴛɪᴍᴇ: {uptime}\n✵👑✵ ᴅᴇᴠ: RaiHan",
  "✶🌐✶ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n✶🛸✶ ʏᴏᴜʀ ʙᴏx: {thread}\n✶📘✶ ᴄᴍɴᴅ: {thread}help\n✶⏰✶ ᴛɪᴍᴇ: {time}\n✶⏳✶ ᴜᴘᴛɪᴍᴇ: {uptime}\n✶👑✶ ᴅᴇᴠ: RaiHan",
  "✷🌐✷ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n✷🛸✷ ʏᴏᴜʀ ʙᴏx: {thread}\n✷📘✷ ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n✷⏰✷ ᴛɪᴍᴇ: {time}\n✷⏳✷ ᴜᴘᴛɪᴍᴇ: {uptime}\n✷👑✷ ᴅᴇᴠ: RaiHan",
  "✩🌐✩ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n✩🛸✩ ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n✩📘✩ ᴄᴍɴᴅ: {thread}help\n✩⏰✩ ᴛɪᴍᴇ: {time}\n✩⏳✩ ᴜᴘᴛɪᴍᴇ: {uptime}\n✩👑✩ ᴅᴇᴠ: RaiHan",
  "╰☆╮🌐╭☆╯ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰☆╮🛸╭☆╯ ʏᴏᴜʀ ʙᴏx: {thread}\n╰☆╮📘╭☆╯ ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰☆╮⏰╭☆╯ ᴛɪᴍᴇ: {time}\n╰☆╮⏳╭☆╯ ᴜᴘᴛɪᴍᴇ: {uptime}\n╰☆╮👑╭☆╯ ᴅᴇᴠ: RaiHan",
  // --- Geometric Shapes ---
  "●🌐● ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n●🛸● ʏᴏᴜʀ ʙᴏx: {thread}\n●📘● ᴄᴍɴᴅ: {thread}help\n●⏰● ᴛɪᴍᴇ: {time}\n●⏳● ᴜᴘᴛɪᴍᴇ: {uptime}\n●👑● �ᴅᴇᴠ: RaiHan",
  "◆🌐◆ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n◆🛸◆ ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n◆📘◆ ᴄᴍɴᴅ �ᴍᴇɴᴜ: {thread}help\n◆⏰◆ ᴛɪᴍᴇ: {time}\n◆⏳◆ ᴜᴘᴛɪᴍᴇ: {uptime}\n◆👑◆ ᴅᴇᴠ: RaiHan",
  "◇🌐◇ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n◇🛸◇ ʏᴏᴜʀ ʙᴏx: {thread}\n◇📘◇ ᴄᴍɴᴅ: {thread}help\n◇⏰◇ ᴛɪᴍᴇ: {time}\n◇⏳◇ ᴜᴘᴛɪᴍᴇ: {uptime}\n◇👑◇ ᴅᴇᴠ: RaiHan",
  "■🌐■ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n■🛸■ ʏᴏᴜʀ ʙᴏx: {thread}\n■📘■ ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n■⏰■ ᴛɪᴍᴇ: {time}\n■⏳■ ᴜᴘᴛɪᴍᴇ: {uptime}\n■👑■ ᴅᴇᴠ: RaiHan",
  "□🌐□ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n□🛸□ ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n□📘□ ᴄᴍɴᴅ: {thread}help\n□⏰□ ᴛɪᴍᴇ: {time}\n□⏳□ ᴜᴘᴛɪᴍᴇ: {uptime}\n□👑□ ᴅᴇᴠ: RaiHan",
  "▲🌐▼ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n▲🛸▼ ʏᴏᴜʀ ʙᴏx: {thread}\n▲📘▼ ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n▲⏰▼ ᴛɪᴍᴇ: {time}\n▲⏳▼ ᴜᴘᴛɪᴍᴇ: {uptime}\n▲👑▼ ᴅᴇᴠ: RaiHan",
  "►🌐◄ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n►🛸◄ ʏᴏᴜʀ ʙᴏx: {thread}\n►📘◄ ᴄᴍɴᴅ: {thread}help\n►⏰◄ ᴛɪᴍᴇ: {time}\n►⏳◄ ᴜᴘᴛɪᴍᴇ: {uptime}\n►👑◄ ᴅᴇᴠ: RaiHan",
  // --- Ornate & Unique Symbols ---
  "⚜🌐⚜ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n⚜🛸⚜ ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n⚜📘⚜ ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n⚜⏰⚜ ᴛɪᴍᴇ: {time}\n⚜⏳⚜ ᴜᴘᴛɪᴍᴇ: {uptime}\n⚜👑⚜ ᴅᴇᴠ: RaiHan",
  "❀🌐❀ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n❀🛸❀ ʏᴏᴜʀ ʙᴏx: {thread}\n❀📘❀ ᴄᴍɴᴅ: {thread}help\n❀⏰❀ ᴛɪᴍᴇ: {time}\n❀⏳❀ ᴜᴘᴛɪᴍᴇ: {uptime}\n❀👑❀ ᴅᴇᴠ: RaiHan",
  "※🌐※ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n※🛸※ ʏᴏᴜʀ ʙᴏx: {thread}\n※📘※ ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n※⏰※ ᴛɪᴍᴇ: {time}\n※⏳※ ᴜᴘᴛɪᴍᴇ: {uptime}\n※👑※ ᴅᴇᴠ: RaiHan",
  "☀🌐☀ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n☀🛸☀ ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n☀📘☀ ᴄᴍɴᴅ: {thread}help\n☀⏰☀ ᴛɪᴍᴇ: {time}\n☀⏳☀ ᴜᴘᴛɪᴍᴇ: {uptime}\n☀👑☀ ᴅᴇᴠ: RaiHan",
  "☾🌐☽ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n☾🛸☽ ʏᴏᴜʀ ʙᴏx: {thread}\n☾📘☽ ᴄᴍɴᴅ �ᴍᴇɴᴜ: {thread}help\n☾⏰☽ ᴛɪᴍᴇ: {time}\n☾⏳☽ ᴜᴘᴛɪᴍᴇ: {uptime}\n☾👑☽ ᴅᴇᴠ: RaiHan",
  "♡🌐♡ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n♡🛸♡ ʏᴏᴜʀ ʙᴏx: {thread}\n♡📘♡ ᴄᴍɴᴅ: {thread}help\n♡⏰♡ ᴛɪᴍᴇ: {time}\n♡⏳♡ ᴜᴘᴛɪᴍᴇ: {uptime}\n♡👑♡ ᴅᴇᴠ: RaiHan",
  "♧🌐♧ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n♧🛸♧ ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n♧📘♧ ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n♧⏰♧ ᴛɪᴍᴇ: {time}\n♧⏳♧ ᴜᴘᴛɪᴍᴇ: {uptime}\n♧👑♧ ᴅᴇᴠ: RaiHan",
  "✿🌐✿ ɢʟᴏʙᴀʟ �ᴘʀᴇꜰɪx: {global}\n✿🛸✿ ʏᴏᴜʀ ʙᴏx: {thread}\n✿📘✿ ᴄᴍɴᴅ: {thread}help\n✿⏰✿ ᴛɪᴍᴇ: {time}\n✿⏳✿ ᴜᴘᴛɪᴍᴇ: {uptime}\n✿👑✿ ᴅᴇᴠ: RaiHan",
  "╭⊶🌐⊷╮ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰⊶🛸⊷╯ ʏᴏᴜʀ ʙᴏx: {thread}\n╭⊶📘⊷╮ ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰⊶⏰⊷╯ ᴛɪᴍᴇ: {time}\n╭⊶⏳⊷╮ ᴜᴘᴛɪᴍᴇ: {uptime}\n╰⊶👑⊷╯ ᴅᴇᴠ: RaiHan",
  "╭☘🌐☘╮ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰☘🛸☘╯ ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n╭☘📘☘╮ ᴄᴍɴᴅ: {thread}help\n╰☘⏰☘╯ ᴛɪᴍᴇ: {time}\n╭☘⏳☘╮ ᴜᴘᴛɪᴍᴇ: {uptime}\n╰☘👑☘╯ ᴅᴇᴠ: RaiHan",
  // --- Combined & Complex Styles ---
  "╭<🌐>╮ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰<🛸>╯ ʏᴏᴜʀ ʙᴏx: {thread}\n╭<📘>╮ ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰<⏰>╯ ᴛɪᴍᴇ: {time}\n╭<⏳>╯ ᴜᴘᴛɪᴍᴇ: {uptime}\n╰<👑>╯ ᴅᴇᴠ: RaiHan",
  "╭【🌐】╮ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰【🛸】╯ ʏᴏᴜʀ ʙᴏx: {thread}\n╭【📘】╮ ᴄᴍɴᴅ: {thread}help\n╰【⏰】╯ ᴛɪᴍᴇ: {time}\n╭【⏳】╯ �ᴜᴘᴛɪᴍᴇ: {uptime}\n╰【👑】╯ ᴅᴇᴠ: RaiHan",
  "〖✦🌐✦〗 ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n〖✦🛸✦〗 ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n〖✦📘✦〗 ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n〖✦⏰✦〗 ᴛɪᴍᴇ: {time}\n〖✦⏳✦〗 ᴜᴘᴛɪᴍᴇ: {uptime}\n〖✦👑✦〗 ᴅᴇᴠ: RaiHan",
  "《-•🌐•-》 ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n《-•🛸•-》 ʏᴏᴜʀ ʙᴏx: {thread}\n《-•📘•-》 ᴄᴍɴᴅ: {thread}help\n《-•⏰•-》 ᴛɪᴍᴇ: {time}\n《-•⏳•-》 ᴜᴘᴛɪᴍᴇ: {uptime}\n《-•👑•-》 ᴅᴇᴠ: RaiHan",
  "-ˋˏ🌐ˎˊ- ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n-ˋˏ🛸ˎˊ- ʏᴏᴜʀ ʙᴏx: {thread}\n-ˋˏ📘ˎˊ- ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n-ˋˏ⏰ˎˊ- ᴛɪᴍᴇ: {time}\n-ˋˏ⏳ˎˊ- ᴜᴘᴛɪᴍᴇ: {uptime}\n-ˋˏ👑ˎˊ- ᴅᴇᴠ: RaiHan",
  "[❖🌐❖] ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n[❖🛸❖] ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n[❖📘❖] ᴄᴍɴᴅ: {thread}help\n[❖⏰❖] ᴛɪᴍᴇ: {time}\n[❖⏳❖] ᴜᴘᴛɪᴍᴇ: {uptime}\n[❖👑❖] ᴅᴇᴠ: RaiHan",
  "╭¤🌐¤╮ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰¤🛸¤╯ ʏᴏᴜʀ ʙᴏx: {thread}\n╭¤📘¤╮ ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰¤⏰¤╯ ᴛɪᴍᴇ: {time}\n╭¤⏳¤╮ ᴜᴘᴛɪᴍᴇ: {uptime}\n╰¤👑¤╯ ᴅᴇᴠ: RaiHan",
  "╭/🌐\\╮ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰/🛸\\╯ ʏᴏᴜʀ ʙᴏx: {thread}\n╭/📘\\╮ ᴄᴍɴᴅ: {thread}help\n╰/⏰\\╯ ᴛɪᴍᴇ: {time}\n╭/⏳\\╮ ᴜᴘᴛɪᴍᴇ: {uptime}\n╰/👑\\╯ ᴅᴇᴠ: RaiHan",
  "【•~🌐~•】 ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n【•~🛸~•】 ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n【•~📘~•】 ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n【•~⏰~•】 ᴛɪᴍᴇ: {time}\n【•~⏳~•】 ᴜᴘᴛɪᴍᴇ: {uptime}\n【•~👑~•】 ᴅᴇᴠ: RaiHan",
  "╭▷🌐◁╮ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰▷🛸◁╯ ʏᴏᴜʀ ʙᴏx: {thread}\n╭▷📘◁╮ ᴄᴍɴᴅ: {thread}help\n╰▷⏰◁╯ ᴛɪᴍᴇ: {time}\n╭▷⏳◁╯ ᴜᴘᴛɪᴍᴇ: {uptime}\n╰▷👑◁╯ ᴅᴇᴠ: RaiHan",
  "⊰∙∘🌐∘∙⊱ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n⊰∙∘🛸∘∙⊱ ʏᴏᴜʀ ʙᴏx: {thread}\n⊰∙∘📘∘∙⊱ ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n⊰∙∘⏰∘∙⊱ ᴛɪᴍᴇ: {time}\n⊰∙∘⏳∘∙⊱ ᴜᴘᴛɪᴍᴇ: {uptime}\n⊰∙∘👑∘∙⊱ ᴅᴇᴠ: RaiHan",
  "╭─͙─͙🌐─͙─͙╮ ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰─͙─͙🛸─͙─͙╯ ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n╭─͙─͙📘─͙─͙╮ ᴄᴍɴᴅ: {thread}help\n╰─͙─͙⏰─͙─͙╯ ᴛɪᴍᴇ: {time}\n╭─͙─͙⏳─͙─͙╮ ᴜᴘᴛɪᴍᴇ: {uptime}\n╰─͙─͙👑─͙─͙╯ ᴅᴇᴠ: RaiHan"
  // Add more as needed, make sure each entry is a properly closed string
];

module.exports = {
  config: {
    name: "prefix",
    version: "1.5",
    author: "Raihan",
    countDown: 5,
    role: 0,
    description: "Change the bot prefix in your chat box or globally (admin only)",
    category: "⚙️ Configuration",
    guide: {
      en:
        "┌─『 Prefix Settings 』─┐\n" +
        "│ 🔹 {pn} <prefix>\n" +
        "│     Set prefix for this chat\n" +
        "│     Example: {pn} $\n" +
        "│ 🔹 {pn} <prefix> -g\n" +
        "│     Set global prefix (Admin only)\n" +
        "│     Example: {pn} $ -g\n" +
        "│ ♻️ {pn} reset\n" +
        "│     Reset to default prefix\n" +
        "└──────────────────────┘"
    }
  },

  langs: {
    en: {
      reset: "✅ Prefix reset to default: %1",
      onlyAdmin: "⛔ Only bot admins can change global prefix!",
      confirmGlobal: "⚙️ React to confirm global prefix update.",
      confirmThisThread: "⚙️ React to confirm this chat's prefix update.",
      successGlobal: "✅ Global prefix updated: %1",
      successThisThread: "✅ Chat prefix updated: %1"
    }
  },

  onStart: async function({ message, role, args, commandName, event, threadsData, getLang }) {
    if (!args[0]) return message.SyntaxError();

    if (args[0] === "reset") {
      await threadsData.set(event.threadID, null, "data.prefix");
      return message.reply(getLang("reset", global.GoatBot.config.prefix));
    }

    const newPrefix = args[0];
    const setGlobal = args[1] === "-g";

    if (setGlobal && role < 2) {
      return message.reply(getLang("onlyAdmin"));
    }

    const confirmMessage = setGlobal ? getLang("confirmGlobal") : getLang("confirmThisThread");
    return message.reply(confirmMessage, (err, info) => {
      global.GoatBot.onReaction.set(info.messageID, {
        author: event.senderID,
        newPrefix,
        setGlobal,
        commandName
      });
    });
  },

  onReaction: async function({ message, threadsData, event, Reaction, getLang }) {
    const { author, newPrefix, setGlobal } = Reaction;
    if (event.userID !== author) return;

    if (setGlobal) {
      global.GoatBot.config.prefix = newPrefix;
      fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
      return message.reply(getLang("successGlobal", newPrefix));
    }

    await threadsData.set(event.threadID, newPrefix, "data.prefix");
    return message.reply(getLang("successThisThread", newPrefix));
  },

  onChat: async function({ event, message, threadsData }) {
    // Only respond to "prefix" message exactly
    if (event.body && event.body.toLowerCase().trim() === "prefix") {
      const globalPrefix = global.GoatBot.config.prefix;
      const threadPrefix = await threadsData.get(event.threadID, "data.prefix") || globalPrefix;

      const currentTime = moment().tz("Asia/Dhaka").format("hh:mm A");
      const uptimeMs = process.uptime() * 1000;

      const formatUptime = (ms) => {
        const sec = Math.floor(ms / 1000) % 60;
        const min = Math.floor(ms / 60000) % 60;
        const hr = Math.floor(ms / 3600000);
        return `${hr}h ${min}m ${sec}s`;
      };

      const uptime = formatUptime(uptimeMs);

      // Random pick premium design
      const randomDesign = prefixDesigns[Math.floor(Math.random() * prefixDesigns.length)]
        .replace(/{global}/g, globalPrefix)
        .replace(/{thread}/g, threadPrefix)
        .replace(/{time}/g, currentTime)
        .replace(/{uptime}/g, uptime);

      return message.reply(randomDesign);
    }
  }
};
