const app = require('./app');
const process = require('process');

const {sendGridApiKey} = require("./security/tokens");
const {isEmpty} = require("lodash");
const port = process.env.PORT;

app.listen(port, () => {
    console.log(isEmpty(sendGridApiKey) ? 'Please provide SEND_GRID_KEY env variable.' : 'SEND_GRID_KEY loaded.');
    console.log(`Server is running on port ${port}`);
});
