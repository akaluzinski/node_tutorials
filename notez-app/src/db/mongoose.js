const mongoose = require('mongoose');
const process = require('process');

const connectionPort = 27017;
const apiName = 'notez-api';
const mongoDatabaseUrl = process.env.MONGO_DB_URL;
const connectionURL = `mongodb://${mongoDatabaseUrl}:${connectionPort}/${apiName}`;

console.log('Connect to ', connectionURL);
mongoose.connect(connectionURL, {});
