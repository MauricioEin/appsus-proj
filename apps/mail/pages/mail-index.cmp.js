import { mailService } from '../services/mail.service.js'

import mailList from '../cmps/mail-list.cmp.js'
import newMail from '../cmps/new-mail.cmp.js'
import mailNav from '../cmps/mail-nav.cmp.js'
import mailAppHeader from '../cmps/mail-app-header.cmp.js'
import mailDetails from './mail-details.cmp.js'

export default {
    template: `
    <section class="mail-app full">
    <mail-app-header :key="headerKey" @logo="showFolder"
        @filter="setFilter" @toggleNav="isNavWide=!isNavWide"/>

    <div class="principal-container flex">
        <mail-nav :folders="foldersToNav" :selected="folder" :isWide="isNavWide"
            @compose="compose" @folder="showFolder"/>
        <main class="mail-container">
            <mail-list v-if="!selectedMail" :mails="mailsToShow" :key="listKey"
                 @unread="toUnread" @details="openDetails"/>
            <mail-details v-else :id="selectedMail" @update="loadMails" @close="selectedMail=null"/>
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
            listKey:0,
            folder: 'Inbox',
            selectedMail: null,
        }
    },
    created() {
        this.loadMails()
        mailService.getFolders()
            .then(folders => this.foldersToNav = folders)
    },
    computed: {
        mailsToShow() {
            if (!this.filter) return this.mails
            const filters = this.filter.split(' ').map(filter => filter.trim())
            var mails = this.mails
            filters.forEach(filter => {
                const regex = new RegExp(filter, 'i')
                mails = mails.filter(mail => regex.test(JSON.stringify(Object.values(mail))))
            })
            return mails
        }
    },
    methods: {
        loadMails() {
            mailService.query(this.folder)
                .then(mails => {
                    this.mails = mails
                    this.filter = ''
                })
        },
        setFilter(searchStr) {
            this.filter = searchStr
        },
        compose(isCompose = true) {
            this.isCompose = isCompose
        },
        toUnread(ids, isToUnread) {
            const mailsToUnread = ids.map(id => this.mails.find(mail => mail.id === id))
            mailService.toUnread(mailsToUnread, isToUnread).then(() => this.loadMails())
        },
        showFolder(folder) {
            this.folder = folder
            this.headerKey++ //for emptying search bar
            this.listKey++ // for emptying checked mails
            this.loadMails()
        },
        openDetails(id) {
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