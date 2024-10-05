const { getDB } = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const db = await getDB();
  const result = await db.collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const db = await getDB();
  const result = await db.collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};
const createContact = async (contact) => {
  const db = await getDB();
  const result = await db.collection('contacts').insertOne(contact);
  return result.insertedId;
};


module.exports = { getAll, getSingle, createContact };