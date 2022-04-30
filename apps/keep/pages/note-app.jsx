import { noteService } from "../services/note.service.js"
import { NoteList } from '../cmps/note-list.jsx'
import { NoteFilter } from '../cmps/note-filter.jsx'
import { NoteDetails } from "./note-details.jsx"
import { eventBusService } from "../../../services/event-bus.service.js"


export class KeepApp extends React.Component {
    state = {
        notes: [],
        filterBy: null
    }



    removeEvent;


    componentDidMount() {
        // initial load 
        this.loadNotes()
        
        this.removeEvent = eventBusService.on('search', (filterBy) => {
            this.setState((prevState) => ({ filterBy }), () => {
                this.loadNotes()
            })
        })

    }

    componentWillUnmount() {
        this.removeEvent()
    }

    loadNotes = () => {
        noteService.query(this.state.filterBy)
            .then(notes => {
                this.setState({ notes })
            })

    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadNotes()
        })
    }

    deleteNote = (noteId) => {
        noteService.deleteNote(noteId)
        this.loadNotes()
    }

    copyNote = (noteId) => {
        noteService.copyNote(noteId)
        this.loadNotes()
    }

    onTodoUpdateDelete = (todoIdx, noteId, action, event) => {
        let txt = event ? event.target.innerText : undefined
        noteService.todoUpdateDelete(todoIdx, noteId, action, txt)
            .then(this.loadNotes)
    }

    onAddTodoItem = (noteId) => {
        noteService.addTodoItem(noteId)
        this.loadNotes()
    }

    createNote = (noteInput, noteType) => {
        let noteInfo = {}
        switch (noteType) {
            case 'note-txt':
                noteInfo.txt = noteInput
                break
            case 'note-img':
                noteInfo.url = noteInput
                break
            case 'note-video':
                noteInfo.url = noteInput
                break
            case 'note-todos':
                noteInfo.title = noteInput
                noteInfo.todos = [{ txt: 'example todo', doneAt: null }]
                break
        }
        let note = { type: noteType, info: noteInfo }
        noteService.saveNote(note)
        this.loadNotes()
    }


    changeColor = (noteId, color) => {
        noteService.changeColor(noteId, color)
            .then(this.loadNotes)
    }


    render() {
        console.log(this.state);
        const { notes } = this.state
        return <section className="keep-app">
            <NoteFilter createNote={this.createNote} />
            <NoteList notes={notes} editNote={this.editNote}
                deleteNote={this.deleteNote} copyNote={this.copyNote} onTodoUpdateDelete={this.onTodoUpdateDelete}
                onAddTodoItem={this.onAddTodoItem} changeColor={this.changeColor} />
        </section>

    }
}