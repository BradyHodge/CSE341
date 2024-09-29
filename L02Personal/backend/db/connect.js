require('dotenv').config();
const { MongoClient } = require('mongodb');

let _db;

async function main() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    _db = client.db('CSE341'); 
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error('Connection error:', error);
  }
}
main().catch(console.error);

const getDb = () => {
  if (!_db) {
    throw Error('Database not initialized');
  }
  return _db;
};

module.exports = { getDb }; 