import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const mailService = {
    query,
    getById,
    removeMail
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

function query() {
    let mails = _loadFromStorage()
    if (!mails) {
        mails = _createMails()
        console.log('mails', mails);
        _saveToStorage(mails)
    }
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
    mails[mailIndex].isRemoved = true

}

function _createMails() {
    const mails = []
    mails.push(_createMail('Jonathan Ben Zeev', 'Miss you!', 'Would love to catch up sometimes', 'momo@momo.com'))
    mails.push(_createMail('Jonathan Ben Zeev', 'Miss you!', 'Would love to catch up sometimes', 'momo@momo.com'))
    mails.push(_createMail('Jonathan Ben Zeev', 'Miss you!', 'Would love to catch up sometimes', 'momo@momo.com'))
    mails.push(_createMail('Jonathan Ben Zeev', 'Miss you!', 'Would love to catch up sometimes', 'momo@momo.com'))
    mails.push(_createMail('Jonathan Ben Zeev', 'Miss you!', 'Would love to catch up sometimes', 'momo@momo.com'))
    mails.push(_createMail('Jonathan Ben Zeev', 'Miss you!', 'Would love to catch up sometimes', 'momo@momo.com'))
    mails.push(_createMail('Jonathan Ben Zeev', 'Miss you!', 'Would love to catch up sometimes', 'momo@momo.com'))
    mails.push(_createMail('Jonathan Ben Zeev', 'Miss you!', 'Would love to catch up sometimes', 'momo@momo.com'))
    mails.push(_createMail('Jonathan Ben Zeev', 'Miss you!', 'Would love to catch up sometimes', 'momo@momo.com'))
    mails.push(_createMail('Jonathan Ben Zeev', 'Miss you!', 'Would love to catch up sometimes', 'momo@momo.com'))
    return mails
}


function _createMail(from, subject, body, to) {
    return {
        id: utilService.makeId(),
        from,
        subject,
        body,
        isRead: false,
        isRemoved: false,
        sentAt: new Date().toLocaleTimeString(),
        to
    }
}

function _saveToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}