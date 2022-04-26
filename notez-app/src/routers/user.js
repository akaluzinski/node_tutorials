const express = require('express');
const User = require("../models/user");
const userRouter = new express.Router();

userRouter.post('/users', ({body}, res) => {
    const user = new User(body);
    user.save().then(() => {
        res.send({message: `User ${user.email} created`});
    }).catch(() => {
        res.status(400).send({error: 'Unable to create user.'});
    });
});

userRouter.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    }).catch(() => {
        res.status(500).send({error: 'Unable to find users.'});
    });
});

userRouter.get('/users/:id', (req, res) => {
    User.findById(req.params.id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    }).catch(() => {
        res.status(403).send({error: 'User not accessible.'});
    });
});

userRouter.patch('/users/:id', async (req, res) => {
    try {

        const id = req.params.id;
        const body = req.body;
        const updates = Object.keys(body);
        const allowedFields = ['name', 'email', 'password'];
        const isValid = updates.every((update) => allowedFields.includes(update));

        if (!isValid) {
            return res.status(400).send({error: 'Invalid update operation.'});
        }

        const user = await User.findById(id);
        updates.forEach((update) => user[update] = body[update]);

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        await user.save();

        res.send(user)
    } catch (error) {
        return res.status(404).send({error: 'Unable to update user'});
    }
});

userRouter.delete('/users/:id', async(req, res) => {
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

module.exports = userRouter;
