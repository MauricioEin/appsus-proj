import { mailService } from '../services/mail.service.js'

import mailList from '../cmps/mail-list.cmp.js'
import newMail from '../cmps/new-mail.cmp.js'
import mailNav from '../cmps/mail-nav.cmp.js'
import mailAppHeader from '../cmps/mail-app-header.cmp.js'

export default {
    template: `
    <section class="mail-app full">
    <mail-app-header @filter="setFilter"/>

    <div class="main-container flex">
        <mail-nav @compose="compose"/>
        <main class="mail-container">
            <mail-list :mails="mailsToShow" @unread="toUnread" />
        </main>
    </div>
    
    <new-mail v-if="isCompose" @close="compose" />
</section>
    `,
    data() {
        return {
            mails: null,
            filter: null,
            isCompose: false,
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
        compose(isCompose = true) {
            this.isCompose = isCompose
        },
        toUnread(ids, isToUnread) {
            ids.forEach(id => {
                var mailToUnread = this.mails.find(mail => mail.id === id)
                mailService.toUnread(mailToUnread, isToUnread)
                    .then(mail => mailToUnread = mail)
            })
        }
    },
    components: {
        mailList,
        mailNav,
        mailAppHeader,
        newMail
    }
}