const validator = require('validator');
const yargs = require('yargs');
const notes = require('./notes.js');


console.log(validator.isEmail('goog@le.com'));

yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {
      title: {
          describe: 'Note title',
          demandOption: true,
          type: 'string'
      },
     body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function({ title, body }) {
        notes.addNote(title, body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: ({ title }) => {
        console.log(`Remove '${title}'`);
        notes.removeNote(title);
    }
});

yargs.command({
    command: 'list',
    describe: 'List of notes',
    handler: () => {
        notes.printNotes();
    }
});

yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: () => {
        console.log('Reading notes')
    }
});


yargs.parse();
