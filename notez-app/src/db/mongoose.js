const mongoose = require('mongoose');

const connectionPort = 27017;
const apiName = 'notez-api';
const connectionURL = `mongodb://127.0.0.1:${connectionPort}/${apiName}`;

mongoose.connect(connectionURL, {});

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})



const user = new User({ name: 'Moongose', age: 31 });
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
