const mongoose = require('mongoose');

const User = mongoose.model('User', {
    name: {
        type: String,
        minLength: 3,
        maxLength: 200,
        false: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true //TODO add email validation
    },
    password: { //TODO add legit auth with firebase
        type: String,
        required: true,
        minLength: 6,
        trim: true
    }
});


module.exports = User;
