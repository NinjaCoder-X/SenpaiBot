const axios = require("axios");

async function getGeminiResponse(userInput) {
    const url = `https://bk9.fun/ai/gemini?q=${encodeURIComponent(userInput)}`;
    try {
        const response = await axios.get(url);
        return response.data.BK9 || "No response from Gemini.";
    } catch (error) {
        return "❌ Error retrieving Gemini response.";
    }
}

module.exports = { getGeminiResponse };
