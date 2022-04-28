import { mailService } from '../service/mail.service.js'
import { MailList } from '../cmps/mail-list.jsx'
import { MailCompose } from '../cmps/mail-compose.jsx'
import { MailSide } from '../cmps/mail-side.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'

export class MailApp extends React.Component {
    state = {
        mails: [],
        isCompose: false,
        filterBy: null
    }

    componentDidMount() {
        this.loadMails()
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.isCompose !== this.state.isCompose) {
            this.loadMails()
        }
    }


    loadMails = () => {
        mailService.query(this.state.filterBy)
            .then(mails => this.setState({ mails }))
    }

    onIsRead = (mailId) => {
        console.log(mailId);
        mailService.isRead(mailId)
            .then(this.loadMails)
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadMails()
        })
    }

    onIsCompose = () => {
        this.setState({ isCompose: true })
    }


    onCloseCompose = () => {
        this.setState({ isCompose: false })

    }


    render() {
        const { mails, isCompose } = this.state
        return <section className="mail-app">
            <MailSide onIsCompose={this.onIsCompose} />
            <MailFilter onSetFilter={this.onSetFilter} history={this.props.history} />
            <MailCompose isCompose={isCompose}
                onCloseCompose={this.onCloseCompose} />
            <MailList mails={mails} onIsRead={this.onIsRead} />

        </section>
    }

}



