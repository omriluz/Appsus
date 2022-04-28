export class NoteFilter extends React.Component {

    state = {
        noteInput: '',
        noteType: 'note-txt',
        placeHolder: 'Whats on your mind...'
    }

    onCreateNote = (ev) => {
        ev.preventDefault()
        this.props.createNote(this.state.noteInput, this.state.noteType)
        this.setState({ noteInput: '' })
    }

    handleChange = ({ target }) => {
        const value = (target.type === 'number') ? +target.value : target.value
        const field = target.name

        this.setState((prevState) => ({ ...prevState, [field]: value }), () => { })
    }


    onChooseType = ({ target }) => {
        console.log(target.dataset.placeholder)
        this.setState({ 
            placeHolder: target.dataset.placeholder,
            noteType:target.dataset.notetype})
    }

    render() {
        console.log(this.state);
        const { noteInput, placeHolder, noteType } = this.state
        return <section className="note-filter-container">
            {/* TODO place holder text should be dynamic */}
            <form className="filter-form" onSubmit={(event) => this.onCreateNote(event)}>
                <input autoComplete="off" placeholder={placeHolder} value={noteInput} name='noteInput'
                    onChange={(event) => this.handleChange(event)} className="note-filter" type="text" />
                <div className="filter-icon-container">
                    <i data-placeholder="Whats On Your Mind..." data-notetype='note-txt' onClick={(event) => this.onChooseType(event)} className={`${noteType === 'note'} fa-regular fa-note-sticky fa-lg`}></i>
                    <i data-placeholder="Your Todo List's Title." data-notetype='note-todos' onClick={(event) => this.onChooseType(event)} className="fa-solid fa-list-check fa-lg"></i>
                    <i data-placeholder="Enter Image URL" data-notetype='note-img' onClick={(event) => this.onChooseType(event)} className="fa-regular fa-image fa-lg"></i>
                    <i data-placeholder="Enter Youtube URL" data-notetype='note-video' onClick={(event) => this.onChooseType(event)} className="fa-brands fa-youtube fa-lg"></i>
                </div>
                {/* <select onChange={(event) => this.handleChange(event)} name="noteType" id="">
                <option value="note-txt">Note</option>
                <option value="note-img">Image</option>
                <option value="note-video">Video</option>
                <option value="note-todos">Todo List</option>
            </select> */}
            </form>
        </section>
    }
}