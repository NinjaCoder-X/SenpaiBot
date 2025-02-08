async function getFact() {
    const facts = [
        "The first computer virus was created in 1986.",
        "The Eiffel Tower can be 15 cm taller during the summer.",
        "Honey never spoils."
    ];
    return facts[Math.floor(Math.random() * facts.length)];
}

module.exports = { getFact };
