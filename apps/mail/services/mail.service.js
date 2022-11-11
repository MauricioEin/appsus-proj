import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

import demoMails from '../hard-coded-data/demoMails.json' assert {type: 'json'}


export const mailService = {
  query,
  getFolders,
  save,
  toUnread,
  get,
  toStar,
  toImportant,
  // save,
  // paramMap: getParamaeterMap,
  // getEmptyBook,
  // getNeighbours,
  // search: querySearch
}

const MAIL_KEY = 'mailDB'
const USER = {
  email: 'user@appsus.com',
  fullname: 'User Cohen'
}
const folders = [
  { title: 'Inbox', icon: '📥' },
  { title: 'Starred', icon: '⭐' },
  { title: 'Important', icon: '🏷' },
  { title: 'Sent', icon: '▶' },
  { title: 'Drafts', icon: '📄' },
  { title: 'Spam', icon: '⚠' },
  { title: 'Snoozed', icon: '🕑' },
  { title: 'Scheduled', icon: '⏳' },
  { title: 'All mail', icon: '📪' },
  { title: 'Trash', icon: '🗑' },
]
function query(folder) {
  return storageService.query(MAIL_KEY)
    .then(res => {
      if (!res || !res.length) {
        utilService.saveToStorage(MAIL_KEY, demoMails)
        res = demoMails
      }
      if (folder === 'All mail') return res
      return _filterFolder(res, folder)
    })
}
function get(mailId) {
  return storageService.get(MAIL_KEY, mailId)
}

function getFolders(delay = 200) {
  return new Promise(resolve => setTimeout(() => resolve(folders), delay))

}

function save(to, subject, body, isDraft = false) {
  if (!to && !subject && !body) return
  const mail = {
    subject,
    body,
    isRead: to !== USER.email,
    isDraft,
    sentAt: Date.now(),
    from: USER.email,
    to
  }
  storageService.post(MAIL_KEY, mail, false)
}

function toUnread(mailsToChange, isToUnread = true) {
  if (!Array.isArray(mailsToChange)) mailsToChange = [mailsToChange]
  return query('All mail').then(mails => {
    mails.forEach(mail => {
      if (mailsToChange.some(mailToChange => mailToChange.id === mail.id))
        mail.isRead = !isToUnread
    })
    utilService.saveToStorage(MAIL_KEY, mails)
  })
}

function toStar(id, isToStarred) {
  return get(id).then(mail => {
    mail.isStarred = isToStarred
    return storageService.put(MAIL_KEY, mail)
  })
}

function toImportant(id, isToImportant) {
  return get(id).then(mail => {
    mail.isImportant = isToImportant
    return storageService.put(MAIL_KEY, mail)
  })
}


function _filterFolder(mails, folder) {
  switch (folder) {
    case 'Inbox':
      return mails.filter(mail => mail.to === USER.email && !mail.isTrash && !mail.isSpam)
    case 'Starred':
      return mails.filter(mail => mail.isStarred)
    case 'Important':
      return mails.filter(mail => mail.isImportant)
    case 'Sent':
      return mails.filter(mail => mail.from === USER.email && !mail.isDraft)
    case 'Drafts':
      return mails.filter(mail => mail.isDraft)
    case 'Spam':
      return mails.filter(mail => mail.isSpam)
    case 'Snoozed':
      return mails.filter(mail => mail.isSnoozed)
    case 'Scheduled':
      return mails.filter(mail => mail.isScheduled)
    case 'Trash':
      return mails.filter(mail => mail.isTrash)
  }

}