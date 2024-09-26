var express = require('express');
var app = express();

app.use('/', require('./routes/index'));

app.listen(3000, function() {
    console.log('Server running on port 3000');
    }
);  