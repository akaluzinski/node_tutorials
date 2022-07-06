const User = require("../../src/models/user");
const {validUserA} = require("./users");

async function setupDb() {
    await User.deleteMany()
    const user = await new User(validUserA).save()
    return user;
}

module.exports = {
    setupDb
}
