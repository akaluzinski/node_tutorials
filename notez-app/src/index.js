const express = require('express');
require('./db/mongoose');
const User = require('./models/user'); //todo replace with import
const Task = require('./models/task')

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.use(express.json());

/*-------USERS-----------*/

app.post('/users', ({body}, res) => {
    const user = new User(body);
    user.save().then(() => {
        res.send({message: `User ${user.email} created`});
    }).catch((error) => {
        res.status(400).send({error});
    });
});

/*-------TASKS-----------*/

app.post('/tasks', ({body}, res) => {
    const task = new Task(body);
    task.save().then(() => {
        res.send({message: `Task ${task.description} created`});
    }).catch((error) => {
        res.status(400).send({error});
    });
});


app.listen(port, () => {
    console.log(`Server is on port ${port}`);
});
