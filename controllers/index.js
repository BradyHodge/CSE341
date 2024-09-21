const getHelloWorld = (req, res) => {
    res.json('Hello World!');
};

const getPerson = (req, res) => {
    res.json('John Doe');
}

module.exports = { getHelloWorld , getPerson };