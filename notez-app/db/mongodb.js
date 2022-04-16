const mongodb = require('mongodb');

const connectionPort = 27017;
const connectionURL = `mongodb://127.0.0.1:${connectionPort}`;
const databaseName = 'notez';

const mongoOptions = {useNewUrlParser: true};

const connectionCallback = (error, client) => {
    if (error) {
        return console.error('Unable to connect to db', error);
    }

    console.log("Connected to database");
    const db = client.db(databaseName);
    db.collection('users').insertOne({
        name: 'Adrian',
        number: 27
    })
    console.log('Object inserted');
};

mongodb.MongoClient.connect(connectionURL, mongoOptions, connectionCallback);


//TODO add eslintx
