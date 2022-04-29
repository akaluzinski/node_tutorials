const jwt = require('jsonwebtoken');

const privateKey = 'secrettokentthatwillbeoverridensoon';

async function generateToken(payload, expiresIn) {
    return jwt.sign(payload, privateKey, { expiresIn });
}

module.exports = {
    generateToken
};
