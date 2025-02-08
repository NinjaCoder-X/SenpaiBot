const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const PREFIX = process.env.PREFIX || "/";
const BOT_NAME = process.env.BOT_NAME || "WhatsApp Bot";
const OWNER_NAME = process.env.OWNER_NAME || "Bot Owner";
const AUTH_FOLDER = "auth_info";

if (!fs.existsSync(AUTH_FOLDER)) fs.mkdirSync(AUTH_FOLDER);

// Load Plugin files
const aiPlugin = require("./plugins/ai");
const geminiPlugin = require("./plugins/gemini");
const weatherPlugin = require("./plugins/weather");
const newsPlugin = require("./plugins/news");
const jokePlugin = require("./plugins/joke");
const factPlugin = require("./plugins/fact");
const quotePlugin = require("./plugins/quote");

// Import the menu function
const { sendMenu } = require("./menu");

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState(AUTH_FOLDER);
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    });

    sock.ev.on("creds.update", saveCreds);
    sock.ev.on("connection.update", ({ connection, lastDisconnect, qr }) => {
        if (qr) console.log("📌 Scan this QR Code to log in:", qr);

        if (connection === "close") {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== 401;
            console.log("Connection closed, reconnecting...", shouldReconnect);
            if (shouldReconnect) startBot();
            else console.log("Session expired. Please reauthenticate.");
        } else if (connection === "open") {
            console.log(`✅ ${BOT_NAME} connected successfully!`);
        }
    });

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        const sender = msg.key.remoteJid;
        let text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
        if (!text.startsWith(PREFIX)) return;

        const command = text.slice(PREFIX.length).trim().toLowerCase();
        const args = text.split(" ").slice(1).join(" ");

        // Command handling
        if (command === "menu") {
            // Call the sendMenu function from menu.js to send the menu with the anime image
            await sendMenu(sock, sender);
        } else if (command.startsWith("ai")) {
            if (!args) return await sock.sendMessage(sender, { text: "Please provide a message for the AI." });
            await sock.sendMessage(sender, { text: "⏳ Thinking..." });
            const response = await aiPlugin.getAIResponse(args);
            await sock.sendMessage(sender, { text: response });
        } else if (command.startsWith("gemini")) {
            if (!args) return await sock.sendMessage(sender, { text: "Please provide a message for Gemini AI." });
            await sock.sendMessage(sender, { text: "⏳ Thinking..." });
            const response = await geminiPlugin.getGeminiResponse(args);
            await sock.sendMessage(sender, { text: response });
        } else if (command.startsWith("weather")) {
            const city = args.trim();
            if (!city) return await sock.sendMessage(sender, { text: "Please provide a city for the weather." });
            const weatherResponse = await weatherPlugin.getWeather(city);
            await sock.sendMessage(sender, { text: weatherResponse });
        } else if (command.startsWith("news")) {
            const category = args.trim();
            if (!category) return await sock.sendMessage(sender, { text: "Please provide a news category." });
            const newsResponse = await newsPlugin.getNews(category);
            await sock.sendMessage(sender, { text: newsResponse });
        } else if (command === "joke") {
            const joke = await jokePlugin.getJoke();
            await sock.sendMessage(sender, { text: joke });
        } else if (command === "fact") {
            const fact = await factPlugin.getFact();
            await sock.sendMessage(sender, { text: fact });
        } else if (command === "quote") {
            const quote = await quotePlugin.getQuote();
            await sock.sendMessage(sender, { text: quote });
        } else {
            await sock.sendMessage(sender, { text: `Unknown command: ${command}` });
        }
    });
}

startBot();
