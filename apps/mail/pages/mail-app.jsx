import {mailService} from '../../../services/mail.service.js'

export class MailApp extends React.Component {
    state = {
        
    }

    componentDidMount() {
        console.log('got into mail app');
        mailService.query()
        .then(console.log)
    }

    render() {
        return <h1>kaki
            
        </h1>
    }
    
}