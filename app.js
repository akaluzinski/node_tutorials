const validator = require('validator');
const yargs = require('yargs');

console.log(validator.isEmail('goog@le.com'));

yargs.command({
    command: 'add',
    describe: 'Add a note',
    handler: function() {
        console.log('Adding some note')
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function() {
        console.log('Removing some note')
    }
});

yargs.command({
    command: 'list',
    describe: 'List of notes',
    handler: function() {
        console.log('List notes')
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function() {
        console.log('Removing some note')
    }
});

yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function() {
        console.log('Reading notes')
    }
});


console.log(yargs.argv);
