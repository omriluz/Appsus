export class NoteFilter extends React.Component {

    state = {
        noteInput: '',
        noteType: 'note-txt'
    }

    onCreateNote = (ev) => {
        ev.preventDefault()
        this.props.createNote(this.state.noteInput, this.state.noteType)
        this.setState({noteInput:''})
    }

    handleChange = ({ target }) => {
        const value = (target.type === 'number') ? +target.value : target.value
        const field = target.name

        this.setState((prevState) => ({ ...prevState, [field]: value }), () => { })
    }


    render() {
        const { noteInput } = this.state
        return <section className="note-filter-container">
            {/* TODO place holder text should be dynamic */}
            <form onSubmit={(event) => this.onCreateNote(event)}>
                <input value={noteInput} name='noteInput'
                    onChange={(event) => this.handleChange(event)} className="note-filter" type="text" />
            <select onChange={(event) => this.handleChange(event)} name="noteType" id="">
                <option value="note-txt">Note</option>
                <option value="note-img">Image</option>
                <option value="note-video">Video</option>
                <option value="note-todos">Todo List</option>
            </select>
            </form>
        </section>
    }
}