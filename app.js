var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const { connectDB } = require('./db/connect');

const professionalRoutes = require('./routes/professional');
const contactsRoutes  = require('./routes/contacts');
const { getDB } = require('./db/connect');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
  'Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Content-Type', 'application/json');
  res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next ();
});

app.use('/professional', professionalRoutes);
app.use('/contacts', contactsRoutes);
app.get('/testdb', async (req, res) => {
    try {
      const db = await getDB();
      console.log('Successfully connected to the database');
      res.send('Database connection successful');
    } catch (error) {
      console.error('Error connecting to the database:', error);
      res.status(500).json({ error: 'Failed to connect to the database' });
    }
  });

connectDB(() => {
    app.listen(8080, function() {
        console.log('Server is running on port 8080');
    });
});