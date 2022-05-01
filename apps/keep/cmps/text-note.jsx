export function TextNote({note}) {
    const {txt} = note.info
    return <p onBlur={() => console.log('%csaved!','background-color:gold')} contentEditable suppressContentEditableWarning={true} className="text-note-content">{txt}</p>
}