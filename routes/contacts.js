const express = require('express');
const { getAll, getSingle, createContact, updateContact, deleteContact } = require('../controllers/contacts');

const router = express.Router();

router.get('/', getAll);

router.get('/:id', getSingle);

router.post('/', async (req, res) => {
    try {
        const newContact = await createContact(req.body);
        return res.status(201).json({ id: newContact });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.put('/:id', updateContact);

router.delete('/:id', deleteContact);

module.exports = router;