export function TextNote({note}) {
    const {txt} = note.info
    return <h2 className="text-note-content">{txt}</h2>
}