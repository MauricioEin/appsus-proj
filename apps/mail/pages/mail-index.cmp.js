import { mailService } from '../services/mail.service.js'

import mailList from '../cmps/mail-list.cmp.js'
import newMail from '../cmps/new-mail.cmp.js'
import mailNav from '../cmps/mail-nav.cmp.js'
import mailAppHeader from '../cmps/mail-app-header.cmp.js'

export default {
    template: `
    <section class="mail-app">
    <mail-app-header @filter="setFilter"/>

    <div class="main-container flex">
        <mail-nav @compose="compose"/>
        <main class="mail-container">
            <mail-list :mails="mailsToShow" />
        </main>
    </div>
    
    <new-mail v-if="isCompose" />
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
        this.$emit('isApp', true)
        mailService.query()
            .then(mails => this.mails = mails)
    },
    unmounted() {
        this.$emit('isApp', false)
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
        compose() {
            this.isCompose = true
        }
    },
    components: {
        mailList,
        mailNav,
        mailAppHeader,
        newMail
    }
}