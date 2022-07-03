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
        res.status(403).send( { error: 'Unable to sign in' });
    }
});

authRouter.post('/auth/logout', auth, async (req, res) => {
    try {
        await setUserTokens(req, req.user.tokens.filter((token) => token.token !== req.token))
        res.send('OK');
    } catch (error) {
        res.status(500).send({ error: 'Unable to logout' });
    }
});

authRouter.post('/auth/logout-all-devices', auth, async (req, res) => {
    try {
        await setUserTokens(req)
        res.send('OK');
    } catch (error) {
        res.status(500).send({ error: 'Unable to logout' });
    }
});

async function setUserTokens(req, newTokens = []) {
    req.user.tokens = newTokens;
    await req.user.save();
}

module.exports = authRouter;
