const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');


router.post('/', async (req, res) => {
    const { text, category } = req.body;
    try {
        const feedback = new Feedback({ text, category });
        await feedback.save();
        res.status(201).json(feedback);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.get('/', async (req, res) => {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const feedbacks = await Feedback.find(filter).sort({ submittedAt: -1 });
    res.json(feedbacks);
});


router.patch('/:id/reviewed', async (req, res) => {
    try {
        const updated = await Feedback.findByIdAndUpdate(req.params.id, { isReviewed: true }, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
