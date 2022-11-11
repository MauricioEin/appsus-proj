import mailPreview from "./mail-preview.cmp.js"
import mailContentHeader from "./mail-content-header.cmp.js"

export default {
    props: ['mails'],
    template: `
    <section class="mail-list">    
        <mail-content-header :isChecked="checkedMails.length"
            :isToRead="isToRead" :isDetails="false" @unread="toUnread"/>
        <ul class="clean-list">
            <li v-for="mail in mails" :key="mail.id">
                <mail-preview :mail="mail" @click="onDetails(mail.id)" @checked="onChecked" @starred="onStarred" @important="onImportant"/>
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
            checkedMails: [],
            isToRead: false,
        }
    },
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
            this.isToRead = this.checkedMails.some(checkedId => {
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
        },
        onImportant(isToImportant, mailId) {
            this.$emit('important', mailId, isToImportant)
        }

    },
    components: {
        mailPreview,
        mailContentHeader
    }
}