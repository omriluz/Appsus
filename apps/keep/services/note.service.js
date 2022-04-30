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
    if (filterBy) {
        // console.log('this is filterby', filterBy);
        const { txt, noteType } = filterBy
        // console.log('this is the notetype before the condition', noteType);
        // if (noteType !== 'all') {
        //     notes = notes.filter(note =>
        //         note.type === noteType
        //     )
        //     if (txt !== '') {
        //         notes = notes.filter(note =>
        //             note.info.txt === txt)
        // notes = notes.filter(note => {
        // console.log('this is the note', note);
        // if (noteType === 'all' || noteType === '') return note.info.txt.toLowerCase().includes(txt.toLowerCase())
        // return note.info.txt.toLowerCase().includes(txt.toLowerCase()) && note.type === noteType
        // })
    }
    // if (!txt) txt = null;
    // if (!noteType) noteType = ''
    // notes = notes.filter(note =>
    //         note.type === noteType
    //     )
    // && note.info.speed <= maxSpeed &&
    // car.speed >= minSpeed)

    console.log('this notes', notes);
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
    notes.push(_createNote('note-img', {
        url: "https://www.qries.com/images/banner_logo.png",
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
            backgroundColor: '#f5f5dc'
        }
    }
}


function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}