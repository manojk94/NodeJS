const yargs = require('yargs');
const notes = require('./notes.js')

yargs.command({
    command: 'add',
    describe: 'Add a Note',
    builder:{
        title:{
            describe:'Title of note',
            required: true,
            type:'string'
        },
        body:{
            describe:'Body of the note',
            required:true,
            type:'string'
        }
    },
    handler: function(argv){
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a Note',
    handler: function(){
        console.log(notes.getNotes())
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a Note',
    builder:{
        title:{
            describe:'Title to delete',
            required: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.deleteNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List notes',
    handler: function(){
        console.log('Displaying list of notes.....')
    }
})

yargs.parse()