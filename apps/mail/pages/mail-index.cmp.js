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
            :count="count" @compose="compose" @folder="showFolder"/>
        <main class="mail-container">
            <mail-list v-if="!selectedMail" :mails="mailsToShow" :key="listKey" :folder="folder"
            :defIsToRead="isToRead" @sort="doSort" @unread="toUnread"
             @details="openDetails" @starred="onStarred" @important="onImportant"
                 @trash="trash" @spam="spam" @eliminate="eliminate" @refresh="listKey++"/>
            <mail-details v-else :id="selectedMail" :folder="folder"
             @update="loadMails(); loadFolders();" @close="selectedMail=null"/>
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
            sortBy: {
                attr: 'sentAt',
                asc: false,
            },
            isCompose: false,
            isNavWide: true,
            headerKey: 0,
            listKey: 0,
            folder: 'Inbox',
            selectedMail: null,
            count: {
                spam: null,
                draft: null,
                unread: null,
            },
            isToRead: null,
        }
    },
    created() {
        this.loadMails()
        this.loadFolders()
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
        },
    },
    methods: {
        loadMails() {
            return mailService.query(this.folder, this.sortBy)
                .then(mails => {
                    this.mails = mails
                    this.filter = ''
                })
        },
        loadFolders() {
            mailService.getFolders()
                .then(folders => this.foldersToNav = folders)
            mailService.countMail('isSpam').then(count => this.count.spam = count)
            mailService.countMail('isDraft').then(count => this.count.draft = count)
            mailService.countMail('isRead', true).then(count => this.count.unread = count)
        },
        setFilter(searchStr) {
            this.filter = searchStr
        },
        compose(isCompose = true) {
            this.isCompose = isCompose
        },
        toUnread(ids, isToUnread) {
            const mailsToUnread = ids.map(id => this.mails.find(mail => mail.id === id))
            mailService.toUnread(mailsToUnread, isToUnread).then(() => {
                this.isToRead = isToUnread
                this.loadMails()
                mailService.countMail('isRead', true).then(count => this.count.unread = count)
            })
        },
        showFolder(folder) {
            this.folder = folder
            this.headerKey++ //for emptying search bar
            this.listKey++ // for emptying checked mails
            this.loadMails().then(() => this.selectedMail = null)
        },
        openDetails(id) {
            this.selectedMail = id
        },
        onStarred(id, isToStarred) {
            mailService.toStar(id, isToStarred).then(() => this.loadMails())
        },
        onImportant(id, isToImportant) {
            mailService.toImportant(id, isToImportant).then(() => this.loadMails())
        },
        trash(ids) {
            const mailsToTrash = ids.map(id => this.mails.find(mail => mail.id === id))
            mailService.toTrash(mailsToTrash).then(() => {
                this.loadMails()
                this.loadFolders()
            })
        },
        spam(ids) {
            const mailsToSpam = ids.map(id => this.mails.find(mail => mail.id === id))
            mailService.toSpam(mailsToSpam).then(() => {
                this.loadMails()
                this.loadFolders()
            })
        },
        eliminate(ids) {
            mailService.eliminate(ids).then(() => {
                this.loadMails()
                if (this.folder === 'Spam')
                    mailService.countMail('isSpam').then(count => this.count.spam = count)
            })
        },
        doSort(attr) {
            console.log('sorting by', attr)
            if (this.sortBy.attr === attr) this.sortBy.asc = !this.sortBy.asc
            else this.sortBy = { attr: attr, asc: attr !== 'sentAt' }
            this.loadMails()

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