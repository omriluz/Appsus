import { utilService } from "../../../services/util.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"



const { Link } = ReactRouterDOM

export function MailPreview({ mail, onIsRead, onIsStared, onRemoveMail, onOpenDraft }) {
    return <section className={`mail-preview flex ${mail.isRead ? 'read' : ''} `}>
        <div onClick={() => onRemoveMail(mail.id)} className="trash"><i className="fa-solid fa-trash "></i></div>
        <div className={`star ${mail.isStared ? 'gold' : 'black'} `} onClick={() => onIsStared(mail.id)} ><i className="fa-solid fa-star"></i></div>
        {mail.status === 'draft' ? <div onClick={() => { onOpenDraft(mail.id) }} >
            <div className="from-name"><h6>{mail.from}</h6></div>
            <div className="subject-body"><h6>{utilService.subCharts(mail.subject, 25)} - <span>{utilService.subCharts(mail.body, 27)}...</span> </h6></div>
            <div className="sent-at"><h6>{mail.sentAt}</h6></div>
        </div> : <Link to={`/mail/${mail.id}`}>
            <div onClick={() => { onIsRead(mail.id) }} >
                <div className="from-name"><h6>{mail.from}</h6></div>
                <div className="subject-body"><h6>{utilService.subCharts(mail.subject, 25)} - <span>{utilService.subCharts(mail.body, 27)}...</span> </h6></div>
                <div className="sent-at"><h6>{mail.sentAt}</h6></div>
            </div>
        </Link>}
    </section>


}