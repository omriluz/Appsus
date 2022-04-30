export function TextNote({note}) {
    const {txt} = note.info
    return <p className="text-note-content">{txt}</p>
}