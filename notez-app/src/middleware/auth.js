const {verifyToken} = require('../security/tokens');
const User = require("../models/user");
const extractBearerToken = req => req.header('Authorization').replace('Bearer ', '');

const auth = async (req, res, next) => {
    try {
        const token = extractBearerToken(req);
        const payload = verifyToken(token);

        const user = await User.findOne({ _id: payload._id, 'tokens.token': token });
        if (!user) {
            throw new Error('Unable to find user with given token.');
        }

        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({error: 'Unauthorized.'});
    }
};

module.exports = {
    auth
};
