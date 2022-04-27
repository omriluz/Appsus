import { utilService } from './util.service.js'
import { storageService } from './storage.service.js';

export const noteService = {
    query
}

const KEY = 'notesDB'



function query() {
    let notes = _loadFromStorage()
    if (!notes) {
        notes = _createNotes()
        _saveToStorage(notes)
    }
    return Promise.resolve(notes)
}


function _createNotes() {

    const notes = []
    notes.push(_createNote('note-txt', { txt: 'Fullstack Me Baby!' }))
    notes.push(_createNote('note-img', {
        url: "http://some-img/me",
        title: "Bobi and Me"
    }))
    notes.push(_createNote('note-todos', {
        label: "Get my stuff together",
        todos: [
            { txt: "Driving liscence", doneAt: null },
            { txt: "Coding power", doneAt: 187111111 }
        ]
    }))
    return notes
}


function _createNote(type, info) {
    return {
        id: utilService.makeId(),
        type,
        isPinned: false,
        info,
        style: {
            backgroundColor: "beige"
        }
    }
}


function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}