async function getQuote() {
    const quotes = [
        "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
        "The only way to do great work is to love what you do. – Steve Jobs",
        "Life is 10% what happens to us and 90% how we react to it. – Charles R. Swindoll"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
}

module.exports = { getQuote };
