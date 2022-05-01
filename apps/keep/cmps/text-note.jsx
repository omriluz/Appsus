export class TextNote extends React.Component {
    
    onChangeNoteText = ({target}) => {
        const {note, onSaveNote} = this.props
        this.props.note.info.txt = target.innerText
        onSaveNote(note)
    }

    render() {
        const {note} = this.props
        const {txt} = note.info
        return <p spellCheck={false} onBlur={(event) => this.onChangeNoteText(event)} contentEditable suppressContentEditableWarning={true} className="text-note-content">{txt}</p>
    }
}