const bcrypt = require('bcryptjs');

const rounds = 8;

async function hash(text) {
    return await bcrypt.hash(text, rounds);
}

async function isValid(text, hash) {
    return await bcrypt.compare(text, hash);
}

module.exports = {
    hash,
    isValid
};
