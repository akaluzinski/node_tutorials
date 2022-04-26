const mongoose = require('mongoose');
const hash = require('../security/hashing');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 200,
        false: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true //TODO add email validation
    },
    password: { //TODO add legit auth with firebase
        type: String,
        required: true,
        minLength: 6,
        trim: true
    }
});

userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await hash(user.password);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
