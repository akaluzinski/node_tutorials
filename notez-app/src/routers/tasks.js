const express = require('express');
const Task = require("../models/task");

const taskRouter = new express.Router();

taskRouter.post('/tasks', ({body}, res) => {
    const task = new Task(body);
    task.save().then(() => {
        res.send({message: `Task ${task.description} created`});
    }).catch(() => {
        res.status(400).send({error: 'Unable to create task.'});
    });
});

taskRouter.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch(() => {
        res.status(500).send({error: 'Unable to get tasks.' });
    });
});

taskRouter.get('/tasks/:id', (req, res) => {
    Task.findById(req.params.id).then((task) => {
        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    }).catch(() => {
        res.status(403).send({error: 'Task not accessible.'});
    });
});

taskRouter.patch('/tasks/:id', async (req, res) => {
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

taskRouter.delete('/tasks/:id', async(req, res) => {
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

module.exports = taskRouter;
