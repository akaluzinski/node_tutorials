const express = require('express');
const User = require("../models/user");
const {auth} = require("../middleware/auth");
const {avatarUpload} = require("../services/image-upload");
const userRouter = new express.Router();

userRouter.post('/users', async ({body}, res) => {
    try {
        const user = new User(body);
        await user.save();
        const token = await user.generateToken();
        res.status(201).send({user, token});
    } catch (error) {
        res.status(400).send({error: 'Unable to create user.'});
    }
});

userRouter.get('/users/me', auth, ({user}, res) => {
    res.send(user);
});

userRouter.patch('/users/me', auth, async (req, res) => {
    try {
        const body = req.body;
        const updates = Object.keys(body);
        const allowedFields = ['name', 'email', 'password'];
        const isValid = updates.every((update) => allowedFields.includes(update));

        if (!isValid) {
            return res.status(400).send({error: 'Invalid update operation.'});
        }

        updates.forEach((update) => req.user[update] = body[update]);
        await req.user.save();

        res.send(req.user)
    } catch (error) {
        return res.status(404).send({error: 'Unable to update user'});
    }
});

// eslint-disable-next-line no-unused-vars
const onError = (error, req, res, _) => {
    res.status(400).send({
        error: error?.message || 'Unknown error. Sorry.'
    });
};

userRouter.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || !user.avatar) {
            throw new Error('This user does not have an avatar.');
        }
        res.set('Content-Type', 'image/jpg');
        res.send(user.avatar);
    } catch (e) {
        res.send(404).send({ error: e.message} );
    }
}, onError);

userRouter.post('/users/me/avatar', auth, avatarUpload.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
}, onError);

userRouter.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
});

userRouter.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        return res.send('OK');
    } catch (error) {
        return res.status(500).send({error: 'Unable to remove user.'});
    }
});

module.exports = userRouter;
