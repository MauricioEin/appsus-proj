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
  toSpam,
  toTrash,
  getNeighbourIds,
  countMail,
  eliminate,
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
function query(folder = 'Inbox', sortBy) {
  console.log(arguments)
  return storageService.query(MAIL_KEY)
    .then(res => {
      if (!res || !res.length) {
        utilService.saveToStorage(MAIL_KEY, demoMails)
        res = demoMails
      }
      if (sortBy) res = _sortMails(res, sortBy)
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

function toSpam(mailsToChange) {
  if (!Array.isArray(mailsToChange)) mailsToChange = [mailsToChange]
  return query('All mail').then(mails => {
    mails.forEach(mail => {
      if (mailsToChange.some(mailToChange => mailToChange.id === mail.id))
        mail.isSpam = !mail.isSpam
    })
    utilService.saveToStorage(MAIL_KEY, mails)
  })
}

function toTrash(mailsToChange) {
  if (!Array.isArray(mailsToChange)) mailsToChange = [mailsToChange]
  return query('All mail').then(mails => {
    mails.forEach(mail => {
      if (mailsToChange.some(mailToChange => mailToChange.id === mail.id))
        mail.isTrash = !mail.isTrash
    })
    utilService.saveToStorage(MAIL_KEY, mails)
  })
}

function eliminate(idsToEliminate) {
  if (!Array.isArray(idsToEliminate)) idsToEliminate = [idsToEliminate]

  return storageService.query(MAIL_KEY).then(mails => {
    idsToEliminate.forEach(idToEliminate => {
      const idx = mails.findIndex(mail => mail.id === idToEliminate)
      if (idx < 0) throw new Error(`Unknown Entity ${idToEliminate}`)
      mails.splice(idx, 1)
    })
    utilService.saveToStorage(MAIL_KEY, mails)
  })
}

function getNeighbourIds(id, folder) {
  return query(folder).then(mails => {
    const idx = mails.findIndex(mail => mail.id === id)
    const prevIdx = idx - 1
    const nextIdx = idx + 1
    return {
      prev: mails[prevIdx] ? mails[prevIdx].id : null,
      next: mails[nextIdx] ? mails[nextIdx].id : null,
      currIdx: idx, mailCount: mails.length
    }
  })
}

function countMail(attribute, negative = false) {
  return storageService.query(MAIL_KEY)
    .then(mails => {
      if (attribute !== 'isRead') return mails.filter(mail => mail[attribute]).length
      return _filterFolder(mails, 'Inbox').filter(mail => !mail.isRead).length
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

function _sortMails(mails, sortBy) {
  console.log(sortBy)
  const factor = sortBy.asc ? 1 : -1
  if (sortBy.attr === 'sentAt')
    return mails.sort((mail1, mail2) => factor * (mail1.sentAt - mail2.sentAt))
  return mails.sort((mail1, mail2) => factor * (mail1[sortBy.attr].localeCompare(mail2[sortBy.attr])))
}