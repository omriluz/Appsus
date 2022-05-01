import { noteService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js'
export class NoteDetails extends React.Component {

    state = {
        note: null
    }


    componentDidMount() {
        this.loadNote()
    }

    loadNote = () => {
        const { noteId } = this.props.match.params
        noteService.getById(noteId)
            .then(note => {
                if (!note) return this.props.history.push('/')
                this.setState({ note })
            })
    }

    componentWillUnmount() {
        // here with the onblur shit
    }

    onCloseEdit = () => {
        this.props.closeEdit()
    }

    onSaveNote = (ev) => {
        ev.preventDefault()
        noteService.saveNote(this.state.note)
            .then(() => {
                this.props.history.push('/keep')
            })
    }

    onSaveCar = (ev) => {
        ev.preventDefault()
        carService.saveCar(this.state.car)
            .then(() => {
                this.props.history.push('/car')
            })
    }


    handleInfoChange = ({ target }) => {

        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => (
            {
                note: {
                    ...prevState.note, info: {
                        ...prevState.note.info,
                        [field]: value
                    }
                }
            }))
    }

    handleTodoChange = ({ target }, idx) => {

        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => (
            {
                note: {
                    ...prevState.note, info: {
                        ...prevState.note.info, todos: {
                            ...prevState.note.info.todos,
                        }
                    }
                }
            }))
    }



    render() {
        const { note } = this.state
        console.log(note);
        let noteInfoToEdit
        let noteKey
        if (note) {
            noteInfoToEdit = Object.values(note.info)[0]
            noteKey = Object.keys(note.info)[0]
        }
        return <section className="note-details-container">
            {note && <h1>Edit your note</h1>}

            {note && <input value={noteInfoToEdit} name={noteKey} onChange={(event) => this.handleInfoChange(event)} type="text" />}


            <button onClick={(event) => this.onSaveNote(event)}>save</button>
        </section>
    }
}

