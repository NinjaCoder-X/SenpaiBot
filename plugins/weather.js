const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

async function getWeather(city) {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        return `🌤️ *Weather in ${data.name}*:
        - Temperature: ${data.main.temp}°C
        - Weather: ${data.weather[0].description}
        - Humidity: ${data.main.humidity}%
        - Wind Speed: ${data.wind.speed} m/s`;
    } catch (error) {
        return "❌ Error retrieving weather data.";
    }
}

module.exports = { getWeather };
