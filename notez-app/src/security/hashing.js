const bcrypt = require('bcryptjs');

const rounds = 8;

async function hash(text) {
    return await bcrypt.hash(text, rounds);
}

module.exports = hash;
