async function getJoke() {
    const jokes = [
        "Why don't programmers like nature? It has too many bugs.",
        "Why do Java developers wear glasses? Because they can't C#.",
        "What did the computer do at lunchtime? It had a byte."
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
}

module.exports = { getJoke };
