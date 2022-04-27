import { noteService } from "../services/note.service.js"
import { NoteList } from '../cmps/note-list.jsx'
import {NoteFilter} from '../cmps/note-filter.jsx'
export class KeepApp extends React.Component {
    state = {
        notes: []
    }

    componentDidMount() {
        this.loadNotes()
    }


    loadNotes = () => {
        noteService.query()
            .then(notes => this.setState({ notes }))

    }

    deleteNote = (noteId) => {
        noteService.remove(noteId)
        this.loadNotes()
    }

    createNote = (noteInput) => {
        
    }


    render() {
        const { notes } = this.state
        return <section className="keep-app">
            <NoteFilter createNote={this.createNote}/>
            <NoteList notes={notes} deleteNote={this.deleteNote}/>
        </section>

    }
}