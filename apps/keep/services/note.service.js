import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js';

export const noteService = {
    query,
    saveNote,
    remove,
    toggleTodo
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
    notes.push(_createNote('note-video', { url: 'https://www.youtube.com/embed/tgbNymZ7vqY' }))
    notes.push(_createNote('note-txt', { txt: 'Fullstack Me Baby!' }))
    notes.push(_createNote('note-txt', { txt: 'Fullstack Me Baby!' }))
    notes.push(_createNote('note-txt', { txt: 'Fullstack Me Baby!' }))
    notes.push(_createNote('note-txt', { txt: 'Fullstack Me Baby!' }))
    notes.push(_createNote('note-txt', { txt: 'Fullstack Me Baby!' }))
    notes.push(_createNote('note-txt', { txt: 'Fullstack Me Baby!' }))
    notes.push(_createNote('note-txt', { txt: 'Fullstack Me Baby!' }))
    notes.push(_createNote('note-txt', { txt: 'Fullstack Me Baby!' }))
    notes.push(_createNote('note-img', {
        url: "https://picsum.photos/200",
        title: "Bobi and Me"
    }))
    notes.push(_createNote('note-todos', {
        title: 'my todo list',
        label: "Get my stuff together",
        todos: [
            { txt: "Finish Appsus", doneAt: null },
            { txt: "Go Shower", doneAt: 187111111 }
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

function toggleTodo(todoIdx, noteId) {
    let notes = _loadFromStorage()
        // const noteIdx = notes.findIndex(note => note.id === noteId)
        // notes[noteIdx].info.todos[todoIdx].doneAt = notes[noteIdx].info.todos[todoIdx].doneAt ? Date.now() : null;
    notes.forEach((note) => {
        if (note.id === noteId) {
            note.info.todos[todoIdx].doneAt = note.info.todos[todoIdx].doneAt ?
                null : +new Date()
        }
    })
    _saveToStorage(notes)
    return Promise.resolve()
}


function saveNote(note) {
    if (note.id) return _update(note)
    return _addNote(note)
}

function _update(noteToUpdate) {
    let notes = _loadFromStorage()
    notes = notes.map(note => note.id === noteToUpdate.id ? noteToUpdate : note)
    _saveToStorage(notes)
    return Promise.resolve()
}

function _addNote(noteToAdd) {
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