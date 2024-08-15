const express = require('express');
const router = express.Router();
const Experience = require('../models/ExperienceModel.jsx');

// Create a new experience
router.post('/api/experience', async (req, res) => {
    try {
        const newExperience = new Experience(req.body);
        await newExperience.save();
        res.status(201).json(newExperience);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all experiences for a user
router.get('/api/experience/:userID', async (req, res) => {
    try {
        const experiences = await Experience.find({ userID: req.params.userID });
        res.json(experiences);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single experience by ID
router.get('/api/experience/detail/:id', async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        res.json(experience);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an experience
router.put('/api/experience/:id', async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        res.json(experience);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete an experience
router.delete('/api/experience/:id', async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        res.json({ message: 'Experience deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;