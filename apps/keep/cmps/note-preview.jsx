export class NotePreview extends React.Component{

    onDeleteNote = () => {
        this.props.deleteNote(this.props.note.id)
    }

    render() {
        const { note } = this.props
        return <section className="note-preview" style={note.style}>
            <h2 className={note.info.title ? 'todo-img-title' : 'note-text'}>{note.info.title || note.info.txt}</h2> :


            <div className="preview-utils-container">
                {/* todo add util buttons here */}
                <button onClick={() => this.onDeleteNote()} className="delete-preview-btn">delete</button>
                {/* <div className="fas fa-book-medical" ></div> */}
                {/* <i className="fas fa-solid fa-00"></i> */}
            </div>
        </section>
    }
}