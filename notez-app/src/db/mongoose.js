const mongoose = require('mongoose');

const connectionPort = 27017;
const apiName = 'notez-api';
const connectionURL = `mongodb://127.0.0.1:${connectionPort}/${apiName}`;

mongoose.connect(connectionURL, {});
