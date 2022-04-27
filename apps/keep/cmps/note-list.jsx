import { NotePreview } from '../cmps/note-preview.jsx'

export function NoteList({ notes, deleteNote }) {
    return <section className="note-list">
        {notes.map(note => <NotePreview key={note.id}
            note={note} deleteNote={deleteNote}
        />)}
    </section>
}