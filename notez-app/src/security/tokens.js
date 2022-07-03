const jwt = require('jsonwebtoken');
const process = require('process');

const privateKey = process.env.JWT_KEY;
const sendGridApiKey = process.env.SEND_GRID_KEY || '';

async function generateToken(payload, expiresIn) {
    return jwt.sign(payload, privateKey, { expiresIn });
}

function verifyToken(token) {
    return jwt.decode(token, privateKey);
}

module.exports = {
    generateToken,
    verifyToken,
    sendGridApiKey
};
