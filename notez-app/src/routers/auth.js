const express = require('express');
const User = require("../models/user");
const authRouter = new express.Router();

authRouter.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByCredentials(email, password);
        res.send(user);
    } catch (error) {
        res.status(403).send();
    }
});

module.exports = authRouter;
