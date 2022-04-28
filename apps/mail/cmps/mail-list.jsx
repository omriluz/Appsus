import { MailPreview } from '../cmps/mail-preview.jsx'


export function MailList({ mails, onIsRead }) {

    return <section className="mail-list">
        {mails.map(mail => <MailPreview key={mail.id}
            mail={mail}
            onIsRead={onIsRead}
        />)}
    </section>
}