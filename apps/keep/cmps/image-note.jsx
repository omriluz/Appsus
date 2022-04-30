export function ImageNote({ note }) {
    // TODO: fix img size to fit the note and not to override util buttons, 
    // also add photobackups using picture and srcset
    return <section className="img-container">
        <img className="image-note" src={note.info.url} alt="" />
                {/* <picture> */}
                    {/* <source srcSet={note.info.url} /> */}
                    {/* <source srcSet="https://picsum.photos/200" /> */}
                    {/* <img src="https://picsum.photos/200" alt="" /> */}
                {/* </picture> */}
            </section>
}

