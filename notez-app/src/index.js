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
    }).catch(() => {
        res.status(400).send({error: 'Unable to create user.'});
    });
});

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    }).catch(() => {
        res.status(500).send({error: 'Unable to find users.'});
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
    try {

        const id = req.params.id;
        const body = req.body;

        const allowedFields = ['name', 'email', 'password'];
        const isValid = Object.keys(body).every((update) => allowedFields.includes(update));

        if (!isValid) {
            return res.status(400).send({error: 'Invalid update operation.'});
        }

        const user = await User.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user)
    } catch (error) {
        console.error(error);
        return res.status(404).send({error: 'Unable to update user'});
    }
});

app.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        return res.send(user);
    } catch (error) {
        return res.status(500).send( { error: 'Unable to remove user.' });
    }
});

/*-------TASKS-----------*/

app.post('/tasks', ({body}, res) => {
    const task = new Task(body);
    task.save().then(() => {
        res.send({message: `Task ${task.description} created`});
    }).catch((error) => {
        res.status(400).send({error: 'Unable to create task.'});
    });
});

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch(() => {
        res.status(500).send({error: 'Unable to get tasks.' });
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

app.patch('/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const allowedFields = ['description', 'completed'];
        const isValid = Object.keys(body).every((update) => allowedFields.includes(update));

        if (!isValid) {
            return res.status(400).send({ error: 'Invalid update operation.'});
        }

        const task = await Task.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task)
    } catch (error) {
        return res.status(404).send({error: 'Unable to update task.'});
    }
});

app.delete('/tasks/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send({ error: 'Task not found' });
        }
        return res.send(task);
    } catch (error) {
        return res.status(500).send( { error: 'Unable to remove task.' });
    }
});

app.listen(port, () => {
    console.log(`Server is on port ${port}`);
});
