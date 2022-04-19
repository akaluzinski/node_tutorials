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
    db.collection('tasks').insertOne({
        description: 'Finish Notez app',
        completed: false
    }, (error, { insertedId }) => {
        if (error) {
            return console.error('Unable to insert task', error);
        }
        console.log('Task inserted', insertedId);
    });
};

mongodb.MongoClient.connect(connectionURL, mongoOptions, connectionCallback);
