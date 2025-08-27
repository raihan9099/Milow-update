module.exports = {
    config: {
        name: "autoreact",
		      version: "1.0",
	       	author: "Loid Butter",
		      countDown: 5,
	       	role: 0,
		      shortDescription: "",
	       	longDescription: "",
		       category: "dont know ",
    },
	onStart: async function (){},
	onChat: async function ({ event ,api}) {
		// Love & Affection
if (event.body.toLowerCase().indexOf("iloveyou") !== -1) return api.setMessageReaction("😙", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("i love you") !== -1) return api.setMessageReaction("💕", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("love you") !== -1) return api.setMessageReaction("💖", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("mahal") !== -1) return api.setMessageReaction("💗", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("mahal kita") !== -1) return api.setMessageReaction("💝", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("mwa") !== -1) return api.setMessageReaction("💗", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("muah") !== -1) return api.setMessageReaction("😘", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("kiss") !== -1) return api.setMessageReaction("💋", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("halik") !== -1) return api.setMessageReaction("💋", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("i miss you") !== -1) return api.setMessageReaction("💗", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("miss you") !== -1) return api.setMessageReaction("💙", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("miss na kita") !== -1) return api.setMessageReaction("💜", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("namiss") !== -1) return api.setMessageReaction("💛", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("crush") !== -1) return api.setMessageReaction("😍", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("baby") !== -1) return api.setMessageReaction("👶", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("honey") !== -1) return api.setMessageReaction("🍯", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("sweetheart") !== -1) return api.setMessageReaction("💕", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("darling") !== -1) return api.setMessageReaction("💖", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("babe") !== -1) return api.setMessageReaction("😘", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("hubby") !== -1) return api.setMessageReaction("👨", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("wifey") !== -1) return api.setMessageReaction("👩", event.messageID, event.threadID)

// Greetings - Morning
if (event.body.toLowerCase().indexOf("good morning") !== -1) return api.setMessageReaction("💗", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("morning") !== -1) return api.setMessageReaction("🌅", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("magandang umaga") !== -1) return api.setMessageReaction("☀️", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("gm") !== -1) return api.setMessageReaction("🌄", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("buenos dias") !== -1) return api.setMessageReaction("🌞", event.messageID, event.threadID)

// Greetings - Afternoon
if (event.body.toLowerCase().indexOf("good afternoon") !== -1) return api.setMessageReaction("❤", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("afternoon") !== -1) return api.setMessageReaction("🌤️", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("magandang hapon") !== -1) return api.setMessageReaction("🌇", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("ga") !== -1) return api.setMessageReaction("🌆", event.messageID, event.threadID)

// Greetings - Evening
if (event.body.toLowerCase().indexOf("good evening") !== -1) return api.setMessageReaction("❤", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("evening") !== -1) return api.setMessageReaction("🌙", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("magandang gabi") !== -1) return api.setMessageReaction("🌃", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("ge") !== -1) return api.setMessageReaction("🌉", event.messageID, event.threadID)

// Greetings - Night
if (event.body.toLowerCase().indexOf("good night") !== -1) return api.setMessageReaction("💗", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("goodnight") !== -1) return api.setMessageReaction("🌙", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("gn") !== -1) return api.setMessageReaction("😴", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("night") !== -1) return api.setMessageReaction("🌛", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("tulog na") !== -1) return api.setMessageReaction("💤", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("sleep tight") !== -1) return api.setMessageReaction("😪", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("sweet dreams") !== -1) return api.setMessageReaction("💭", event.messageID, event.threadID)

// Basic Greetings
if (event.body.toLowerCase().indexOf("hi") !== -1) return api.setMessageReaction("💗", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("hello") !== -1) return api.setMessageReaction("💗", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("hey") !== -1) return api.setMessageReaction("👋", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("hola") !== -1) return api.setMessageReaction("🤗", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("kumusta") !== -1) return api.setMessageReaction("😊", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("kamusta") !== -1) return api.setMessageReaction("😄", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("how are you") !== -1) return api.setMessageReaction("🤔", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("wassup") !== -1) return api.setMessageReaction("😎", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("what's up") !== -1) return api.setMessageReaction("🤙", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("sup") !== -1) return api.setMessageReaction("😏", event.messageID, event.threadID)

// Positive Emotions
if (event.body.toLowerCase().indexOf("happy") !== -1) return api.setMessageReaction("😊", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("joy") !== -1) return api.setMessageReaction("😄", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("excited") !== -1) return api.setMessageReaction("🤩", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("amazing") !== -1) return api.setMessageReaction("🤩", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("awesome") !== -1) return api.setMessageReaction("😎", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("great") !== -1) return api.setMessageReaction("👍", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("fantastic") !== -1) return api.setMessageReaction("🌟", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("wonderful") !== -1) return api.setMessageReaction("✨", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("perfect") !== -1) return api.setMessageReaction("💯", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("excellent") !== -1) return api.setMessageReaction("👌", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("brilliant") !== -1) return api.setMessageReaction("💡", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("outstanding") !== -1) return api.setMessageReaction("🏆", event.messageID, event.threadID)

// Sad Emotions
if (event.body.toLowerCase().indexOf("sad") !== -1) return api.setMessageReaction("😔", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("cry") !== -1) return api.setMessageReaction("😭", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("crying") !== -1) return api.setMessageReaction("😢", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("tears") !== -1) return api.setMessageReaction("💧", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("depressed") !== -1) return api.setMessageReaction("😞", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("lonely") !== -1) return api.setMessageReaction("😔", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("heartbroken") !== -1) return api.setMessageReaction("💔", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("broken") !== -1) return api.setMessageReaction("💔", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("hurt") !== -1) return api.setMessageReaction("😣", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("pain") !== -1) return api.setMessageReaction("😖", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("malungkot") !== -1) return api.setMessageReaction("😢", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("iyak") !== -1) return api.setMessageReaction("😭", event.messageID, event.threadID)

// Anger & Frustration
if (event.body.toLowerCase().indexOf("tangina") !== -1) return api.setMessageReaction("😡", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("gago") !== -1) return api.setMessageReaction("😡", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("pakyo") !== -1) return api.setMessageReaction("😠", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("pakyu") !== -1) return api.setMessageReaction("🤬", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("fuck you") !== -1) return api.setMessageReaction("🤬", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("fuck") !== -1) return api.setMessageReaction("😤", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("shit") !== -1) return api.setMessageReaction("💩", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("damn") !== -1) return api.setMessageReaction("😠", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("angry") !== -1) return api.setMessageReaction("😡", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("mad") !== -1) return api.setMessageReaction("😠", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("furious") !== -1) return api.setMessageReaction("🤬", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("annoyed") !== -1) return api.setMessageReaction("😒", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("irritated") !== -1) return api.setMessageReaction("😤", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("pissed") !== -1) return api.setMessageReaction("😡", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("galit") !== -1) return api.setMessageReaction("😠", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("inis") !== -1) return api.setMessageReaction("😒", event.messageID, event.threadID)

// Insults & Negative
if (event.body.toLowerCase().indexOf("pangit") !== -1) return api.setMessageReaction("😠", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("ugly") !== -1) return api.setMessageReaction("😤", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("stupid") !== -1) return api.setMessageReaction("🙄", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("tanga") !== -1) return api.setMessageReaction("🤦", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("bobo") !== -1) return api.setMessageReaction("🤦‍♂️", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("idiot") !== -1) return api.setMessageReaction("🙄", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("dumb") !== -1) return api.setMessageReaction("🤦‍♀️", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("loser") !== -1) return api.setMessageReaction("😒", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("useless") !== -1) return api.setMessageReaction("😓", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("worthless") !== -1) return api.setMessageReaction("😞", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("i hate you") !== -1) return api.setMessageReaction("😞", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("hate") !== -1) return api.setMessageReaction("💔", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("ayoko") !== -1) return api.setMessageReaction("😤", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("kadiri") !== -1) return api.setMessageReaction("🤢", event.messageID, event.threadID)

// Inappropriate/Adult Content
if (event.body.toLowerCase().indexOf("bastos") !== -1) return api.setMessageReaction("😳", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("bas2s") !== -1) return api.setMessageReaction("😳", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("bastog") !== -1) return api.setMessageReaction("😳", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("redroom") !== -1) return api.setMessageReaction("😏", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("shoti") !== -1) return api.setMessageReaction("😏", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("sexy") !== -1) return api.setMessageReaction("😍", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("hot") !== -1) return api.setMessageReaction("🔥", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("libog") !== -1) return api.setMessageReaction("😏", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("horny") !== -1) return api.setMessageReaction("😈", event.messageID, event.threadID)

// Compliments
if (event.body.toLowerCase().indexOf("pogi") !== -1) return api.setMessageReaction("😎", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("ganda") !== -1) return api.setMessageReaction("💗", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("maganda") !== -1) return api.setMessageReaction("😍", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("guwapo") !== -1) return api.setMessageReaction("😎", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("handsome") !== -1) return api.setMessageReaction("😍", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("beautiful") !== -1) return api.setMessageReaction("😍", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("pretty") !== -1) return api.setMessageReaction("💖", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("cute") !== -1) return api.setMessageReaction("🥰", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("adorable") !== -1) return api.setMessageReaction("🥺", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("charming") !== -1) return api.setMessageReaction("😘", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("attractive") !== -1) return api.setMessageReaction("😍", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("gorgeous") !== -1) return api.setMessageReaction("🤩", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("stunning") !== -1) return api.setMessageReaction("😍", event.messageID, event.threadID)

// Age References
if (event.body.toLowerCase().indexOf("bata") !== -1) return api.setMessageReaction("👧", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("kid") !== -1) return api.setMessageReaction("👧", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("child") !== -1) return api.setMessageReaction("👶", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("baby") !== -1) return api.setMessageReaction("👶", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("adult") !== -1) return api.setMessageReaction("👨", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("matanda") !== -1) return api.setMessageReaction("👴", event.messageID, event.threadID)

// Surprise & Shock
if (event.body.toLowerCase().indexOf("omg") !== -1) return api.setMessageReaction("😮", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("oh my god") !== -1) return api.setMessageReaction("😱", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("wow") !== -1) return api.setMessageReaction("😲", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("whoa") !== -1) return api.setMessageReaction("😯", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("shocked") !== -1) return api.setMessageReaction("😱", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("surprised") !== -1) return api.setMessageReaction("😲", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("gulat") !== -1) return api.setMessageReaction("😱", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("grabe") !== -1) return api.setMessageReaction("😮", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("wtf") !== -1) return api.setMessageReaction("😳", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("what the fuck") !== -1) return api.setMessageReaction("😱", event.messageID, event.threadID)

// Laughter & Humor
if (event.body.toLowerCase().indexOf("haha") !== -1) return api.setMessageReaction("😂", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("hehe") !== -1) return api.setMessageReaction("😄", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("hihi") !== -1) return api.setMessageReaction("😊", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("lol") !== -1) return api.setMessageReaction("😂", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("lmao") !== -1) return api.setMessageReaction("🤣", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("rofl") !== -1) return api.setMessageReaction("🤣", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("funny") !== -1) return api.setMessageReaction("😄", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("hilarious") !== -1) return api.setMessageReaction("🤣", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("nakakatawa") !== -1) return api.setMessageReaction("😂", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("tawa") !== -1) return api.setMessageReaction("😄", event.messageID, event.threadID)

// Food & Eating
if (event.body.toLowerCase().indexOf("food") !== -1) return api.setMessageReaction("🍽️", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("eat") !== -1) return api.setMessageReaction("🍴", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("kain") !== -1) return api.setMessageReaction("🍽️", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("pagkain") !== -1) return api.setMessageReaction("🍕", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("hungry") !== -1) return api.setMessageReaction("😋", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("gutom") !== -1) return api.setMessageReaction("🤤", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("pizza") !== -1) return api.setMessageReaction("🍕", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("burger") !== -1) return api.setMessageReaction("🍔", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("rice") !== -1) return api.setMessageReaction("🍚", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("kanin") !== -1) return api.setMessageReaction("🍚", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("adobo") !== -1) return api.setMessageReaction("🍖", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("lechon") !== -1) return api.setMessageReaction("🐷", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("sinigang") !== -1) return api.setMessageReaction("🍲", event.messageID, event.threadID)

// Drinks
if (event.body.toLowerCase().indexOf("coffee") !== -1) return api.setMessageReaction("☕", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("kape") !== -1) return api.setMessageReaction("☕", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("tea") !== -1) return api.setMessageReaction("🍵", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("water") !== -1) return api.setMessageReaction("💧", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("tubig") !== -1) return api.setMessageReaction("💧", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("beer") !== -1) return api.setMessageReaction("🍺", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("wine") !== -1) return api.setMessageReaction("🍷", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("juice") !== -1) return api.setMessageReaction("🧃", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("milk") !== -1) return api.setMessageReaction("🥛", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("gatas") !== -1) return api.setMessageReaction("🥛", event.messageID, event.threadID)

// Weather
if (event.body.toLowerCase().indexOf("rain") !== -1) return api.setMessageReaction("🌧️", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("ulan") !== -1) return api.setMessageReaction("☔", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("sunny") !== -1) return api.setMessageReaction("☀️", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("araw") !== -1) return api.setMessageReaction("🌞", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("cloudy") !== -1) return api.setMessageReaction("☁️", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("storm") !== -1) return api.setMessageReaction("⛈️", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("bagyo") !== -1) return api.setMessageReaction("🌪️", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("hot") !== -1) return api.setMessageReaction("🔥", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("init") !== -1) return api.setMessageReaction("🥵", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("cold") !== -1) return api.setMessageReaction("🥶", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("lamig") !== -1) return api.setMessageReaction("❄️", event.messageID, event.threadID)

// Time References
if (event.body.toLowerCase().indexOf("time") !== -1) return api.setMessageReaction("⏰", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("oras") !== -1) return api.setMessageReaction("🕐", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("late") !== -1) return api.setMessageReaction("⏰", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("nahuli") !== -1) return api.setMessageReaction("⏱️", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("early") !== -1) return api.setMessageReaction("⏰", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("maaga") !== -1) return api.setMessageReaction("🕐", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("wait") !== -1) return api.setMessageReaction("⏳", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("antay") !== -1) return api.setMessageReaction("⏳", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("hintay") !== -1) return api.setMessageReaction("⏳", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("zope") !== -1) return api.setMessageReaction("⏳", event.messageID, event.threadID)

// Work & School
if (event.body.toLowerCase().indexOf("work") !== -1) return api.setMessageReaction("💼", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("trabaho") !== -1) return api.setMessageReaction("👔", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("school") !== -1) return api.setMessageReaction("🏫", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("eskwela") !== -1) return api.setMessageReaction("📚", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("study") !== -1) return api.setMessageReaction("📖", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("aral") !== -1) return api.setMessageReaction("✏️", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("exam") !== -1) return api.setMessageReaction("📝", event.messageID, event.threadID)
if (event.body.toLowerCase().indexOf("test") !== -1) return api.setMessageReaction("📋", event.messageID, event.threadID)
if (event
		if (event.body.toLowerCase().indexOf("iloveyou") !== -1) return api.setMessageReaction("😙", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("good night") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("good morning") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("pakyo") !== -1) return api.setMessageReaction("😠", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("mahal") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("mwa") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("😢") !== -1) return api.setMessageReaction("😢", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("😆") !== -1) return api.setMessageReaction("😆", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("😂") !== -1) return api.setMessageReaction("😆", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("🤣") !== -1) return api.setMessageReaction("😆", event.messageID,event.threadID)
    
   	if (event.body.toLowerCase().indexOf("tangina") !== -1) return api.setMessageReaction("😡", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("good afternoon") !== -1) return api.setMessageReaction("❤", event.messageID,event.threadID)

		if (event.body.toLowerCase().indexOf("good evening") !== -1) return api.setMessageReaction("❤", event.messageID,event.threadID)

		if (event.body.toLowerCase().indexOf("gago") !== -1) return api.setMessageReaction("😡", event.messageID,event.threadID)

    		if (event.body.toLowerCase().indexOf("bastos") !== -1) return api.setMessageReaction("😳", event.messageID,event.threadID)

        		if (event.body.toLowerCase().indexOf("bas2s") !== -1) return api.setMessageReaction("😳", event.messageID,event.threadID)

        		if (event.body.toLowerCase().indexOf("bastog") !== -1) return api.setMessageReaction("😳", event.messageID,event.threadID)

        		if (event.body.toLowerCase().indexOf("hi") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)

        		if (event.body.toLowerCase().indexOf("hello") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)

        		if (event.body.toLowerCase().indexOf("zope") !== -1) return api.setMessageReaction("⏳", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("pangit") !== -1) return api.setMessageReaction("😠", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("redroom") !== -1) return api.setMessageReaction("😏", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("😏") !== -1) return api.setMessageReaction("😏", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("pakyu") !== -1) return api.setMessageReaction("🤬", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("fuck you") !== -1) return api.setMessageReaction("🤬", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("bata") !== -1) return api.setMessageReaction("👧", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("kid") !== -1) return api.setMessageReaction("👧", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("i hate you") !== -1) return api.setMessageReaction("😞", event.messageID,event.threadID)
  
    if (event.body.toLowerCase().indexOf("useless") !== -1) return api.setMessageReaction("😓", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("omg") !== -1) return api.setMessageReaction("😮", event.messageID,event.threadID)

if (event.body.toLowerCase().indexOf("shoti") !== -1) return api.setMessageReaction("😏", event.messageID,event.threadID)

if (event.body.toLowerCase().indexOf("pogi") !== -1) return api.setMessageReaction("😎", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("ganda") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)

if (event.body.toLowerCase().indexOf("i miss you") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)

if (event.body.toLowerCase().indexOf("sad") !== -1) return api.setMessageReaction("😔", event.messageID,event.threadID)
    
  }
};
