var express = require('express');
var app = express();
const bodyParser = require('body-parser');

const professionalRoutes = require('./routes/professional');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/professional', professionalRoutes);

app.listen(8080, function() {
    console.log('Server is running on port 8080');
});