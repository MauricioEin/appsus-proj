import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

import demoMails from '../hard-coded-data/demoMails.json' assert {type: 'json'}


export const mailService = {
  query,
  send,
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

function query() {
  return storageService.query(MAIL_KEY)
    .then(res => {
      if (res && res.length > 0) return res
      utilService.saveToStorage(MAIL_KEY, demoMails)
      return demoMails
    })
}

function send(to, subject, body) {
  const mail = {
    subject,
    body,
    isRead: false,
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

