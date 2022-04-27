import { utilService } from './util.service.js'
import { storageService } from './storage.service.js'

export const mailService = {
    query
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


function _createMails() {
    const mails = []
    mails.push(_createMail('Miss you!', 'Would love to catch up sometimes', 'momo@momo.com'))
    return mails
}


function _createMail(subject, body, to) {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: +new Date,
        to
    }
}

function _saveToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}