const express = require('express');
const { getAll, getSingle, createContact } = require('../controllers/contacts');
const router = express.Router();


router.get('/', getAll);
router.get('/:id', getSingle);
router.post('/', async (req, res) => {
    try {
        const newContact = await createContact(req.body);
        console.log(req.body);
        

        return res.status(201).json({ id: newContact._id });
    } catch (err) {
        console.error(err);

        res.sendStatus(500);
    }
});
module.exports = router;
