import { MailPreview } from '../cmps/mail-preview.jsx'


export function MailList({ mails }) {

    return <section className="mail-list">
        {mails.map(mail => <MailPreview key={mail.id}
            mail={mail}
        />)}
    </section>
}