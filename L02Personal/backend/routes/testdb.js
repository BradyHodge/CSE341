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
  