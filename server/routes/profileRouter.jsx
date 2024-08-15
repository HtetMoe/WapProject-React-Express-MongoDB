// routes/profileRouter.js
const express = require('express');
const router = express.Router();
const Profile = require('../models/ProfileModel.jsx');

// Create Profile
router.post('/api/profile', async (req, res) => {
    const { name, profileImage, position, userID } = req.body;
    try {
        const profile = new Profile({ name, profileImage, position, userID });
        await profile.save();
        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Profile by User ID
router.get('/api/profile/:userID', async (req, res) => {
    try {
        const profile = await Profile.findOne({ userID: req.params.userID });
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Profile
router.put('/api/profile/:userID', async (req, res) => {
    const { name, profileImage, position } = req.body;
    try {
        const profile = await Profile.findOneAndUpdate(
            { userID: req.params.userID },
            { name, profileImage, position },
            { new: true }
        );
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Profile
router.delete('/api/profile/:userID', async (req, res) => {
    try {
        const profile = await Profile.findOneAndDelete({ userID: req.params.userID });
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;