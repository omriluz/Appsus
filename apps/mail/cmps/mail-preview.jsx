const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {
    return <Link to={`/mail/${mail.id}`}>
        <section className="mail-preview flex">
            <div className="from-name"><h6>{mail.from}</h6></div>
            <div className="subject"><h6>{mail.subject} -</h6></div>
            <div className="body"><h6>{mail.body}...</h6></div>
            <div className="sent-at"><h6>{mail.sentAt}</h6></div>
        </section>
    </Link>

}