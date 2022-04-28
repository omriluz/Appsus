import { utilService } from "../../../services/util.service.js"


const { Link } = ReactRouterDOM

export function MailPreview({ mail, onIsRead }) {
    return <Link to={`/mail/${mail.id}`}>
        <section className={`mail-preview flex ${mail.isRead ? 'read' : ''} `}
            onClick={() => onIsRead(mail.id)} >
            <div className="from-name"><h6>{mail.from}</h6></div>
            <div className="subject-body"><h6>{utilService.subCharts(mail.subject, 25)} - <span>{utilService.subCharts(mail.body, 27)}...</span> </h6></div>
            <div className="sent-at"><h6>{mail.sentAt}</h6></div>
        </section>
    </Link>

}