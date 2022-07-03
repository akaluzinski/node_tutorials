const mongoose = require('mongoose');
const process = require('process');
const {log} = require("../services/log");

const connectionPort = process.env.MONGO_DB_PORT;
const apiName = process.env.MONGO_DB_API_NAME;
const mongoDatabaseUrl = process.env.MONGO_DB_URL;
const connectionURL = `mongodb://${mongoDatabaseUrl}:${connectionPort}/${apiName}`;

log('Connect to', connectionURL);
mongoose.connect(connectionURL, {});
