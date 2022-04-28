import { MailPreview } from '../cmps/mail-preview.jsx'


export function MailList({ mails, onIsRead, onIsStared }) {

    return <section className="mail-list">
        {mails.map(mail => <MailPreview key={mail.id}
            mail={mail}
            onIsRead={onIsRead}
            onIsStared={onIsStared}
        />)}
    </section>
}