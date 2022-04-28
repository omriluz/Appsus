import { TextNote } from './text-note.jsx'
import { ImageNote } from './image-note.jsx'
import { VideoNote } from './video-note.jsx'
import { TodosNote } from './todos-note.jsx'

export class NotePreview extends React.Component {

    onDeleteNote = () => {
        this.props.deleteNote(this.props.note.id)
    }

    render() {
        const { note, onToggleTodo } = this.props
        return <section className="note-preview" style={note.style}>
            {/* <h2 className={note.info.title ? 'todo-img-title' : 'note-text'}>{note.info.title || note.info.txt}</h2> : */}
            <div className="flex-helper"></div>

            <DynamicNoteTypeCmp type={note.type} note={note} onToggleTodo={onToggleTodo}/>


            <div className="preview-utils-container">
                {/* todo add util buttons here */}
                <button onClick={() => this.onDeleteNote()} className="delete-preview-btn">delete</button>
            </div>
        </section>
    }
}



function DynamicNoteTypeCmp({ type, note, onToggleTodo }) {
    switch (type) {
        case 'note-txt':
            return <TextNote note={note} />
        case 'note-img':
            return <ImageNote note={note} />
        case 'note-video':
            return <VideoNote note={note} />
        case 'note-todos':
            return <TodosNote note={note} onToggleTodo={onToggleTodo} />
    }
}