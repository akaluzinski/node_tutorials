const mongodb = require('mongodb');
const {MongoClient} = mongodb;

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
    }, (error, {insertedId}) => {
        if (error) {
            return console.error('Unable to insert task', error);
        }
        console.log('Task inserted', insertedId);
    });

    db.collection('tasks').findOne({completed: true}, (error, result) => {
        if (error) {
            return console.error('Unable to find completed tasks');
        }
        if (result == null) {
            console.log('No completed task was found');
        } else console.log(result);
    });


    db.collection('tasks').updateMany({ completed: false }, {
       $set: {
           completed: true
       }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.error(error);
    });
};

MongoClient.connect(connectionURL, mongoOptions, connectionCallback);
