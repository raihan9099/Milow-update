const fs = require("fs-extra");
const moment = require("moment-timezone");
const { utils } = global;

// Premium prefix designs (random pick)
const prefixDesigns = ["╭✧📘✧╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰✧⏰✧╯  ᴛɪᴍᴇ: {time}\n╭✧⏳✧╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰✧👑✧╯  ᴅᴇᴠ: RaiHan",
"⊱🌟🌐🌟⊰  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n⊱🌟🛸🌟⊰  ʏᴏᴜʀ ʙᴏx: {thread}\n⊱🌟📘🌟⊰  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n⊱🌟⏰🌟⊰  ᴛɪᴍᴇ: {time}\n⊱🌟⏳🌟⊰  ᴜᴘᴛɪᴍᴇ: {uptime}\n⊱🌟👑🌟⊰  ᴅᴇᴠ: RaiHan",
"╭❂🌐❂╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰❂🛸❂╯  ʏᴏᴜʀ ʙᴏx: {thread}\n╭❂📘❂╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰❂⏰❂╯  ᴛɪᴍᴇ: {time}\n╭❂⏳❂╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰❂👑❂╯  ᴅᴇᴠ: RaiHan",
"✦⊱🌐⊰✦  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n✦⊱🛸⊰✦  ʏᴏᴜʀ ʙᴏx: {thread}\n✦⊱📘⊰✦  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n✦⊱⏰⊰✦  ᴛɪᴍᴇ: {time}\n✦⊱⏳⊰✦  ᴜᴘᴛɪᴍᴇ: {uptime}\n✦⊱👑⊰✦  ᴅᴇᴠ: RaiHan",
"╭✹🌐✹╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰✹🛸✹╯  ʏᴏᴜʀ ʙᴏx: {thread}\n╭✹📘✹╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰✹⏰✹╯  ᴛɪᴍᴇ: {time}\n╭✹⏳✹╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰✹👑✹╯  ᴅᴇᴠ: RaiHan",
"⊱❖🌐❖⊰  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n⊱❖🛸❖⊰  ʏᴏᴜʀ ʙᴏx: {thread}\n⊱❖📘❖⊰  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n⊱❖⏰❖⊰  ᴛɪᴍᴇ: {time}\n⊱❖⏳❖⊰  ᴜᴘᴛɪᴍᴇ: {uptime}\n⊱❖👑❖⊰  ᴅᴇᴠ: RaiHan",
"╭✪🌐✪╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰✪🛸✪╯  ʏᴏᴜʀ ʙᴏx: {thread}\n╭✪📘✪╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰✪⏰✪╯  ᴛɪᴍᴇ: {time}\n╭✪⏳✪╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰✪👑✪╯  ᴅᴇᴠ: RaiHan",
"⊹✦🌐✦⊹  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n⊹✦🛸✦⊹  ʏᴏᴜʀ ʙᴏx: {thread}\n⊹✦📘✦⊹  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n⊹✦⏰✦⊹  ᴛɪᴍᴇ: {time}\n⊹✦⏳✦⊹  ᴜᴘᴛɪᴍᴇ: {uptime}\n⊹✦👑✦⊹  ᴅᴇᴠ: RaiHan",
"╭✰🌐✰╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰✰🛸✰╯  ʏᴏᴜʀ ʙᴏx: {thread}\n╭✰📘✰╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰✰⏰✰╯  ᴛɪᴍᴇ: {time}\n╭✰⏳✰╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰✰👑✰╯  ᴅᴇᴠ: RaiHan",
"⊱✹🌐✹⊰  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n⊱✹🛸✹⊰  ʏᴏᴜʀ ʙᴏx: {thread}\n⊱✹📘✹⊰  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n⊱✹⏰✹⊰  ᴛɪᴍᴇ: {time}\n⊱✹⏳✹⊰  ᴜᴘᴛɪᴍᴇ: {uptime}\n⊱✹👑✹⊰  ᴅᴇᴠ: RaiHan",
"╭❂✦🌐✦❂╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰❂✦🛸✦❂╯  ʏᴏᴜʀ ʙᴏx: {thread}\n╭❂✦📘✦❂╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰❂✦⏰✦❂╯  ᴛɪᴍᴇ: {time}\n╭❂✦⏳✦❂╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰❂✦👑✦❂╯  ᴅᴇᴠ: RaiHan",
"⊱✪🌐✪⊰  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n⊱✪🛸✪⊰  ʏᴏᴜʀ ʙᴏx: {thread}\n⊱✪📘✪⊰  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n⊱✪⏰✪⊰  ᴛɪᴍᴇ: {time}\n⊱✪⏳✪⊰  ᴜᴘᴛɪᴍᴇ: {uptime}\n⊱✪👑✪⊰  ᴅᴇᴠ: RaiHan",
"╭⊹✰🌐✰⊹╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰⊹✰🛸✰⊹╯  ʏᴏᴜʀ ʙᴏx: {thread}\n╭⊹✰📘✰⊹╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰⊹✰⏰✰⊹╯  ᴛɪᴍᴇ: {time}\n╭⊹✰⏳✰⊹╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰⊹✰👑✰⊹╯  ᴅᴇᴠ: RaiHan",
"⊱✹❖🌐❖✹⊰  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n⊱✹❖🛸❖✹⊰  ʏᴏᴜʀ ʙᴏx: {thread}\n⊱✹❖📘❖✹⊰  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n⊱✹❖⏰❖✹⊰  ᴛɪᴍᴇ: {time}\n⊱✹❖⏳❖✹⊰  ᴜᴘᴛɪᴍᴇ: {uptime}\n⊱✹❖👑❖✹⊰  ᴅᴇᴠ: RaiHan",
"╭✧✦🌐✦✧╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰✧✦🛸✦✧╯  ʏᴏᴜʀ ʙᴏx: {thread}\n╭✧✦📘✦✧╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰✧✦⏰✦✧╯  ᴛɪᴍᴇ: {time}\n╭✧✦⏳✦✧╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰✧✦👑✦✧╯  ᴅᴇᴠ: RaiHan"
,"╭🌐╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰🛸╯  ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n╭📘╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰⏰╯  ᴛɪᴍᴇ: {time}\n╭⏳╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰👑╯  ᴅᴇᴠ: RaiHan",
"⊱🌐⊰  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n⊱🛸⊰  ʏᴏᴜʀ ʙᴏx: {thread}\n⊱📘⊰  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n⊱⏰⊰  ᴛɪᴍᴇ: {time}\n⊱⏳⊰  ᴜᴘᴛɪᴍᴇ: {uptime}\n⊱👑⊰  ᴅᴇᴠ: RaiHan",
"╭✦🌐✦╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰✦🛸✦╯  ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n╭✦📘✦╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰✦⏰✦╯  ᴛɪᴍᴇ: {time}\n╭✦⏳✦╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰✦👑✦╯  ᴅᴇᴠ: RaiHan",
"➤🌐➤  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n➤🛸➤  ʏᴏᴜʀ ʙᴏx: {thread}\n➤📘➤  ᴄᴍɴᴅ: {thread}help\n➤⏰➤  ᴛɪᴍᴇ: {time}\n➤⏳➤  ᴜᴘᴛɪᴍᴇ: {uptime}\n➤👑➤  ᴅᴇᴠ: RaiHan",
"╭⊹🌐⊹╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰⊹🛸⊹╯  ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n╭⊹📘⊹╮  ᴄᴍɴᴅ: {thread}help\n╰⊹⏰⊹╯  ᴛɪᴍᴇ: {time}\n╭⊹⏳⊹╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰⊹👑⊹╯  ᴅᴇᴠ: RaiHan",
"⊱✧🌐✧⊰  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n⊱✧🛸✧⊰  ʏᴏᴜʀ ʙᴏx: {thread}\n⊱✧📘✧⊰  ᴄᴍɴᴅ: {thread}help\n⊱✧⏰✧⊰  ᴛɪᴍᴇ: {time}\n⊱✧⏳✧⊰  ᴜᴘᴛɪᴍᴇ: {uptime}\n⊱✧👑✧⊰  ᴅᴇᴠ: RaiHan",
"╭❖🌐❖╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰❖🛸❖╯  ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n╭❖📘❖╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰❖⏰❖╯  ᴛɪᴍᴇ: {time}\n╭❖⏳❖╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰❖👑❖╯  ᴅᴇᴠ: RaiHan",
"✦╭🌐╮✦  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n✦╰🛸╯✦  ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n✦╭📘╮✦  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n✦╰⏰╯✦  ᴛɪᴍᴇ: {time}\n✦╭⏳╮✦  ᴜᴘᴛɪᴍᴇ: {uptime}\n✦╰👑╯✦  ᴅᴇᴠ: RaiHan",
"➤⊱🌐⊰➤  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n➤⊱🛸⊰➤  ʏᴏᴜʀ ʙᴏx: {thread}\n➤⊱📘⊰➤  ᴄᴍɴᴅ: {thread}help\n➤⊱⏰⊰➤  ᴛɪᴍᴇ: {time}\n➤⊱⏳⊰➤  ᴜᴘᴛɪᴍᴇ: {uptime}\n➤⊱👑⊰➤  ᴅᴇᴠ: RaiHan",
"╭⟡🌐⟡╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰⟡🛸⟡╯  ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n╭⟡📘⟡╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰⟡⏰⟡╯  ᴛɪᴍᴇ: {time}\n╭⟡⏳⟡╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰⟡👑⟡╯  ᴅᴇᴠ: RaiHan",
"⊹╭🌐╮⊹  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n⊹╰🛸╯⊹  ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n⊹╭📘╮⊹  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n⊹╰⏰╯⊹  ᴛɪᴍᴇ: {time}\n⊹╭⏳╮⊹  ᴜᴘᴛɪᴍᴇ: {uptime}\n⊹╰👑╯⊹  ᴅᴇᴠ: RaiHan",
"╭✧🌐✧╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰✧🛸✧╯  ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\
`╭🌐╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰🛸╯  ʏᴏᴜʀ ʙᴏx ᴄʜᴀᴛ: {thread}\n╭📘╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰⏰╯  ᴛɪᴍᴇ: {time}\n╭⏳╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰👑╯  ᴅᴇᴠ: RaiHan`,
`⊱🌟🌐🌟⊰  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n⊱🌟🛸🌟⊰  ʏᴏᴜʀ ʙᴏx: {thread}\n⊱🌟📘🌟⊰  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n⊱🌟⏰🌟⊰  ᴛɪᴍᴇ: {time}\n⊱🌟⏳🌟⊰  ᴜᴘᴛɪᴍᴇ: {uptime}\n⊱🌟👑🌟⊰  ᴅᴇᴠ: RaiHan`,
`╭✦","╭✧📘✧╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰✧⏰✧╯  ᴛɪᴍᴇ: {time}\n╭✧⏳✧╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰✧👑✧╯  ᴅᴇᴠ: RaiHan",
"⊱🌟🌐🌟⊰  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n⊱🌟🛸🌟⊰  ʏᴏᴜʀ ʙᴏx: {thread}\n⊱🌟📘🌟⊰  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n⊱🌟⏰🌟⊰  ᴛɪᴍᴇ: {time}\n⊱🌟⏳🌟⊰  ᴜᴘᴛɪᴍᴇ: {uptime}\n⊱🌟👑🌟⊰  ᴅᴇᴠ: RaiHan",
"╭❂🌐❂╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰❂🛸❂╯  ʏᴏᴜʀ ʙᴏx: {thread}\n╭❂📘❂╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰❂⏰❂╯  ᴛɪᴍᴇ: {time}\n╭❂⏳❂╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰❂👑❂╯  ᴅᴇᴠ: RaiHan",
"✦⊱🌐⊰✦  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n✦⊱🛸⊰✦  ʏᴏᴜʀ ʙᴏx: {thread}\n✦⊱📘⊰✦  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n✦⊱⏰⊰✦  ᴛɪᴍᴇ: {time}\n✦⊱⏳⊰✦  ᴜᴘᴛɪᴍᴇ: {uptime}\n✦⊱👑⊰✦  ᴅᴇᴠ: RaiHan",
"╭✹🌐✹╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰✹🛸✹╯  ʏᴏᴜʀ ʙᴏx: {thread}\n╭✹📘✹╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰✹⏰✹╯  ᴛɪᴍᴇ: {time}\n╭✹⏳✹╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰✹👑✹╯  ᴅᴇᴠ: RaiHan",
"⊱❖🌐❖⊰  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n⊱❖🛸❖⊰  ʏᴏᴜʀ ʙᴏx: {thread}\n⊱❖📘❖⊰  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n⊱❖⏰❖⊰  ᴛɪᴍᴇ: {time}\n⊱❖⏳❖⊰  ᴜᴘᴛɪᴍᴇ: {uptime}\n⊱❖👑❖⊰  ᴅᴇᴠ: RaiHan",
"╭✪🌐✪╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰✪🛸✪╯  ʏᴏᴜʀ ʙᴏx: {thread}\n╭✪📘✪╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰✪⏰✪╯  ᴛɪᴍᴇ: {time}\n╭✪⏳✪╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰✪👑✪╯  ᴅᴇᴠ: RaiHan",
"⊹✦🌐✦⊹  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n⊹✦🛸✦⊹  ʏᴏᴜʀ ʙᴏx: {thread}\n⊹✦📘✦⊹  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n⊹✦⏰✦⊹  ᴛɪᴍᴇ: {time}\n⊹✦⏳✦⊹  ᴜᴘᴛɪᴍᴇ: {uptime}\n⊹✦👑✦⊹  ᴅᴇᴠ: RaiHan",
"╭✰🌐✰╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰✰🛸✰╯  ʏᴏᴜʀ ʙᴏx: {thread}\n╭✰📘✰╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰✰⏰✰╯  ᴛɪᴍᴇ: {time}\n╭✰⏳✰╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰✰👑✰╯  ᴅᴇᴠ: RaiHan",
"⊱✹🌐✹⊰  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n⊱✹🛸✹⊰  ʏᴏᴜʀ ʙᴏx: {thread}\n⊱✹📘✹⊰  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n⊱✹⏰✹⊰  ᴛɪᴍᴇ: {time}\n⊱✹⏳✹⊰  ᴜᴘᴛɪᴍᴇ: {uptime}\n⊱✹👑✹⊰  ᴅᴇᴠ: RaiHan",
"╭❂✦🌐✦❂╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰❂✦🛸✦❂╯  ʏᴏᴜʀ ʙᴏx: {thread}\n╭❂✦📘✦❂╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰❂✦⏰✦❂╯  ᴛɪᴍᴇ: {time}\n╭❂✦⏳✦❂╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰❂✦👑✦❂╯  ᴅᴇᴠ: RaiHan",
"⊱✪🌐✪⊰  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n⊱✪🛸✪⊰  ʏᴏᴜʀ ʙᴏx: {thread}\n⊱✪📘✪⊰  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n⊱✪⏰✪⊰  ᴛɪᴍᴇ: {time}\n⊱✪⏳✪⊰  ᴜᴘᴛɪᴍᴇ: {uptime}\n⊱✪👑✪⊰  ᴅᴇᴠ: RaiHan",
"╭⊹✰🌐✰⊹╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰⊹✰🛸✰⊹╯  ʏᴏᴜʀ ʙᴏx: {thread}\n╭⊹✰📘✰⊹╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰⊹✰⏰✰⊹╯  ᴛɪᴍᴇ: {time}\n╭⊹✰⏳✰⊹╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰⊹✰👑✰⊹╯  ᴅᴇᴠ: RaiHan",
"⊱✹❖🌐❖✹⊰  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n⊱✹❖🛸❖✹⊰  ʏᴏᴜʀ ʙᴏx: {thread}\n⊱✹❖📘❖✹⊰  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n⊱✹❖⏰❖✹⊰  ᴛɪᴍᴇ: {time}\n⊱✹❖⏳❖✹⊰  ᴜᴘᴛɪᴍᴇ: {uptime}\n⊱✹❖👑❖✹⊰  ᴅᴇᴠ: RaiHan",
"╭✧✦🌐✦✧╮  ɢʟᴏʙᴀʟ ᴘʀᴇꜰɪx: {global}\n╰✧✦🛸✦✧╯  ʏᴏᴜʀ ʙᴏx: {thread}\n╭✧✦📘✦✧╮  ᴄᴍɴᴅ ᴍᴇɴᴜ: {thread}help\n╰✧✦⏰✦✧╯  ᴛɪᴍᴇ: {time}\n╭✧✦⏳✦✧╮  ᴜᴘᴛɪᴍᴇ: {uptime}\n╰✧✦👑✦✧╯  ᴅᴇᴠ: RaiHan"
]
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
    const globalPrefix = global.GoatBot.config.prefix;
    const threadPrefix = await threadsData.get(event.threadID, "data.prefix") || globalPrefix;

    if (event.body && event.body.toLowerCase() === "prefix") {
      const currentTime = moment().tz("Asia/Dhaka").format("hh:mm A");
      const uptimeMs = process.uptime() * 1000;

      function formatUptime(ms) {
        const sec = Math.floor(ms / 1000) % 60;
        const min = Math.floor(ms / 60000) % 60;
        const hr = Math.floor(ms / 3600000);
        return `${hr}h ${min}m ${sec}s`;
      }

      const uptime = formatUptime(uptimeMs);

      // Random pick premium design
      const randomDesign = prefixDesigns[Math.floor(Math.random() * prefixDesigns.length)]
        .replace("{global}", globalPrefix)
        .replace("{thread}", threadPrefix)
        .replace("{time}", currentTime)
        .replace("{uptime}", uptime);

      return message.reply(randomDesign);
    }
  }
};
