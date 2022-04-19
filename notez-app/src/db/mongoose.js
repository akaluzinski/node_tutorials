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
})

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
})



const user = new User({ name: 'Adrian', email: 'kaluza@gmail.com', password: 'YouWishxD' });
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
