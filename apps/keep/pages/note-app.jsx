import { noteService } from "../../../services/note.service.js"

export class KeepApp extends React.Component {
    state = {

    }

    componentDidMount() {
        console.log('fdjaifjd');
        noteService.query()
            .then(console.log)
    }

    render() { 
        return <h1>yalla</h1>
    }
}