import { TextNote } from './text-note.jsx'
import { ImageNote } from './image-note.jsx'
import { VideoNote } from './video-note.jsx'
import { TodosNote } from './todos-note.jsx'

const { Link } = ReactRouterDOM


export class NotePreview extends React.Component {

    state = {
        isDeleted: false,
        previewStyle: {
            backgroundColor:''
        }
    }

    colorDiv = React.createRef()
    copyButton = React.createRef()
    deleteButton = React.createRef()

    onDeleteNote = (ev) => {
        ev.stopPropagation()
        this.setState(() => ({ isDeleted: true }), () => {
            setTimeout(() => {
                this.props.deleteNote(this.props.note.id)
            }, 300)
        })
    }

    onCopyNote = (ev) => {
        ev.stopPropagation()
        this.props.copyNote(this.props.note.id)
    }

    onTogglePallete = (ev) => {
        const refs = ['colorDiv', 'copyButton', 'deleteButton']
        ev.stopPropagation()

        if (this.colorDiv.current.style.display === 'none' || this.colorDiv.current.style.display === '') {
            refs.map((ref, idx) => {
                idx === 0 ? this[ref].current.style.display = 'flex' :
                    this[ref].current.hidden = true })
        } else {
            refs.map((ref, idx) => {
                idx === 0 ? this[ref].current.style.display = 'none' :
                    this[ref].current.hidden = false
            })
        }
    }


    onChangeColor = (field, value) => {
        this.setState((prevState) => ({
             previewStyle: { 
                 ...prevState.previewStyle, [field]: value } 
                }), () => {
                    this.props.changeColor(this.props.note.id, this.state.previewStyle.backgroundColor)
                 }) 
    }


    render() {
        const { note, onTodoUpdateDelete, onAddTodoItem, onSaveNote } = this.props
        const colors = ['#B4FF9F', '#F9FFA4', '#35bfb8', '#FFA1A1', '#98138d', '#d9852c']

        return <section className={`note-preview ${this.state.isDeleted ? 'preview-deleted' : ''}`} style={note.style}>

            <DynamicNoteTypeCmp type={note.type} note={note}
             onTodoUpdateDelete={onTodoUpdateDelete}
              onAddTodoItem={onAddTodoItem} onSaveNote={onSaveNote} />


            <div className="preview-utils-container">
                <div ref={this.colorDiv} className="preview-color-container">

                    {colors.map(color => <div className="color-item" key={color}
                        style={{ backgroundColor: color }} 
                        onClick={() => this.onChangeColor('backgroundColor', color)}></div>)}
                </div>
                <div className="preview-btns-container">
                    <div ref={this.copyButton} ><i onClick={(event) => this.onCopyNote(event)} className="fa-solid fa-copy"></i></div>
                    <div ref={this.deleteButton}><i onClick={(event) => this.onDeleteNote(event)} className="delete-preview-btn fa-regular fa-trash-can"></i></div>
                    <i onClick={(event) => this.onTogglePallete(event)} className="fa-solid fa-palette"></i>

                </div>
            </div>
        </section>

    }
}



function DynamicNoteTypeCmp({ type, note, onTodoUpdateDelete, onAddTodoItem, onSaveNote}) {
    switch (type) {
        case 'note-txt':
            return <TextNote note={note} onSaveNote={onSaveNote} />
        case 'note-img':
            return <ImageNote note={note} />
        case 'note-video':
            return <VideoNote note={note} />
        case 'note-todos':
            return <TodosNote note={note} onTodoUpdateDelete={onTodoUpdateDelete} onAddTodoItem={onAddTodoItem} />
    }
}