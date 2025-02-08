const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

async function getNews(category) {
    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const articles = response.data.articles.slice(0, 3);
        let newsInfo = `📰 *Top News in ${category}*:\n`;

        articles.forEach((article, index) => {
            newsInfo += `\n${index + 1}. ${article.title}\n${article.description}\nRead more: ${article.url}\n`;
        });

        return newsInfo;
    } catch (error) {
        return "❌ Error retrieving news.";
    }
}

module.exports = { getNews };
