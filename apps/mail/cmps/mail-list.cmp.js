import mailPreview from "./mail-preview.cmp.js"
import mailContentHeader from "./mail-content-header.cmp.js"

export default {
    props: ['mails', 'folder', 'defIsToRead'],
    template: `
    <section class="mail-list">    
        <mail-content-header :isChecked="checkedMails.length" :folder="folder"
            :isToRead="isToRead" :isDetails="false" @refresh="$emit('refresh')" @unread="toUnread"
            @trash="$emit('trash',checkedMails)" @spam="$emit('spam',checkedMails)" 
            @eliminate="$emit('eliminate', checkedMails)"/>
        <ul class="clean-list" v-if="mails.length">
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