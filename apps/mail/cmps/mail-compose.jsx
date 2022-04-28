import { mailService } from "../service/mail.service.js"


export class MailCompose extends React.Component {

    state = {
        mail: {
            to: '',
            subject: '',
            msg: ''
        }
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
            })
    }

    render() {
        const { to, subject, msg } = this.state.mail

        return (this.props.isCompose &&
            (<section className="mail-compose flex column align-center" >
                <header className="compose-header"><button onClick={this.props.onCloseCompose} >x</button></header>
                <form className="flex column align-center" onSubmit={this.onComposeMail}>
                    <input placeholder="To:" className="to" type="text" name="to"
                        value={to} onChange={this.handleChange} />
                    <input placeholder="Subject" className="subject" type="text" name="subject"
                        value={subject} onChange={this.handleChange} />
                    <input className="msg" type="text" name="msg"
                        value={msg} onChange={this.handleChange} />
                    <div className="send-mgs"><button>Send Massage</button></div>
                </form>
            </section>
            )

        )

    }

}