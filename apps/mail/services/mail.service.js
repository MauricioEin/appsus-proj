import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

import demoMails from '../hard-coded-data/demoMails.json' assert {type: 'json'}


export const mailService = {
    query,
    // get,
    // save,
    // paramMap: getParamaeterMap,
    // getEmptyBook,
    // getNeighbours,
    // search: querySearch
  }
  
  const MAIL_KEY = 'mailDB'

function query() {
  return storageService.query(MAIL_KEY)
    .then(res => {
      if (res && res.length > 0) return res
      utilService.saveToStorage(MAIL_KEY, demoMails)
      return demoMails
    })
}

