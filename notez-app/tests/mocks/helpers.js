const User = require("../../src/models/user");
const {validUserA} = require("./users");

async function setupDb() {
    await User.deleteMany()
    await new User(validUserA).save()
}

module.exports = {
    setupDb
}
