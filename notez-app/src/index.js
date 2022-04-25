const express = require('express');
require('./db/mongoose');
const User = require('./models/user'); //todo replace with import
const Task = require('./models/task')

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.use(express.json());
app.set('etag', false);

/*-------USERS-----------*/

app.post('/users', ({body}, res) => {
    const user = new User(body);
    user.save().then(() => {
        res.send({message: `User ${user.email} created`});
    }).catch((error) => {
        res.status(400).send({error});
    });
});

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.get('/users/:id', (req, res) => {
    User.findById(req.params.id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    }).catch(() => {
        res.status(403).send({error: 'User not accessible.'});
    });
});

app.patch('/users/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    const allowedFields = ['name', 'email', 'password'];
    const isValid = Object.keys(body).every((update) => allowedFields.includes(update));

    if (!isValid) {
        return res.status(400).send({error: 'Invalid update operation.'});
    }

    try {
        const user = await User.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user)
    } catch (error) {
        console.error(error);
        return res.status(404).send({error});
    }
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

app.get('/tasks/:id', (req, res) => {
    Task.findById(req.params.id).then((task) => {
        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    }).catch(() => {
        res.status(403).send({error: 'Task not accessible.'});
    });
});

app.listen(port, () => {
    console.log(`Server is on port ${port}`);
});
