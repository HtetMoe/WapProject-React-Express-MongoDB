// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     userID: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId }
// });

// userSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//     }
//     next();
// });

// userSchema.methods.comparePassword = function (candidatePassword) {
//     return bcrypt.compare(candidatePassword, this.password);
// };

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Added the username field
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);