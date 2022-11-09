import { mailService } from '../services/mail.service.js'

import mailList from '../cmps/mail-list.cmp.js'


export default {
    template: `
    <main class="mail-container">
        <mail-list :mails="mails" />
    </main>

    `
    ,
    data() {
        return {
            mails: null,
        }
    },
    created() {
        mailService.query()
            .then(mails => this.mails = mails)

    },
    components: {
        // mailService,
        mailList
    }
}