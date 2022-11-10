import { mailService } from '../services/mail.service.js'

import mailList from '../cmps/mail-list.cmp.js'
import newMail from '../cmps/new-mail.cmp.js'
import mailNav from '../cmps/mail-nav.cmp.js'
import mailAppHeader from '../cmps/mail-app-header.cmp.js'
import mailDetails from './mail-details.cmp.js'

export default {
    template: `
    <section class="mail-app full">
    <mail-app-header :key="headerKey" @filter="setFilter" @toggleNav="isNavWide=!isNavWide"/>

    <div class="main-container flex">
        <mail-nav :folders="foldersToNav" :isWide="isNavWide" @compose="compose" @folder="showFolder"/>
        <main class="mail-container">
            <mail-list v-if="!selectedMail" :mails="mailsToShow" @unread="toUnread" @details="openDetails"/>
            <mail-details v-else :id="selectedMail" @close="selectedMail=null"/>
        </main>
    </div>
    
    <new-mail v-if="isCompose" @close="compose" />
</section>
    `,
    data() {
        return {
            mails: null,
            foldersToNav: null,
            filter: null,
            isCompose: false,
            isNavWide: true,
            headerKey: 0,
            folder: 'Inbox',
            selectedMail: null,
        }
    },
    created() {
        mailService.query(this.folder)
            .then(mails => {
                this.mails = mails
            })
        mailService.getFolders()
            .then(folders => this.foldersToNav = folders)
    },
    computed: {
        mailsToShow() {
            if (!this.filter) return this.mails
            const filters = this.filter.split(' ').map(filter => filter.trim())
            var mails = this.mails
            filters.forEach(filter => {
                console.log('filter', filter)
                const regex = new RegExp(filter, 'i')
                mails = mails.filter(mail => regex.test(JSON.stringify(Object.values(mail))))
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
        },
        showFolder(folder) {
            this.filter = ''
            this.folder = folder
            this.headerKey++
            mailService.query(this.folder)
                .then(mails => {
                    this.mails = mails
                })
        },
        openDetails(id) {
            console.log('opening with', id)
            this.selectedMail = id
        }
    },
    components: {
        mailList,
        mailNav,
        mailAppHeader,
        newMail,
        mailDetails
    }
}