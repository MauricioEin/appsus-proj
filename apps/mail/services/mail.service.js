import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

import demoMails from '../hard-coded-data/demoMails.json' assert {type: 'json'}


export const mailService = {
  query,
  getFolders,
  save,
  toUnread,
  // get,
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

function toUnread(mail, isToUnread = true) {
  mail.isRead = !isToUnread
  return storageService.put(MAIL_KEY, mail)
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