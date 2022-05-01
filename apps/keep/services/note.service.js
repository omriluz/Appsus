import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js';

export const noteService = {
    query,
    saveNote,
    deleteNote,
    addTodoItem,
    getById,
    todoUpdateDelete,
    copyNote,
    changeColor
}

const KEY = 'notesDB'



function query(filterBy) {

    let notes = _loadFromStorage()
    if (!notes) {
        notes = _createNotes()
        _saveToStorage(notes)
    }
    console.log('this notes', notes);
    return Promise.resolve(notes)
}






function _createNotes() {

    const notes = []
    notes.push(_createNote('note-img', {
        url: "https://images.unsplash.com/photo-1651185474185-20dcc940f14b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80 327w, https://images.unsplash.com/photo-1651185474185-20dcc940f14b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80 627w, https://images.unsplash.com/photo-1651185474185-20dcc940f14b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80 654w, https://images.unsplash.com/photo-1651185474185-20dcc940f14b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80 927w, https://images.unsplash.com/photo-1651185474185-20dcc940f14b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1227&q=80 1227w, https://images.unsplash.com/photo-1651185474185-20dcc940f14b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1254&q=80 1254w, https://images.unsplash.com/photo-1651185474185-20dcc940f14b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1527&q=80 1527w, https://images.unsplash.com/photo-1651185474185-20dcc940f14b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1827&q=80 1827w, https://images.unsplash.com/photo-1651185474185-20dcc940f14b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1854&q=80 1854w, https://images.unsplash.com/photo-1651185474185-20dcc940f14b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2127&q=80 2127w, https://images.unsplash.com/photo-1651185474185-20dcc940f14b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2384&q=80 2384w",
        title: "Bobi and Me"
    }))
    notes.push(_createNote('note-video', { url: 'https://www.youtube.com/embed/tgbNymZ7vqY' }))
    notes.push(_createNote('note-todos', {
        title: 'my todo list',
        label: "Get my stuff together",
        todos: [
            { txt: "buy groceries", doneAt: null },
            { txt: "go Shower", doneAt: 187111111 },
            { txt: "hack the pentagon", doneAt: 187111111 }
        ]
    }))
    notes.push(_createNote('note-txt', { txt: 'A poem written by me: Evening In A Sugar OrchardFrom where I lingered in a lull in March outside the sugar-house one night for choice, I called the fireman with a careful voice And bade him leave the pan and stoke the arch: O fireman, give the fire another stoke, And send more sparks up chimney with the smoke. I thought a few might tangle, as they did, Among bare maple boughs, and in the rare Hill atmosphere not cease to glow, And so be added to the moon up there.' }))
    notes.push(_createNote('note-txt', { txt: 'Remember to remember something' }))
    notes.push(_createNote('note-img', {
        url: "https://www.qries.com/images/banner_logo.png",
        title: "Bobi and Me"
    }))
    notes.push(_createNote('note-img', {
        url: "https://images.unsplash.com/photo-1651250899702-bd2de3569ca9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        title: "Bobi and Me"
    }))
    return notes
}

function deleteNote(noteId) {
    let notes = _loadFromStorage()
    notes = notes.filter(note => note.id !== noteId)
    _saveToStorage(notes)
    return Promise.resolve()
}

function todoUpdateDelete(todoIdx, noteId, action, txt) {
    let notes = _loadFromStorage()
    notes.forEach((note) => {
        if (note.id === noteId) {
            if (action === 'delete') {
                note.info.todos.splice(todoIdx, 1)
            } else if (action === 'toggleDone') {
                note.info.todos[todoIdx].doneAt = note.info.todos[todoIdx].doneAt ?
                    null : +new Date()
            } else if (action === 'updateTxt') {
                note.info.todos[todoIdx].txt = txt
            }
        }
    })
    _saveToStorage(notes)
    return Promise.resolve()
}

function addTodoItem(noteId) {
    const notes = _loadFromStorage()
    const note = notes.find(note => noteId === note.id)
    note.info.todos.push({ 'txt': 'new todo line', doneAt: null })
    _saveToStorage(notes)
    return Promise.resolve()
}

function getById(noteId) {
    const notes = _loadFromStorage()
    const note = notes.find(note => noteId === note.id)
    return Promise.resolve(note)
}


function saveNote(note) {
    if (note.id) return _update(note)
    return _addNote(note)
}


function changeColor(noteId, color) {
    const notes = _loadFromStorage()
    const note = notes.find(note => noteId === note.id)
    note.style.backgroundColor = color
    _saveToStorage(notes)
    return Promise.resolve()
}

function copyNote(noteId) {
    const notes = _loadFromStorage()
    const note = notes.find(note => noteId === note.id)
    const noteIdx = notes.findIndex(note => noteId === note.id)
    let noteCopy = JSON.parse(JSON.stringify(note))
    noteCopy.id = utilService.makeId()

    notes.splice(noteIdx, 0, noteCopy)
    _saveToStorage(notes)

    return Promise.resolve()
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
            backgroundColor: '#fff'
        }
    }
}


function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}