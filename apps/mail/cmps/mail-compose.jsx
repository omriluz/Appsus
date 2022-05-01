import { mailService } from "../service/mail.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"


export class MailCompose extends React.Component {

    state = {
        mail: {
            to: '',
            subject: '',
            msg: '',
        },
        mailId: null

    }

    intervalId;

    componentDidMount() {
        this.loadMail()
        console.log(this.props);
        // if (this.intervalId) clearInterval(this.intervalId)
        // this.intervalId = setInterval(() => mailService.composeDraftMail(this.state.mail), 5000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    loadMail = () => {
        if (this.props.mail !== null) this.setState({ mail: this.props.mail, mailId: this.props.draftId })
    }


    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ mail: { ...prevState.mail, [field]: value } }))
    }

    onComposeMail = (ev) => {
        ev.preventDefault()
        mailService.composeMail(this.state.mail)
            .then(() => {
                this.props.onCloseCompose()
                eventBusService.emit('user-msg', {
                    type: 'success', txt: 'The message has been sent'
                })
            })
            .catch(() => {
                eventBusService.emit('user-msg', {
                    type: 'danger', txt: 'Could not send message '
                })
            })
    }


    onComposeDraftMail = () => {
        mailService.composeDraftMail(this.state.mail, this.state.mailId)
            .then(() => {
                this.props.onCloseCompose()
                eventBusService.emit('user-msg', {
                    type: 'success', txt: 'The message moved to draft'
                })
            })
    }

    render() {
        const { to, subject, msg } = this.state.mail

        return (this.props.isCompose &&
            (<section className="mail-compose flex column align-center" >
                <header className="compose-header"><button onClick={this.onComposeDraftMail} >x</button></header>
                <form className="flex column align-center" onSubmit={this.onComposeMail}>
                    <input placeholder="To:" className="to" type="text" name="to"
                        value={to} onChange={this.handleChange} />
                    <input placeholder="Subject" className="subject" type="text" name="subject"
                        value={subject} onChange={this.handleChange} />
                    <textarea className="msg" type="text" name="msg"
                        value={msg} cols="30" rows="10"
                        onChange={this.handleChange}>
                    </textarea>
                    <div className="send-mgs"><button>Send Massage</button></div>
                </form>
            </section>
            )

        )

    }

}