const express = require('express');
const User = require("../models/user");
const {auth} = require("../middleware/auth");
const authRouter = new express.Router();

authRouter.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateToken();
        res.send({ user, token });
    } catch (error) {
        res.status(403).send();
    }
});

authRouter.post('/auth/logout', auth, async (req, res) => {
    try {
        console.log('Logout ', req.token);
        req.user.tokens = req.user.tokens.filter((token) => {
            if(token.token === req.token) {
                console.log('Match, logout', token.token);
            }
           return token.token !== req.token;
        });
        await req.user.save();
        res.send('OK');
    } catch (error) {
        res.status(500).send({ error: 'Unable to logout' });
    }
});

module.exports = authRouter;
