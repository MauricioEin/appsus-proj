import { mailService } from '../services/mail.service.js'

import mailList from '../cmps/mail-list.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import newMail from '../cmps/new-mail.cmp.js'

export default {
    template: `
    <button @click="onCompose">✏ Compose</button>
    <mail-filter @filter="setFilter"/>
    <main class="mail-container">
        <mail-list :mails="mailsToShow" />
        <new-mail />
    </main>

    `
    ,
    data() {
        return {
            mails: null,
            filter: null
        }
    },
    created() {
        mailService.query()
            .then(mails => this.mails = mails)
    },
    computed: {
        mailsToShow() {
            if (!this.filter) return this.mails
            const filters = this.filter.split(' ').map(filter => filter.trim())
            var mails = this.mails
            filters.forEach(filter => {
                console.log('filter', filter)
                const regex = new RegExp(filter, 'i')
                mails = mails.filter(mail => regex.test(JSON.stringify(mail)))
            })
            return mails
        }
    },
    methods: {
        setFilter(searchStr) {
            this.filter = searchStr
            console.log('new filter:', this.filter)
        },
        onCompose(){
            console.log('composing')

        }
    },
    components: {
        // mailService,
        mailFilter,
        mailList,
        newMail
    }
}