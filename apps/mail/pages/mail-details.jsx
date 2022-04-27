import { mailService } from "../service/mail.service.js";




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
                if (!mail) return this.props.history.push('/')
                this.setState({ mail })
            })
    }


    onGoBack = () => {
        this.props.history.push('/mail')
    }

    onRemoveMail = () => {
        mailService.removeMail(this.state.mail.id)

    }




    render() {
        const { mail } = this.state
        if (!mail) return <div>Loading..</div>
        return <section className="mail-details" >
            <div className="mail-btn">
                <button onClick={this.onGoBack}>Go back</button>
                <button>Not read</button>
                <button onClick={this.onRemoveMail} >delete</button>
            </div>
            <article className="mail-content">
                <h3>{mail.subject}</h3>
                <h4>{mail.from} <span> {mail.to}</span> </h4>
                <p>{mail.body}</p>
            </article>

        </section>

    }
}