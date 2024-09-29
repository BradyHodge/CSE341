const env = require('dotenv');
env.config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
let _db;

const initDb = async (callback) => {
  if (_db) {
    console.log('Database is already initialized!');
    return callback(null, _db);
  }
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    _db = client.db();
    console.log('Database initialized');
    callback(null, _db);
  } catch (err) {
    callback(err);
  }
};

const getDb = () => {
  if (!_db) {
    throw Error('Database not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};