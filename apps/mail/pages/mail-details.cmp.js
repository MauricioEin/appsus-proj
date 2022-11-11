import { mailService } from "../services/mail.service.js"
import mailContentHeader from "../cmps/mail-content-header.cmp.js"

export default {
    props: ['id'],
    template: `
    <section class="mail-details">
        <mail-content-header  :isChecked="true" :isToRead="false"
            :isDetails="true" @unread="toUnread" @back="close" />
        <main v-if="mail">
            <h1>{{mail.subject}}<span class="btn" @click="onImportant"><img class="importance-label" src="../../../assets/img/label-important.svg" :class="{'label-important':mail.isImportant}" :title="importantTitle"/></span>
</h1>
            <div class="mail-info flex justify-between">
                <div class="flex">
                    <h2 class="capitalized">{{formattedFrom}}</h2>
                    <p>&lt;{{mail.from}}></p>
                </div>
                <div class="flex">
                    <p>{{formattedDate}}</p>
                    <span class="btn"><input class="star" type="checkbox" @change="onStar" :title="starTitle" :checked="mail.isStarred"></span>

                    <span class="btn">Reply</span>
                    <span class="btn">More</span>
                </div>
            </div>
            <p>{{mail.body}}</p>
            <button class="pill">↩ Reply</button>
            <button class="pill">↪ Forward</button>
        </main>
        <main v-else class="empty"></main>
    </section>
    `,
    data() {
        return {
            mail: null,
        }
    },
    computed: {
        starTitle() {
            return this.mail.isStarred ? 'Starred' : 'Not starred'
        },
        formattedFrom() {
            return this.mail.from.split('@')[0]
        },
        formattedDate() {
            var date = new Date(this.mail.sentAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })
            const timeSinceSent = Date.now() - this.mail.sentAt
            const days = timeSinceSent / (1000 * 3600 * 24)
            if (days <= 14) {
                if (days < 1) date += ' (today)'
                else if (days < 2) date += ' (1 day ago)'
                else date += ` ${days} days ago)`
            }
            return date
        },
        importantTitle() {
            return this.mail.isImportant ? 'Marked as important' : 'Mark this as important'
        },
    },
    methods: {
        close() {
            this.$emit('close')
        },
        toUnread() {
            mailService.toUnread(this.mail, true)
                .then(() => {
                    this.$emit('update')
                    this.close()
                })
        },
        onStar({ target: { checked } }) {
            mailService.toStar(this.mail.id, checked)
                .then(() => this.$emit('update'))
        },
        onImportant() {
            this.mail.isImportant = !this.mail.isImportant
            mailService.toImportant(this.mail.id, this.mail.isImportant)
                .then(() => {
                    this.$emit('update')
                })
        }
    },
    created() {
        mailService.get(this.id)
            .then(mail => {
                this.mail = mail
                mailService.toUnread(this.mail, false)
                    .then(() => {
                        this.$emit('update')
                    })
                // mailService.getPrevNextIds(mail.id)
                // .then(ids => {
                // console.log('nbrIds:', ids)
                // this.prevMailId = ids.prev
                // this.nextMailId = ids.next
            })
    },
    components: {
        mailContentHeader
    }

}
