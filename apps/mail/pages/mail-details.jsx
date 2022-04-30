import { mailService } from "../service/mail.service.js";
import { MailFolderList } from '../cmps/mail-folder-list.jsx'
import { eventBusService } from "../../../services/event-bus.service.js";



export class MailDetails extends React.Component {

    state = {
        mail: null
    }


    componentDidMount() {
        console.log(this.props);
        this.loadMail()

    }

    loadMail = () => {
        const { mailId } = this.props.match.params
        mailService.getById(mailId)
            .then(mail => {
                if (!mail) return this.props.history.push('/mail')
                this.setState({ mail })
            })
    }


    onGoBack = () => {
        this.props.history.push('/mail?status=inbox')
    }

    onRemoveMail = () => {
        mailService.removeMail(this.state.mail.id)
            .then(() => {
                eventBusService.emit('user-msg', {
                    type: 'success', txt: 'The message moved to trash'
                })
            })

    }

    onReadMail = () => {
        mailService.isNotRead(this.state.mail.id)
            .then(() => {
                eventBusService.emit('user-msg', {
                    type: 'success', txt: 'The message marked as not read'
                })
            })
            .catch(() => {
                eventBusService.emit('user-msg', {
                    type: 'danger', txt: 'The message marked as read '
                })
            })
    }





    render() {
        const { mail } = this.state
        if (!mail) return <div>Loading..</div>
        return <section className="mail-details" >
            <MailFolderList />
            <div className="mail-btn flex">
                <div onClick={this.onGoBack}><i className="fa-solid fa-arrow-left lg"></i></div>
                <div onClick={this.onReadMail} ><i className="fa-regular fa-envelope lg"></i></div>
                <div onClick={this.onRemoveMail} ><i className="fa-solid fa-trash lg"></i></div>
            </div>
            <article className="mail-content">
                <h3>{mail.subject}</h3>
                <h4>{mail.from} <span> {mail.to}</span> </h4>
                <p>{mail.body}</p>
            </article>

        </section>

    }
}