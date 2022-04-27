export class NoteFilter extends React.Component {

    state = {
        noteInput: ''
    }

    onCreateNote = (ev) => {
        ev.preventDefault()
        this.props.createNote(noteInput)
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
            </form>
        </section>
    }
}