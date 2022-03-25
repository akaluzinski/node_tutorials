const fs = require('fs');
const NOTES_FILE_NAME = 'notes.json';

const printNotes = () => {
    loadNotes().forEach(({body, title}, index) => {
       console.log((index+1) + '\n' + title + '\n' + body + '\n');
    });
}

const addNote = (title, body) => {
    const notes = loadNotes();

    notes.push({
        title,
        body
    })
    saveNotes(notes);
}

const removeNote = (title) => {
    saveNotes(loadNotes().filter(note => note.title !== title));
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync(NOTES_FILE_NAME, dataJson);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(NOTES_FILE_NAME);
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (e) {
        return [];
    }
}

module.exports = {
    printNotes,
    addNote,
    loadNotes,
    removeNote
}
