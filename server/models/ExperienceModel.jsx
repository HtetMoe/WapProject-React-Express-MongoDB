const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: String, required: true },
});

const experienceSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    skills: [skillSchema],
});

module.exports = mongoose.model('Experience', experienceSchema);