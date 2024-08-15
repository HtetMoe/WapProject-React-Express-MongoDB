const mongoose = require('mongoose');
const { Schema } = mongoose;

const aboutSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    experience: {
        years: String,
        field: String,
    },
    education: [{
        degree: String,
    }],
    paragraph: String,
});

module.exports = mongoose.model('About', aboutSchema);
