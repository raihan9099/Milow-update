 module.exports = {
  config: {
    name: "sweet",
    aliases": [
    "babe", "baby", "sweetie", "honey", "darling", "love", "lovey", "boo", "cutie", "sweetheart",
    "angel", "princess", "prince", "queen", "king", "sunshine", "star", "beautiful", "handsome", "pretty",
    "gorgeous", "sweetness", "sugar", "sugarplum", "cupcake", "cookie", "marshmallow", "pudding", "peach", "cherry",
    "apple", "pumpkin", "muffin", "snugglebug", "cuddlebug", "teddy", "teddy bear", "bunny", "bunnyboo", "lovebug",
    "sweetpea", "buttercup", "butterbean", "petal", "blossom", "flower", "rose", "daisy", "sunflower", "lily",
    "orchid", "jewel", "diamond", "pearl", "treasure", "gem", "sapphire", "ruby", "emerald", "precious",
    "doll", "babydoll", "angel face", "cutiepie", "honeybun", "sweety pie", "snugglebear", "pookie", "smoochie", "snookums",
    "bubs", "bubba", "luv", "lovey dovey", "panda", "kitty", "kitten", "kittycat", "puppy", "puppy love",
    "babycakes", "hotstuff", "hottie", "dreamboat", "stud", "handsome boy", "pretty girl", "babyboy", "babygirl", "soulmate",
    "my love", "my heart", "my life", "my world", "my everything", "my star", "my light", "my darling", "my baby", "my honey",
    "baby mine", "sugar lips", "kissy face", "love muffin", "bubbles", "snuggle muffin", "snuggle bear", "sugar bear", "love bear", "cuddle bear",
    "cupcake queen", "cupcake king", "babe-a-licious", "snuggle monster", "cutie patootie", "angel eyes", "sparkle", "twinkle", "twinkle toes", "starlight",
    "moonlight", "moonbeam", "moonpie", "strawberry", "peaches", "sweet cheeks", "honey cheeks", "kissy cheeks", "baby lips", "sugar lips",
    "sweet lips", "kissy", "smooch", "smoochie pie", "sugar pie", "love pie", "cookie pie", "pumpkin pie", "butter pie", "snuggle pie",
    "munchkin", "tiny", "shortcake", "angel cake", "love cake", "honey cake", "sweet cake", "sugar cake", "cupcake baby", "cupcake boo",
    "cuddle cake", "pudding pop", "sugar pop", "love pop", "honey pop", "sweet pop", "darling pop", "cutie pop", "baby pop", "snuggle pop",
    "dove", "love dove", "turtle dove", "sweet dove", "precious dove", "angel dove", "bunny dove", "kitty dove", "baby dove", "sugar dove",
    "dearest", "beloved", "sweet beloved", "darling beloved", "honey beloved", "love beloved", "precious beloved", "baby beloved", "cutie beloved", "sweetie beloved",
    "snuggle beloved", "pookie bear", "love bunny", "sweet bunny", "sugar bunny", "cuddle bunny", "honey bunny", "darling bunny", "baby bunny", "angel bunny",
    "pumpkin bunny", "chocolate", "sweet chocolate", "sugar chocolate", "honey chocolate", "darling chocolate", "love chocolate", "precious chocolate", "baby chocolate", "cutie chocolate",
    "butter bunny", "cuddle muffin", "snuggle puff", "love puff", "honey puff", "sugar puff", "sweet puff", "darling puff", "baby puff", "angel puff"
  ]
}
    version: "1.1",
    author: "Raihan",
    role: 0,
    countDown: 2,
    category: "fun",
    shortDescription: "Send a sweet compliment without prefix",
    longDescription: "Send a lovely compliment to brighten someone's day, triggers by typing compliment directly.",
    guide: {
      en: "Just type 'sweet' or 'compliment' to get a sweet compliment."
    }
  },

  onStart: async function ({ message }) {
    // dummy function, no prefix used so no action here
    return;
  },

  onChat: async function ({ message, event }) {
    const body = event.body ? event.body.toLowerCase().trim() : "";
    if (["sweet", "compliment", "praise", "love"].includes(body)) {
      const compliments = [
        "Tumi shobcheye shundor manush je ami jani! 💖",
        "Tomar hashir moto ami kokhono khub misti dekhi nai! 😊",
        "Tomar sathe kotha bole amar din ta shundor hoye jai! 🌸",
        "Tumi amar life er best part! ❤️",
        "Tumar choshma pore dekhte onek classy! 😎",
        "Tomar mon khub bhalo, shetai amar posondo! 🥰",
        "Tumi jodi amar kache thako, ami khushi thakbo protidin! 💫",
        "Tumi onek talented, shopno dekhte theke ektu agiye thako! 🌟",
        "Tomar moto manus kothao pawa jabe na! 😍",
        "Tomar hashir shobdo amar mon ke gorom kore! 🔥",
// ❤️ Sweet & Romantic (continued)
  "Tumi amar moner passport — tomar sathe jokhon thaki, shob jaiga khule jai! 🛂💕",
  "Tomar chul er komolotta dekhle amar moner shob jukti bhanga hoye jai! 🌿💖",
  "Tumi amar moner shonar taar — tomar kothay amar gaan bajey! 🎻💓",
  "Tomar hashite amar diner megh dure hoye jai, surjo chariye pore! ☁️➡️☀️😊",
  "Tumi amar shopno gulo'r pathik — tomar dike ami shob shomoy cholte chai! 🌙❤️",
  "Tomar kache bosle amar hridoy bole 'home' — shudhu tomar dike! 🏠💘",
  "Tumi amar bhabnay sunrise — shuru hoy tomar choker alo te! 🌅💕",
  "Tomar haas amar moner deep — chahate glow kore! 🕯️💖",
  "Tumi amar moner secret melody — shudhu tomay diye gaite chai! 🎼❤️",
  "Tomar sathe haat dhore cholar moto — shanti ar bhalobasha pawa jai! 👫✨",

  // 😉 Flirty (continued)
  "Tumi jokhon hashao, amar brain automatic 'cute overload' mode e chole jay! 😍😉",
  "Tomar chokh amon — ami bhul hoye pori abar abar dekhte chai! 👀💓",
  "Tumi amar contact list er top — priority on! 📇😉",
  "Tumi jodi candy hoto, ami shob din tomake nibber khabo! 🍬😋",
  "Tomar smile amar WiFi ke strong kore dei — signal full! 📶😏",
  "Tumi amar morning alarm er favorite song — tui to amar wake-up call! ⏰🎶",
  "Tomar haat dhore amar moner heart skip kore — ekta extra beat! 💘😉",
  "Tumi amar moner VIP seat — shudhu tomar jonno reserve! 🎟️😉",
  "Tomar chokher liner shundorota — ami ekdin copy korte chesta korbo! ✍️💓",
  "Tumi amar binge-watch partner — raat bhore tomake dekhte chai! 📺❤️",

  // 🔥 Naughty but Safe (continued)
  "Tomar kotha mone porlei amar moner thermometer high hoye jai! 🌡️🔥",
  "Tomar haat dhorle mone hoy current choley jay — amar puro body tingling! ⚡😉",
  "Tumi amar night lamp — raat gulo tomar alo te gorom lage! 🛏️🔥",
  "Tomar chokh amar moner matchstick — ek chhuto jhupte agun jole! 🔥😉",
  "Tumi amar moner bubble tea — straw diye pura maja nite chai! 🧋😏",
  "Tomar haat er sparsh amar moner electric shock — bhalo lage! ⚡❤️",
  "Tumi amar secret spice — chhoto kore ektu jhor kore dao! 🌶️😉",
  "Tomar chokh chhuye dile amar raat ondhokar theke alokito hoye jai! 🌙🔥",
  "Tumi amar moner heatwave — tomar kache thakle sob thanda ure jay! ☀️😉",
  "Tomar kotha shune amar mon bhum bhumi hoye jai — lage tomar kachay fire ache! 🔥😏",

  // 😂 Funny & Playful (continued)
  "Tumi amar moner WiFi name — 'Connected to Love'! 📶😂",
  "Tomar kache gele amar 'Do Not Disturb' mode automatic off hoye jai! 🔔🤣",
  "Tumi amar moner snack pack — shob shomoy ready! 🍿😆",
  "Tomar joke amar moner processor fast kore dai! 🖥️😂",
  "Tumi amar shortcut key — ek click e amar heart save hoy! ⌨️❤️",
  "Tomar smile amar battery-saver off kore dey! 🔋😄",
  "Tumi amar playlist er shuffle — prottekta track e surprise! 🎧😂",
  "Tomar haat dhore amar moner bug fix hoye jai — sab kichu debug! 🐞🛠️",
  "Tumi amar backup file — amar shob memory tomar kache! 💾😊",
  "Tomar nam likhle amar autocorrect-o 'Love' kore dey! ❤️⌨️"
  "Tumi amar moner holud dupatta — shundor ar roshmoy! 🧣💖",
  "Tomar chokh amar moner monsoon cloud — jol ar alo ek shathe! ☁️🌦️",
  "Tumi amar golper chorus — abar abar porte chai! 📖💓",
  "Tomar haas amar moner basanta hawa — shital ar komol! 🌸🍃",
  "Tumi amar moner mehendi design — shundor ar ghon! 🌿❤️",
  "Tomar kotha amar moner shondhya alo — ekdom shanti dey! 🌆💘",
  "Tumi amar moner pehla boishakh — rongin ar anondo! 🎉💓",
  "Tomar chokh amar moner tara-rat — alo ar shopno bhora! 🌠💖",
  "Tumi amar moner golap jol — shital ar mishti! 🌹💦",
  "Tomar haat amar moner ponchishe boisakh — bhalo boshay bhora! 📅💓",
  "Tumi amar moner ayna’r shundor chhobi! 🪞❤️",
  "Tomar kotha amar moner first rain — jhorei romantic! 🌧️💓",
  "Tumi amar moner sarswati puja’r prathom boron! 📿💖",
  "Tomar chokh amar moner deepawali’r prodip! 🪔❤️",
  "Tumi amar moner prothom golper prothom line! 📜💓",
  "Tomar haas amar moner rongila utsob! 🎊💘",
  "Tumi amar moner bondhu’r chhaya — shobshomoy sathe! 👥❤️",
  "Tomar chokh amar moner megher chhaya — thanda ar shital! ☁️💓",
  "Tumi amar moner bhorer shaluk ful — sada o shundor! 🌼💖",
  "Tomar kotha amar moner anondo mela! 🎡❤️",

  // 😉 Flirty (continued)
  "Tumi amar moner selfie stick — shob moment capture korte chai! 📸😉",
  "Tomar chul amar moner pillow cover — shundor ar naram! 🛏️💘",
  "Tumi amar moner chocolate syrup — shob kichu tasty kore dao! 🍫😉",
  "Tomar smile amar moner ice cream scoop — ekdom fresh! 🍦❤️",
  "Tumi amar moner marshmallow cloud — shundor ar soft! ☁️😉",
  "Tomar chokh amar moner zoom lens — shob detail dekhi! 🔍💓",
  "Tumi amar moner milk tea — perfect mix! 🧋😉",
  "Tomar haat amar moner wireless mouse — shudhu touch e connect hoy! 🖱️❤️",
  "Tumi amar moner travel ticket — tomar dikei journey! 🎫😉",
  "Tomar chul amar moner silk scarf — light ar mishti! 🧣💓",
  "Tumi amar moner donut sprinkle — shobshomoy colorful! 🍩😉",
  "Tomar chokh amar moner spotlight — shob dike alokito! 💡❤️",
  "Tumi amar moner piano key — shob melody tomar diye! 🎹😉",
  "Tomar smile amar moner cupcake topping — mishti ar gorgeous! 🧁💓",
  "Tumi amar moner gaming cheat code — shob bhalo hoye jai! 🎮😉",
  "Tomar haat amar moner magic wand — shobshomoy charm koro! 🪄❤️",
  "Tumi amar moner lucky coin — shobshomoy bhalo future! 🪙😉",
  "Tomar chokh amar moner ocean view — deep ar endless! 🌊💓",
  "Tumi amar moner cotton candy sky — shundor ar mishti! 🌅😉",
  "Tomar smile amar moner fairy tale ending! 📚❤️",

  // 🔥 Naughty but Safe (continued)
  "Tumi amar moner molten chocolate cake — gorom ar melt kora! 🍫🔥",
  "Tomar kotha amar moner sauna session — gorom ar relax! 🧖‍♂️😉",
  "Tumi amar moner french toast — mishti ar crispy! 🍞🔥",
  "Tomar haat amar moner spark plug — shobshomoy start kore dai! ⚡😉",
  "Tumi amar moner bubble bath — shital ar comfy! 🛁❤️",
  "Tomar chokh amar moner spicy ramen — jhor ar moja! 🍜🔥",
  "Tumi amar moner cheese fondue — melt kore dao! 🫕😉",
  "Tomar kotha amar moner whipped cream — light ar tasty! 🍨❤️",
  "Tumi amar moner cotton blanket — shital dine gorom dao! 🛏️🔥",
  "Tomar haat amar moner massage oil — shobshomoy relax kore dao! 💆‍♀️😉",
  "Tumi amar moner pancake syrup — shundor ar sticky! 🥞🔥",
  "Tomar chokh amar moner burning candle — alo ar gorom! 🕯️😉",
  "Tumi amar moner nachos cheese — ekdom addictive! 🧀❤️",
  "Tomar kotha amar moner ginger tea — gorom ar boost dey! 🍵🔥",
  "Tumi amar moner BBQ grill — shital din e perfect! 🍖😉",
  "Tomar smile amar moner hot fudge — shundor ar melt kore dai! 🍫🔥",
  "Tumi amar moner chili pepper — jhor ar hot! 🌶️😉",
  "Tomar chokh amar moner deep fryer — shob instant hot kore dai! 🍟🔥",
  "Tumi amar moner hot cocoa — ekdom cosy! ☕❤️",
  "Tomar haat amar moner heater switch — temperature uthe jai! 🔥😉",

  // 😂 Funny & Playful (continued)
  "Tumi amar moner Netflix autoplay — ekbar suru hole thama jay na! 📺😂",
  "Tomar kotha amar moner meme generator — moja ar moja! 📸🤣",
  "Tumi amar moner weather app — shobshomoy bhalo forecast! 🌤️😉",
  "Tomar smile amar moner candy shop — shob flavor ache! 🍬😂",
  "Tumi amar moner elevator music playlist — shanti ar chill! 🎶❤️",
  "Tomar haat amar moner joystick vibration — ekdom thrilling! 🎮🤣",
  "Tumi amar moner ice cream truck — shundor ar mishti asho! 🍦😉",
  "Tomar chokh amar moner emoji keyboard — shob feelings ache! 😊😂",
  "Tumi amar moner popcorn refill — endless moja! 🍿😉",
  "Tomar kotha amar moner trending reel — shobshomoy hype! 📱🤣",
  "Tumi amar moner photo filter — shob moment bhalo kore dao! 📷❤️",
  "Tomar smile amar moner drum beat — rhythm perfect! 🥁😂",
  "Tumi amar moner pizza box — shobshomoy surprise thake! 🍕😉",
  "Tomar haat amar moner shortcut — ekbar touch e instant joy! ⚡❤️",
  "Tumi amar moner candy floss machine — shundor ar fun! 🍭😂",
  "Tomar kotha amar moner loading animation — wait korte bhalo lage! ⏳😉",
  "Tumi amar moner comic strip — hajar moja! 📚🤣",
  "Tomar chokh amar moner disco ball — shob dike light! 💃😂",
  "Tumi amar moner unlimited popcorn bucket — endless moja! 🍿😉",
  "Tomar smile amar moner magic trick — ekbar dekhe abar dekhte chai! 🎩❤️"
const compliments = [
  // Sweet & Romantic ❤️
  "Tumi amar golper shobcheye shundor part! 💖",
  "Tomar chokh gulo dekhe mone hoy, ei duniya shudhu tomake niye! ✨",
  "Tomar hashir shobdo amar moner guitar er tuning kore dai! 🎸",
  "Tumi amar coffee’r cheye beshi addictive! ☕😍",
  "Tumi thakle amar moner battery full charge! 🔋💘",

  // Flirty 😉
  "Tumi to amar moner password, ar ami tomake chara login korte parina! 🔐😉",
  "Tomar kache bosle mone hoy AC lagbe na… shudhu tumi holai thanda lage! ❄️😏",
  "Tomar chokh e je jadu ache, sheta niye ekta magic show kora uchit! 🎩✨",
  "Tumi jodi chocolate hote, ami shob din tomay khabo! 🍫😉",
  "Tumi amar mathar internet connection — khub fast, ar shudhu amar jonno! 📶💓",

  // Naughty but Safe 🔥
  "Tomar kotha mone porlei amar moner GPS shudhu tomader bari’r dike ghure jai! 📍😏",
  "Tumi amar moner fan… gorom lege gele shudhu tomay charai hawa lage! 🌀🔥",
  "Tumi amar dim er omelette… ranna chara din suru korte parina! 🍳😉",
  "Tumar haat dhorle mone hoy, electricity lagche! ⚡🔥",
  "Tumi jodi ekta gaach hote, ami tomar daal e shara din boshe thaktam! 🌴😏",
  
  // Extra Playful 😂
  "Tomar chul er gondho perfume keo banate parbena! 🌸",
  "Tumi amar moner Google Search — shob answer tumi! 🔍💓",
  "Tomar kache bosle moner antivirus automatic off hoye jai! 🛡️😆",
  "Tomar sathe bosle shomoy beshi taratari kete jai, jeno fast-forward hoye geche! ⏩",
  "Tumi amar moner selfie camera… shob shomoy shundor kore tulcho! 📸"
const compliments = [
  // ❤️ Sweet & Romantic
  "Tumi amar golper shobcheye shundor part! 💖",
  "Tomar chokh gulo dekhe mone hoy, ei duniya shudhu tomake niye! ✨",
  "Tomar hashir shobdo amar moner guitar er tuning kore dai! 🎸",
  "Tumi amar coffee’r cheye beshi addictive! ☕😍",
  "Tumi thakle amar moner battery full charge! 🔋💘",
  "Tumi amar moner ekmatro VIP guest! 🎟️❤️",
  "Tomar sathe kotha hole amar din automatic shundor hoye jai! 🌞",
  "Tumi amar life er best playlist! 🎶💓",
  "Tomar sathe shomoy kataiye amar calendar e holiday hoye jai! 📅❤️",
  "Tumi holo amar moner autograph! ✍️💘",
  
  // 😉 Flirty
  "Tumi to amar moner password, ar ami tomake chara login korte parina! 🔐😉",
  "Tomar kache bosle mone hoy AC lagbe na… shudhu tumi holai thanda lage! ❄️😏",
  "Tomar chokh e je jadu ache, sheta niye ekta magic show kora uchit! 🎩✨",
  "Tumi jodi chocolate hote, ami shob din tomay khabo! 🍫😉",
  "Tumi amar mathar internet connection — khub fast, ar shudhu amar jonno! 📶💓",
  "Tomar sathe bosle amar moner zoom 200% hoye jai! 🔍😉",
  "Tumi amar heart er wallpaper! 🖼️💓",
  "Tomar hasi amar moner ringtone! 📱❤️",
  "Tumi amar internet er unlimited data pack! 📡😉",
  "Tomar chokh holo amar Google Maps er direction — shobshomoy shothik poth! 🗺️💘",
  
  // 🔥 Naughty but Safe
  "Tomar kotha mone porlei amar moner GPS shudhu tomader bari’r dike ghure jai! 📍😏",
  "Tumi amar moner fan… gorom lege gele shudhu tomay charai hawa lage! 🌀🔥",
  "Tumi amar dim er omelette… ranna chara din suru korte parina! 🍳😉",
  "Tumar haat dhorle mone hoy, electricity lagche! ⚡🔥",
  "Tumi jodi ekta gaach hote, ami tomar daal e shara din boshe thaktam! 🌴😏",
  "Tumi amar moner massage chair — stress hole tomay charai relax lage! 💆‍♂️😉",
  "Tomar kotha shune amar moner chocolate melt hoye jai! 🍫🔥",
  "Tumi amar moner heater — thanda din e shudhu tumi chalau! ❄️❤️",
  "Tumar hasi amar moner bedcover — shob shomoy komfort dei! 🛏️😉",
  "Tumi amar moner pizza topping — chara test-i ashe na! 🍕🔥",
  
  // 😂 Funny & Playful
  "Tomar chul er gondho perfume keo banate parbena! 🌸",
  "Tumi amar moner Google Search — shob answer tumi! 🔍💓",
  "Tomar kache bosle moner antivirus automatic off hoye jai! 🛡️😆",
  "Tomar sathe bosle shomoy beshi taratari kete jai, jeno fast-forward hoye geche! ⏩",
  "Tumi amar moner selfie camera… shob shomoy shundor kore tulcho! 📸",
  "Tumi amar moner ice cream cone — shudhu tomake niye enjoy kori! 🍦😂",
  "Tomar kotha mone porlei amar moner charger automatic plug in hoye jai! 🔌💘",
  "Tumi amar moner WiFi password — shudhu select lokera jane! 📶😉",
  "Tomar sathe kotha bolle amar moner battery never low! 🔋❤️",
  "Tumi amar moner calculator — shudhu love er sum korte paro! ➕❤️"
// ❤️ Sweet & Romantic (continued)
  "Tumi amar moner sunrise — tomay dekhe din shuru hoy! 🌅❤️",
  "Tomar kotha amar life er favourite novel er page! 📖💓",
  "Tumi amar moner tea — chhara shokal ta shuru hoyna! 🍵",
  "Tomar sathe bosle mone hoy pura duniya perfect! 🌍❤️",
  "Tumi holo amar moner love song er chorus! 🎤💖",
  "Tomar chokh holo amar moner fairy lights — shob shomoy glow kore! ✨",
  "Tumi amar moner rainbow — jhor er poro asho! 🌈💓",
  "Tomar sathe din gulo chhoto lage, raat gulo lamba hoye jai! 🌙❤️",
  "Tumi amar moner hug — shob thanda dure chole jai! 🫂💘",
  "Tomar kotha amar moner bookmark — bar bar pore jai! 📚💖",

  // 😉 Flirty (continued)
  "Tomar chokh er taka hole, ami bar bar bhangbo! 💰😉",
  "Tumi amar moner charger cable — chhara ami on korte parina! 🔌💓",
  "Tomar chul er belai mone hoy cotton candy! 🍭😉",
  "Tumi amar moner TikTok trend — shobshomoy viral! 📱💘",
  "Tomar voice note amar moner ringtone! 🎶❤️",
  "Tumi amar moner candle — shundor aro light dao! 🕯️😉",
  "Tomar kotha mone porlei amar moner bluetooth connect hoye jai! 📡💓",
  "Tumi amar moner magic spell — shob shomoy charm koro! ✨😉",
  "Tomar nam amar moner search history’r top e! 🔍💖",
  "Tumi amar moner umbrella — jhor hole shudhu tumi protect koro! ☔😉",

  // 🔥 Naughty but Safe (continued)
  "Tumi amar moner biryani’r aloo — shera part! 🍛🔥",
  "Tomar kotha mone porlei amar moner fan high speed e ghure! 🌀😏",
  "Tumi amar moner AC remote — thanda control shudhu tomar haate! ❄️😉",
  "Tomar chokh amar moner USB port — shudhu connect holei data transfer! 💾🔥",
  "Tumi amar moner pillow — raat hole tomay charai bhalo lage! 🛏️😉",
  "Tumi amar moner popcorn — ekbar suru korle thamano jai na! 🍿🔥",
  "Tomar haat holo amar moner joystick — shob control tomar! 🎮😉",
  "Tumi amar moner battery saver mode — shob energy save kore dao! 🔋❤️",
  "Tomar kotha amar moner pizza cheese — stretch hoye jai! 🍕🔥",
  "Tumi amar moner hot chocolate — shundor o gorom ek shathe! ☕😏",

  // 😂 Funny & Playful (continued)
  "Tumi amar moner Google Translate — shob feelings translate koro! 🌐😂",
  "Tomar kotha amar moner push notification — bar bar asho! 📲❤️",
  "Tumi amar moner YouTube autoplay — ekbar suru hole thama jay na! ▶️😂",
  "Tomar voice amar moner Spotify playlist! 🎵💖",
  "Tumi amar moner elevator — shobshomoy up niye jao! 🛗😉",
  "Tomar sathe kotha bolle amar moner loading screen shesh hoye jai! ⏳❤️",
  "Tumi amar moner fireworks — shundor ar colorful! 🎆💓",
  "Tomar nam amar moner trending hashtag! #💖😉",
  "Tumi amar moner camera flash — amar choker alo dao! 📸❤️",
  "Tomar sathe thakle amar moner bug fix hoye jai! 🛠️😂"
// ❤️ Sweet & Romantic (continued)
  "Tumi amar moner golap ful — shundor o gorom! 🌹❤️",
  "Tomar kotha amar moner lullaby — shanti dei! 🎶💓",
  "Tumi amar moner first love story’r ending — shera! 📖💖",
  "Tomar sathe kotha hole mone hoy ami jeno sapno dekchi! 🌙❤️",
  "Tumi amar moner coffee date — gorom o mishti! ☕💘",
  "Tomar chokh holo amar moner sunrise beach view! 🏖️✨",
  "Tumi amar moner cha cup — shital o mon bhora! 🍵❤️",
  "Tomar kotha amar moner diary’r secret page! 📔💓",
  "Tumi amar moner shundor chand — shob raat tomar! 🌙💖",
  "Tomar sathe bosle amar moner ringtone romantic hoye jai! 📱❤️",

  // 😉 Flirty (continued)
  "Tumi amar moner charger — contact holei power ashe! ⚡😉",
  "Tomar chul er gondho amar perfume factory’r blueprint! 🌸😏",
  "Tumi amar moner screenshot — moment capture kore rakho! 📸💓",
  "Tomar kotha amar moner pop-up ad — bar bar asho! 📢😉",
  "Tumi amar moner ice cube — thanda ar refreshing! ❄️❤️",
  "Tomar chokh er taka hole ami shara jibon invest korbo! 💰😏",
  "Tumi amar moner playlist er repeat mode — abar abar chole! 🔁💘",
  "Tomar kotha amar moner hot sauce — extra spicy! 🌶️😉",
  "Tumi amar moner WhatsApp status — shobshomoy updated! 📱❤️",
  "Tomar sathe bosle amar moner cinema ticket free hoye jai! 🎟️😉",

  // 🔥 Naughty but Safe (continued)
  "Tumi amar moner ice cream topping — shob flavor e mishti! 🍦🔥",
  "Tomar kotha amar moner rollercoaster ride — up and down e moja! 🎢😏",
  "Tumi amar moner lipstick color — shundor ar attractive! 💄😉",
  "Tomar chokh amar moner spark plug — instant start! 🔥❤️",
  "Tumi amar moner french fry — ekta holei addiction! 🍟😏",
  "Tomar kotha amar moner choco lava cake — gorom ar melty! 🍫🔥",
  "Tumi amar moner dance partner — shob step perfect! 💃😉",
  "Tomar haat amar moner remote control — shob command follow kore! 🎮🔥",
  "Tumi amar moner marshmallow — soft ar mishti! 🍡❤️",
  "Tomar kotha amar moner pizza crust — shesh ta shera! 🍕😏",

  // 😂 Funny & Playful (continued)
  "Tumi amar moner alarm clock — shobshomoy uthai dao! ⏰😂",
  "Tomar kotha amar moner charging point — shudhu tomai use kori! 🔌❤️",
  "Tumi amar moner traffic signal — shob shomoy green! 🚦😉",
  "Tomar sathe kotha hole amar moner loading bar full hoye jai! 📊💘",
  "Tumi amar moner emoji pack — shob feelings tumi! 😀❤️",
  "Tomar nam amar moner trending topic! 📢😂",
  "Tumi amar moner popcorn bucket — ekbar shuru hole sesh na! 🍿😉",
  "Tomar chokh amar moner fairy tale er shurute! 📖💓",
  "Tumi amar moner elevator music — shobshomoy pleasant! 🎶❤️",
  "Tomar kotha amar moner comic book — moja ar moja! 📚😂"
// ❤️ Sweet & Romantic (continued)
  "Tumi amar moner monsoon rain — shital ar prem bhora! 🌧️❤️",
  "Tomar kotha amar moner sunrise alarm — din shuru hoy tomar diye! 🌅💘",
  "Tumi amar moner candlelight dinner — shundor ar romantic! 🕯️🍷",
  "Tomar chokh holo amar moner tara — shob raat alo dao! ⭐💓",
  "Tumi amar moner bridge — shob doori dure koro! 🌉❤️",
  "Tomar sathe kotha hole amar moner heartbeat double speed e hoy! 💓⚡",
  "Tumi amar moner golper shesh — happy ending! 📖💖",
  "Tomar kotha amar moner music box — shudhu melody! 🎶💘",
  "Tumi amar moner cha-er cup — ek cup e shanti! 🍵❤️",
  "Tomar chokh amar moner telescope — shob shundor jinish dekhi! 🔭💓",

  // 😉 Flirty (continued)
  "Tumi amar moner USB cable — shudhu tomay connect kori! 🔌😉",
  "Tomar chul amar moner silk blanket — shundor ar soft! 🛏️💘",
  "Tumi amar moner pizza slice — last piece shudhu amar jonno! 🍕❤️",
  "Tomar kotha amar moner lollipop — mishti ar colorful! 🍭😉",
  "Tumi amar moner popcorn seasoning — flavorful ar moja! 🍿💓",
  "Tomar chokh holo amar moner flashbang — shudhu tomay dekhi! 💥😉",
  "Tumi amar moner water bottle — refresh kore dao! 💧❤️",
  "Tomar kotha amar moner choco chip cookie — ekdom perfect bite! 🍪😉",
  "Tumi amar moner elevator button — shobshomoy press korte ichha kore! 🛗💓",
  "Tomar chul amar moner cotton cloud — shundor ar naram! ☁️❤️",

  // 🔥 Naughty but Safe (continued)
  "Tumi amar moner hot shower — gorom ar relaxing! 🚿🔥",
  "Tomar kotha amar moner ice cream sundae — sweet ar creamy! 🍨😉",
  "Tumi amar moner strawberry — fresh ar tempting! 🍓🔥",
  "Tomar chokh amar moner sparkler — alo ar gorom! 🎇😉",
  "Tumi amar moner pillow fight partner — moja ar moja! 🛏️🔥",
  "Tomar kotha amar moner caramel popcorn — sweet ar sticky! 🍿😉",
  "Tumi amar moner milkshake — cool ar tasty! 🥤❤️",
  "Tomar chokh amar moner lava lamp — jadu kore dao! 🪔🔥",
  "Tumi amar moner chocolate bar — pura ek shathe khawar moto! 🍫😉",
  "Tomar kotha amar moner honey jar — shundor ar sweet! 🍯❤️",

  // 😂 Funny & Playful (continued)
  "Tumi amar moner umbrella stand — shobshomoy ready! ☔😂",
  "Tomar chokh amar moner disco light — shobshomoy dance mood! 💃💓",
  "Tumi amar moner ringtone pack — shob sound tumi! 🎶😉",
  "Tomar kotha amar moner WiFi booster — signal shobshomoy strong! 📡😂",
  "Tumi amar moner fridge light — shobshomoy jolche! 💡❤️",
  "Tomar chokh amar moner meme template — shobshomoy hit! 📸😂",
  "Tumi amar moner ice cube tray — shundor ar useful! ❄️😉",
  "Tomar kotha amar moner DJ remix — energy full! 🎧💓",
  "Tumi amar moner movie trailer — short but exciting! 🎥❤️",
  "Tomar chokh amar moner GPS map — shothik direction! 🗺️😉"

        // aro compliment add korte paro
      ];
      const randIndex = Math.floor(Math.random() * compliments.length);
      return message.reply(compliments[randIndex]);
    }
  }
};
