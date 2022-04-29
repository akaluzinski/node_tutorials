const mongoose = require('mongoose');
const {isValid, hash} = require('../security/hashing');
const {generateToken } = require('../security/tokens');

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

userSchema.methods.generateToken = async function () {
    const user = this;
    return generateToken({ _id: user._id },  '7 days');
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) {
        throw new Error('Unable to login');
    }
    const isValidPassword = await isValid(password, user.password);
    if (!isValidPassword) {
        throw new Error('Unable to login');
    }
    return user;
};

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await hash(user.password);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
