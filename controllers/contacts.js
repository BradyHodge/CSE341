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
  const requiredFields = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];
  
  for (const field of requiredFields) {
    if (!contact[field] || contact[field].trim() === '') {
      throw new Error(`${field} is required and cannot be empty`);
    }
  }

  try {
    const db = await getDB();
    const result = await db.collection('contacts').insertOne(contact);
    return result.insertedId;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const db = await getDB();
  const updatedData = req.body;
  delete updatedData._id;
  const result = await db.collection('contacts').updateOne({ _id: userId }, { $set: updatedData });
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Contact not found' });
  }
};

const deleteContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const db = await getDB();
    const result = await db.collection('contacts').deleteOne({ _id: userId });
    if (result.deletedCount > 0) {
      res.status(200).json({});
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };