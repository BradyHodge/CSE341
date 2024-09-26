const getHelloWorld = (req, res) => {
    res.json('Hello World!');
};

const getPerson = (req, res) => {
    res.json('Bailee Hodge');
}

module.exports = { getHelloWorld , getPerson };