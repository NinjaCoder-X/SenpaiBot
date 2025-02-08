const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

async function getAIResponse(userInput) {
  const url = "https://chatgpt-42.p.rapidapi.com/gpt4";
  const options = {
    method: 'POST',
    url: url,
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      messages: [{ role: 'user', content: userInput }],
      web_access: false
    }
  };

  // Log the full URL and headers to debug
  console.log("Request URL:", url);
  console.log("Request Headers:", options.headers);

  try {
    const response = await axios.request(options);
    console.log("Response Data:", response.data);
    return response.data.result || "AI response format is invalid.";
  } catch (error) {
    console.error("❌ AI Response Error:", error.message);
    return "AI service is temporarily unavailable.";
  }
}

module.exports = { getAIResponse };
