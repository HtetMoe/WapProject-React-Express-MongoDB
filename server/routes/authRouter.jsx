const express = require('express');
const router = express.Router();
const User = require('../models/UserModel.jsx');
const jwt = require('jsonwebtoken');

// Sign Up
router.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;

    console.log({username, email, password})

    try {
        // Check if a user with the given email already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'A user with this email already exists.' });
        }

        // Check if a user with the given username already exists
        user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'This username is already taken. Please choose another one.' });
        }

        user = new User({ username, email, password });
        await user.save();

        //const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ user });///token,
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login
router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User with this email does not exist.' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password. Please try again.' });
        }
        //const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ user });//token,
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetch User Data by ID
router.get('/api/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;