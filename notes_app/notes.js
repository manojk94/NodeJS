const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () { 
    return loadNotes()
}

const addNote = function (title, body) {
    const notes = loadNotes();

    const dupNotes = notes.filter(function(note){
        return note.title === title
    })

    if (dupNotes.length===0)    {
        notes.push({
            title:title,
            body:body
        })
    
        saveNotes(notes)    
    }
    else{
            console.log(chalk.red.inverse("Duplicate note...."))
        }
}

const saveNotes = function(notes){
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('./notes.json', notesJSON)
}

const loadNotes = function() {

    try{
    const notesBuffer = fs.readFileSync('./notes.json');
    const notesJSON = notesBuffer.toString();

    return JSON.parse(notesJSON);
    }
    catch (error){
        return [];
    }
}

const deleteNote = function(title){
    const notes = loadNotes()
    const noteToKeep = notes.filter(function (note){
        return note.title !== title
    })
   
    if (noteToKeep.length !== notes.length)
    {
        saveNotes(noteToKeep)
        console.log(chalk.green('Note Removed'))
    }
    else
    {
        console.log(chalk.red.inverse('No note found..'))
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    deleteNote: deleteNote
}
