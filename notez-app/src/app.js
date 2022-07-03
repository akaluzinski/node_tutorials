const express = require('express');
require('./db/mongoose');
const usersRouter = require('./routers/user');
const tasksRouter = require('./routers/tasks');
const authRouter = require('./routers/auth');

require('./services/mails');
require('./services/scheduler');

const app = express();

app.use(express.json());
app.use(usersRouter);
app.use(tasksRouter);
app.use(authRouter)
app.set('etag', false);

module.exports = app;
