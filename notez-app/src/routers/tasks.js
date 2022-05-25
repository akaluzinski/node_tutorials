const express = require('express');
const Task = require("../models/task");
const {auth} = require("../middleware/auth");
const {isEmpty} = require("lodash");

const taskRouter = new express.Router();
const DEFAULT_LIMIT = 10;
const SORT_SEPARATOR = ':';

taskRouter.post('/tasks', auth, (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    task.save().then(() => {
        res.send({message: `Task ${task.description} created`});
    }).catch(() => {
        res.status(400).send({error: 'Unable to create task.'});
    });
});

taskRouter.get('/tasks', auth, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || DEFAULT_LIMIT;
        const skip = parseInt(req.query.skip) || 0;
        const sort = {}

        const filter = {
            owner: req.user._id
        };

        if (req.query.completed) {
            filter.completed = req.query.completed === 'true'
        }

        const sortBy = req.query.sortBy;

        if (!isEmpty(sortBy) && sortBy.length === 2 && sortBy.includes(SORT_SEPARATOR)) {
            const [property, order] = sortBy.split(SORT_SEPARATOR)
            sort[property] = order === 'desc' ? -1 : 1;
        }

        const task = await Task.find(filter)
            .limit(limit)
            .skip(skip)
            .sort(sort);
        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(403).send({error: 'Unable to get tasks.' });
    }
});

taskRouter.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(403).send({error: 'Task not accessible.'});
    }
});

taskRouter.patch('/tasks/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const body = req.body;
        const owner = req.user._id;
        const allowedFields = ['description', 'completed'];
        const updates = Object.keys(body);

        const task = await Task.findOne({ _id, owner });
        if (!task) {
            return res.status(404).send();
        }

        const isValid = updates.every((update) => allowedFields.includes(update));

        if (!isValid) {
            return res.status(400).send({ error: 'Invalid update operation.'});
        }

        updates.forEach((update) => task[update] = body[update]);
        await task.save();

        res.send(task)
    } catch (error) {
        console.log('error');
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
