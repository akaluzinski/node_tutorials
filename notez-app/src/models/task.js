const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        minLength: 1,
        maxLength: 2000
    },
    completed: {
        trim: true,
        default: false,
        type: Boolean
    }
});

module.exports = Task;
