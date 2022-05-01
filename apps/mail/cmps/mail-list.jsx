import { MailPreview } from '../cmps/mail-preview.jsx'


export function MailList({ mails, onIsRead, onIsStared, onRemoveMail, onOpenDraft, isToggle, closeMenu }) {

    return <section className={`mail-list ${isToggle ? 'blur' : ''}`} onClick={closeMenu}>
        {mails.map(mail => <MailPreview key={mail.id}
            mail={mail}
            onIsRead={onIsRead}
            onIsStared={onIsStared}
            onRemoveMail={onRemoveMail}
            onOpenDraft={onOpenDraft}
        />)}

    </section>
}