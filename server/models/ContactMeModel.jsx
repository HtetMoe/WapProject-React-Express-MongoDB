const mongoose = require('mongoose');

const ContactMeSchema = new mongoose.Schema({
    gmail: { type: String, required: true },
    linkedIn: { type: String, required: true },
    userID: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('ContactMe', ContactMeSchema);