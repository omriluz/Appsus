import { mailService } from '../service/mail.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'
import { MailList } from '../cmps/mail-list.jsx'
import { MailCompose } from '../cmps/mail-compose.jsx'
import { MailFolderList } from '../cmps/mail-folder-list.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'
import { MailSort } from '../cmps/mail-sort.jsx'

export class MailApp extends React.Component {
    state = {
        mails: [],
        isCompose: false,
        filterBy: null,
        sortBy: null,
        mail: null,
        draftId: null,
        isToggle: false

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
        const { filterBy } = this.state
        mailService.query(filterBy)
            .then(mails => this.setState({ mails }))
    }

    onRemoveMail = (mailId) => {
        mailService.removeMail(mailId)
            .then(() => {
                this.loadMails()
                eventBusService.emit('user-msg', {
                    type: 'success', txt: 'Mail moved to trash'
                })
            })
    }

    onIsRead = (mailId) => {
        console.log(mailId);
        mailService.isRead(mailId)
            .then(this.loadMails)
    }

    onIsStared = (mailId) => {
        mailService.isStared(mailId)
            .then(() => {
                this.loadMails()
                eventBusService.emit('user-msg', {
                    type: 'success', txt: 'Mail marked as stared'
                })
            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadMails()
        })
    }

    onSetSort = (sortBy) => {
        this.setState({ sortBy }, () => {
            mailService.setMailSort(sortBy)
                .then(this.loadMails)
        })



    }

    onIsCompose = () => {
        this.setState({ isCompose: true })
    }


    closeCompose = () => {
        this.setState({ isCompose: false, mail: null })


    }

    toggleMenu = () => {
        this.setState({ isToggle: !this.state.isToggle })
    }

    closeMenu = () => {
        this.setState({ isToggle: false })
    }

    onOpenDraft = (mailId) => {
        console.log(mailId);
        mailService.getById(mailId)
            .then((mail) => {
                this.setState({ mail: { to: mail.to, subject: mail.subject, msg: mail.body }, draftId: mailId })
                this.onIsCompose()
            })
    }

    get mailsToDisplay() {
        const { mails } = this.state
        const urlSrcPrm = new URLSearchParams(this.props.location.search)
        const status = urlSrcPrm.get('status')
        const isStared = urlSrcPrm.get('isStared')
        if (!status && !isStared) return mails
        else if (isStared) return mails.filter(mail => mail.isStared)
        return mails.filter(mail => mail.status === status)

    }


    render() {
        const { isCompose, isToggle } = this.state
        return <section className="mail-app">
            <MailFolderList onIsCompose={this.onIsCompose} isToggle={isToggle} closeMenu={this.closeMenu} toggleMenu={this.toggleMenu} />
            {/* <MailSort onSetSort={this.onSetSort} /> */}
            <MailFilter onSetFilter={this.onSetFilter} isCompose={isCompose} closeCompose={this.closeCompose} />
            {isCompose && <MailCompose isCompose={isCompose}
                closeCompose={this.closeCompose}
                mail={this.state.mail}
                draftId={this.state.draftId} />}
            <MailList closeMenu={this.closeMenu} isToggle={isToggle} onOpenDraft={this.onOpenDraft} mails={this.mailsToDisplay} onIsRead={this.onIsRead} onIsStared={this.onIsStared} onRemoveMail={this.onRemoveMail} />
        </section>
    }

}



