const mongoose = require('mongoose');
const {isValid} = require("../security/hashing");

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true,
        minLength: 1,
        maxLength: 2000
    },
    completed: {
        trim: true,
        default: false,
        type: Boolean
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

taskSchema.statics.findWithOwner = async (owner) => Task.find({ owner });

taskSchema.pre('save', async function (next) {
    next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
