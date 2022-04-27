import { mailService } from '../../../services/mail.service.js'
import { MailList } from '../cmps/mail-list.jsx'

export class MailApp extends React.Component {
    state = {
        mails: []
    }

    componentDidMount() {
        this.loadMails()
    }


    loadMails = () => {
        mailService.query()
            .then(mails => this.setState({ mails }))
    }


    render() {
        const { mails } = this.state
        return <section className="mail-app">

            <MailList mails={mails} />

        </section>
    }

}