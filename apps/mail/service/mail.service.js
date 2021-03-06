import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const mailService = {
    query,
    getById,
    removeMail,
    isRead,
    composeMail,
    isNotRead,
    isStared,
    mailCount,
    setMailSort,
    composeDraftMail
}
const KEY = 'mailsDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
}

function query(filterBy) {
    let mails = _loadFromStorage()
    if (!mails) {
        mails = _createMails()
        console.log('mails', mails);
        _saveToStorage(mails)
    }
    if (filterBy) {
        let { txt, isRead } = filterBy
        if (!isRead) isRead = 'all'
        if (isRead === 'false') isRead = false
        else if (isRead === 'true') isRead = true
        mails = mails.filter(mail => {
            if (isRead === 'all') return (mail.from.toLowerCase().includes(txt.toLowerCase())
                || mail.subject.toLowerCase().includes(txt.toLowerCase()))

            return ((mail.from.toLowerCase().includes(txt.toLowerCase()) && mail.isRead === isRead)
                || (mail.subject.toLowerCase().includes(txt.toLowerCase()) && mail.isRead === isRead))
        })
    }

    return Promise.resolve(mails)
}

function mailCount() {
    let mails = _loadFromStorage()
    if (!mails) return
    const unReadMails = mails.filter(mail => !mail.isRead && mail.status === 'inbox')
    if (!unReadMails) return
    return unReadMails.length

}

function setMailSort(sortBy = {}) {
    console.log(sortBy);
    let mails = _loadFromStorage()
    if (sortBy.date !== undefined) {
        mails.sort((c1, c2) => (c1.sentAt - c2.sentAt) * sortBy.date)
    }
    else if (sortBy.title !== undefined) {
        mails.sort((c1, c2) => c1.from.localeCompare(c2.from) * sortBy.title);
    }

    return Promise.resolve(mails)
}

function composeMail(mail, mailId) {
    let mails = _loadFromStorage()
    const mailIndex = mails.findIndex(mail => mailId === mail.id)
    if (mailIndex >= 0) {
        mails[mailIndex].to = mail.to
        mails[mailIndex].subject = mail.subject
        mails[mailIndex].body = mail.msg
        mails[mailIndex].status = 'sent'
    }
    else {
        const sentMail = _createMail('Me', mail.subject, mail.msg, mail.to, 'sent')
        mails.unshift(sentMail)
    }
    _saveToStorage(mails)
    return Promise.resolve(mails)
}


function composeDraftMail(mail, mailId) {
    let mails = _loadFromStorage()
    const draftMailIndex = mails.findIndex(mail => mailId === mail.id)
    if (draftMailIndex >= 0) {
        mails[draftMailIndex].to = mail.to
        mails[draftMailIndex].subject = mail.subject
        mails[draftMailIndex].body = mail.msg
    }
    else {
        if (!mail.subject) return
        const sentMail = _createMail('Me', mail.subject, mail.msg, mail.to, 'draft')
        mails.unshift(sentMail)
    }

    _saveToStorage(mails)
    return Promise.resolve(mails)
}



function getById(mailId) {
    const mails = _loadFromStorage()
    const mail = mails.find(mail => mailId === mail.id)
    return Promise.resolve(mail)
}

function removeMail(mailId) {
    let mails = _loadFromStorage()
    let mailIndex = mails.findIndex(mail => mailId === mail.id)
    if (mails[mailIndex].status === 'trash') mails.splice(mailIndex, 1)
    else mails[mailIndex].status = 'trash'
    _saveToStorage(mails)
    return Promise.resolve(mails)
}

function isRead(mailId) {
    let mails = _loadFromStorage()
    let mailIndex = mails.findIndex(mail => mailId === mail.id)
    mails[mailIndex].isRead = true
    _saveToStorage(mails)
    return Promise.resolve(mails)
}

function isStared(mailId) {
    let mails = _loadFromStorage()
    let mailIndex = mails.findIndex(mail => mailId === mail.id)
    mails[mailIndex].isStared = !mails[mailIndex].isStared
    _saveToStorage(mails)
    return Promise.resolve(mails)
}

function isNotRead(mailId) {
    let mails = _loadFromStorage()
    let mailIndex = mails.findIndex(mail => mailId === mail.id)
    mails[mailIndex].isRead = false
    _saveToStorage(mails)
    return Promise.resolve(mails)
}

function _createMails() {
    const mails = []
    mails.push(_createMail('Jonathan Ben Zeev', 'Miss you!', 'Would love to catch up sometimes', '<momo@momo.com>', 'inbox'))
    mails.push(_createMail('Jonathan Ben Zeev', 'Miss you!', 'Would love to catch up sometimes', '<momo@momo.com>', 'inbox'))
    mails.push(_createMail('Spotify', 'made for BFFs', '3 months of Premium for ???19.90', '<no-reply@spotify.com> ', 'inbox'))
    mails.push(_createMail('Dropbox', 'Activity in Shared Folders', 'Follow specific folders and get focused updates Follow folders to get more detailed insights, reported instantly or once per day. Choose a folder to follow', ' <no-reply@dropbox.com>', 'inbox'))
    mails.push(_createMail(' Apple', 'Your invoice from Apple.', '  You have the option to stop receiving email receipts for your subscription renewals. If you have opted out, you can still view your receipts in your account under Purchase History. To manage receipts or to opt in again, go to Account Settings.', '<no_reply@email.apple.com>', 'sent'))
    mails.push(_createMail(' Apple', 'Your invoice from Apple.', '  You have the option to stop receiving email receipts for your subscription renewals. If you have opted out, you can still view your receipts in your account under Purchase History. To manage receipts or to opt in again, go to Account Settings.', '<no_reply@email.apple.com>', 'sent'))
    mails.push(_createMail(' Apple', 'Your invoice from Apple.', '  You have the option to stop receiving email receipts for your subscription renewals. If you have opted out, you can still view your receipts in your account under Purchase History. To manage receipts or to opt in again, go to Account Settings.', '<no_reply@email.apple.com>', 'inbox'))
    mails.push(_createMail(' Apple', 'Your invoice from Apple.', '  You have the option to stop receiving email receipts for your subscription renewals. If you have opted out, you can still view your receipts in your account under Purchase History. To manage receipts or to opt in again, go to Account Settings.', '<no_reply@email.apple.com>', 'inbox'))
    mails.push(_createMail(' Apple', 'Your invoice from Apple.', '  You have the option to stop receiving email receipts for your subscription renewals. If you have opted out, you can still view your receipts in your account under Purchase History. To manage receipts or to opt in again, go to Account Settings.', '<no_reply@email.apple.com>', 'inbox'))

    return mails
}


function _createMail(from, subject, body, to, status) {
    return {
        id: utilService.makeId(),
        from,
        subject,
        body,
        isStared: false,
        isRead: false,
        sentAt: new Date().toLocaleTimeString(),
        to,
        status,
    }
}



function _saveToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}