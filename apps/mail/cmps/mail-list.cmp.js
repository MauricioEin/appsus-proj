import mailPreview from "./mail-preview.cmp.js"
import mailContentHeader from "./mail-content-header.cmp.js"

export default {
    props: ['mails', 'folder', 'defIsToRead', 'sortBy'],
    template: `
    <section class="mail-list">    
        <mail-content-header :isChecked="checkedMails.length" :folder="folder"
            :isToRead="isToRead" :isDetails="false" @refresh="$emit('refresh')" @unread="toUnread"
            @trash="$emit('trash',checkedMails);this.checkedMails = [];" @spam="$emit('spam',checkedMails);this.checkedMails = [];" 
            @eliminate="$emit('eliminate', checkedMails)"/>
            <article class="mail-preview mail-sort flex justify-between unread" :class="{descending:!sortBy.asc}">
                <span></span>   <span></span>   <span></span>
                <div @click="$emit('sort','from')" class="sort-title capitalized"><span :class="{sorting:sortBy.attr==='from'}">From</span></div>
                <div class="sort-title" @click="$emit('sort','subject')"><span :class="{sorting:sortBy.attr==='subject'}">Subject</span></div>
                <div></div>
                <div class="sort-title" @click="$emit('sort','sentAt')"><span :class="{sorting:sortBy.attr==='sentAt'}">Sent</span></div>
            </article>
        <ul class="clean-list" v-if="mails && mails.length">
            <li v-for="mail in mails" :key="mail.id">
                <mail-preview :mail="mail" @click="onDetails(mail.id)" @checked="onChecked" @starred="onStarred" @important="onImportant"/>
            </li>
        </ul>
        <div class="no-mails" v-else>
            No messages to show
        </div>
    </section>
    `,
    data() {
        return {
            checkedMails: [],
            isToRead: this.defIsToRead,

            // groupIdx: 0,

        }
    },
    // computed: {
    //     mailsToShow() {
    //         return this.mails.slice(groupIdx, groupIdx + 25)
    //     }
    // },
    methods: {
        onChecked(isChecked, id) {
            if (isChecked) this.checkedMails.push(id)
            else {
                const idx = this.checkedMails.findIndex(mail => mail === id)
                this.checkedMails.splice(idx, 1)
            }
            this.updateToRead()
        },
        updateToRead() {
            console.log('checkedmails', this.checkedMails)
            this.isToRead = this.checkedMails.some(checkedId => {
                console.log('mails', this.mails)
                const checkedMail = this.mails.find(mail => mail.id === checkedId)
                return !checkedMail.isRead
            })
        },
        toUnread() {
            this.$emit('unread', this.checkedMails, !this.isToRead)
        },
        onDetails(id) {
            this.$emit('details', id)
        },
        onStarred(isToStarred, mailId) {
            this.$emit('starred', mailId, isToStarred)
            if (this.folder === 'Starred') this.checkedMails = []
        },
        onImportant(isToImportant, mailId) {
            this.$emit('important', mailId, isToImportant)
            if (this.folder === 'Important') this.checkedMails = []

        },

    },
    watch: {
        defIsToRead() {
            this.isToRead = this.defIsToRead
        }
    },
    components: {
        mailPreview,
        mailContentHeader
    }
}