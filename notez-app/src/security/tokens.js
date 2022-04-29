const jwt = require('jsonwebtoken');

const privateKey = 'secrettokentthatwillbeoverridensoon';

async function generateToken(payload, expiresIn) {
    return jwt.sign(payload, privateKey, { expiresIn });
}

function verifyToken(token) {
    return jwt.decode(token, privateKey);
}

module.exports = {
    generateToken,
    verifyToken
};
