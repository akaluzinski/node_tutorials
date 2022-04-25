const express = require('express');
require('./db/mongoose');
const usersRouter = require('./routers/user');
const tasksRouter = require('./routers/tasks');

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(usersRouter);
app.use(tasksRouter);
app.set('etag', false);

app.listen(port, () => {
    console.log(`Server is on port ${port}`);
});
