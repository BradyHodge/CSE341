const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { connectDB } = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
const path = require('path');

const professionalRoutes = require('./routes/professional');
const contactsRoutes  = require('./routes/contacts');
const { getDB } = require('./db/connect');

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.get('/test-html', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, 'test.html'));
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/professional', professionalRoutes);
app.use('/contacts', contactsRoutes);

app.get('/testdb', async (req, res) => {
  try {
    const db = await getDB();
    console.log('Successfully connected to the database');
    res.json({ message: 'Database connection successful' });
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