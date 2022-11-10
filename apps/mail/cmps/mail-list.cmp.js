import mailPreview from "./mail-preview.cmp.js"
import mailListHeader from "./mail-list-header.cmp.js"

export default {
    props: ['mails'],
    template: `
    <section class="mail-list">
        <mail-list-header :isChecked="checkedMails.length" :isToRead="isToRead" @unread="toUnread"/>
        <ul class="clean-list">
            {{checkedMails}}
            {{isToRead}}
            <li v-for="mail in mails" :key="mail.id">
                <mail-preview :mail="mail" @checked="onChecked"/>
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
            checkedMails: [],
        }
    },
    computed: {
        isToRead() {
            return this.checkedMails.some(checkedId => {
                const checkedMail = this.mails.find(mail => mail.id === checkedId)
                console.log('checkedMail', checkedMail)
                return !checkedMail.isRead
            })
        }
    },
    methods: {
        onChecked(isChecked, id) {
            if (isChecked) this.checkedMails.push(id)
            else {
                const idx = this.checkedMails.findIndex(mail => mail === id)
                this.checkedMails.splice(idx, 1)
            }
        },
        toUnread() {
            console.log('isToRead?', this.isToRead)
            this.$emit('unread', this.checkedMails, !this.isToRead)
        }
    },
    components: {
        mailPreview,
        mailListHeader
    }
}