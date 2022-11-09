import { mailService } from '../services/mail.service.js'

import mailList from '../cmps/mail-list.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import newMail from '../cmps/new-mail.cmp.js'

export default {
    template: `
    <header class="mail-header flex">
        <div class="flex">
            <button title="Main menu">🍔</button>
            <div title="Mr. Mail">logo</div>
        </div>
        <mail-filter @filter="setFilter"/>
        <div class="flex">
            <button title="Support">❔</button>
            <button title="settings">⚙</button>
            <button title="Appsus apps">🧮</button>
            <button title="User">👤</button>

        </div>

    </header>

    <div class="main-container flex">
        <aside>
            <button @click="onCompose">✏ Compose</button>
            <ul class="mail-menu">
                <li></li>
            </ul>
        </aside>
        <main class="mail-container">
            <mail-list :mails="mailsToShow" />
            <new-mail v-if="isCompose" />
        </main>
    </div>

    `
    ,
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
        onCompose() {
            this.isCompose = true
        }
    },
    components: {
        mailFilter,
        mailList,
        newMail
    }
}