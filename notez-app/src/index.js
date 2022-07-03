const express = require('express');
require('./db/mongoose');
const usersRouter = require('./routers/user');
const tasksRouter = require('./routers/tasks');
const authRouter = require('./routers/auth');
const {sendGridApiKey} = require("./security/tokens");

require('./services/mails');
require('./services/scheduler');

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT;

app.use(express.json());
app.use(usersRouter);
app.use(tasksRouter);
app.use(authRouter)
app.set('etag', false);

app.listen(port, () => {
    console.log(sendGridApiKey === '' ? 'Please provide SEND_GRID_KEY env variable.' : 'SEND_GRID_KEY loaded.');
    console.log(`Server is running on port ${port}`);
});
