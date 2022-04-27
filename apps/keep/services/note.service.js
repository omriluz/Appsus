import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js';

export const noteService = {
    query,
    saveNote,
    remove
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
    notes.push(_createNote('note-txt', { txt: 'Fullstack Me Baby!' }))
    notes.push(_createNote('note-txt', { txt: 'Fullstack Me Baby!' }))
    notes.push(_createNote('note-txt', { txt: 'Fullstack Me Baby!' }))
    notes.push(_createNote('note-txt', { txt: 'Fullstack Me Baby!' }))
    notes.push(_createNote('note-txt', { txt: 'Fullstack Me Baby!' }))
    notes.push(_createNote('note-txt', { txt: 'Fullstack Me Baby!' }))
    notes.push(_createNote('note-txt', { txt: 'Fullstack Me Baby!' }))
    notes.push(_createNote('note-txt', { txt: 'Fullstack Me Baby!' }))
    notes.push(_createNote('note-img', {
        url: "http://some-img/me",
        title: "Bobi and Me"
    }))
    notes.push(_createNote('note-todos', {
        title: 'my todo list',
        label: "Get my stuff together",
        todos: [
            { txt: "Driving liscence", doneAt: null },
            { txt: "Coding power", doneAt: 187111111 }
        ]
    }))
    return notes
}

function remove(noteId) {
    let notes = _loadFromStorage()
    notes = notes.filter(note => note.id !== noteId)
    _saveToStorage(notes)
    return Promise.resolve()
}


function saveNote(note) {
    console.log('note in save notes', note);
    // if (note.id) return _update(note)
    return _addNote(note)
}

function _addNote(noteToAdd) {
    console.log('note in addnotes', noteToAdd);
    let notes = _loadFromStorage()
    const note = _createNote(noteToAdd.type, noteToAdd.info)
    notes = [note, ...notes]
    _saveToStorage(notes)
    return Promise.resolve()
}

function _createNote(type, info) {
    return {
        id: utilService.makeId(),
        type,
        isPinned: false,
        info,
        style: {
            backgroundColor: utilService.getRandomColor()
        }
    }
}


function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}