import { utilService } from '../../../services/util.service.js'
import { NotePreview } from '../cmps/note-preview.jsx'

export function NoteList({ notes, deleteNote,editNote , onTodoUpdateDelete, onAddTodoItem, copyNote, changeColor }) {
    return <section className="note-list">
        {notes.map(note => <NotePreview key={utilService.makeId()}
            note={note} deleteNote={deleteNote} copyNote={copyNote} editNote={editNote} onTodoUpdateDelete={onTodoUpdateDelete}
            onAddTodoItem={onAddTodoItem} changeColor={changeColor}
    />)}
    </section>
}