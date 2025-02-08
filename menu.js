const fs = require("fs");
const { isAdmin } = require("./utils/admin");

const animeImages = [
    "https://i.imgur.com/1g9nZIo.jpg",
    "https://i.imgur.com/EW4vYcd.jpg",
    "https://i.imgur.com/lQ0x2zK.jpg",
    "https://i.imgur.com/T0F1G2F.jpg",
    "https://i.imgur.com/hZrlFgM.jpg"
];

function getRandomAnimeImage() {
    return animeImages[Math.floor(Math.random() * animeImages.length)];
}

async function sendMenu(sock, sender) {
    const commands = [
        { command: "ai", description: "Chat with AI" },
        { command: "gemini", description: "Ask Gemini AI" },
        { command: "weather", description: "Get current weather" },
        { command: "news", description: "Latest news updates" },
        { command: "joke", description: "Get a random joke" },
        { command: "fact", description: "Get an interesting fact" },
        { command: "quote", description: "Get an inspiring quote" },
        { command: "image", description: "Generate AI images" }
    ];

    let menuText = `🌸 *Welcome to ${process.env.BOT_NAME || "WhatsApp Bot"}!* 🌸\n\n`;
    menuText += `📝 *Available Commands:*\n`;
    commands.forEach(cmd => {
        menuText += `- 📌 */${cmd.command}* → ${cmd.description}\n`;
    });
    
    if (await isAdmin(sender)) {
        menuText += `\n⚙️ *Admin Commands:*\n`;
        menuText += `- 🔧 */ban <user>* → Ban a user\n`;
        menuText += `- 🔧 */unban <user>* → Unban a user\n`;
    }
    
    const buttons = [
        { buttonId: "menu_ai", buttonText: { displayText: "🤖 AI Chat" }, type: 1 },
        { buttonId: "menu_weather", buttonText: { displayText: "☀️ Weather" }, type: 1 },
        { buttonId: "menu_news", buttonText: { displayText: "📰 News" }, type: 1 },
        { buttonId: "menu_joke", buttonText: { displayText: "😂 Joke" }, type: 1 }
    ];
    
    const buttonMessage = {
        image: { url: getRandomAnimeImage() },
        caption: menuText,
        footer: "🔹 Select an option below:",
        buttons: buttons,
        headerType: 4
    };
    
    await sock.sendMessage(sender, buttonMessage);
}

module.exports = { sendMenu };
