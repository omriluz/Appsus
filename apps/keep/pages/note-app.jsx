import { noteService } from "../services/note.service.js"
import { NoteList } from '../cmps/note-list.jsx'
import { NoteFilter } from '../cmps/note-filter.jsx'
export class KeepApp extends React.Component {
    state = {
        notes: []
    }

    componentDidMount() {
        this.loadNotes()
    }


    loadNotes = () => {
        noteService.query()
            .then(notes => {
                this.setState({ notes })
            })

    }


    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.notes.todos !== this.state.notes.todos) {
    //         this.loadNotes()
    //     }
    //     // console.log('prevProps',prevProps.note.info.todos[0].doneAt, 'currState', this.state.todos[0].doneAt);
    //     // if (JSON.stringify(prevProps.note.info.todos) !== JSON.stringify(this.state.todos)) {
    //     // console.log('fdajiojdaiofjdasio')
    //     // }
    // }



    deleteNote = (noteId) => {
        noteService.remove(noteId)
        this.loadNotes()
    }

    onToggleTodo = (todoIdx, noteId) => {
        noteService.toggleTodo(todoIdx, noteId)
            .then(()=>this.loadNotes())
    }

    createNote = (noteInput, noteType) => {
        // add to notes and load again
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

    editNote = () => {
        // i think there wont be a need for this if so delete all children funcs
        // noteService.editNote()
    }

    render() {
        const { notes } = this.state
        return <section className="keep-app">
            <NoteFilter createNote={this.createNote} />
            <NoteList notes={notes} editNote={this.editNote} deleteNote={this.deleteNote} onToggleTodo={this.onToggleTodo} />
        </section>

    }
}