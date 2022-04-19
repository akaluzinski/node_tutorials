const mongoose = require('mongoose');

const connectionPort = 27017;
const apiName = 'notez-api';
const connectionURL = `mongodb://127.0.0.1:${connectionPort}/${apiName}`;

mongoose.connect(connectionURL, {});

const User = mongoose.model('User', {
    name: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true
    }
})

const Task = mongoose.model('Task', {
    description: {
        type: String,
        minLength: 1,
        maxLength: 2000
    },
    completed: {
        required: true,
        type: Boolean
    }
})



const user = new User({ name: 'Adrian' });
user.save().then((user) => {
    console.log(user);
}).catch((error) => {
    console.error(error);
});

const task = new Task({ description: 'First task', completed: false });
task.save().then((task) => {
    console.log(task);
}).catch((error) => {
    console.error(error);
})
