import { mailService } from "../services/mail.service.js"
import mailContentHeader from "../cmps/mail-content-header.cmp.js"

export default {
    props: ['id'],
    template: `
    <section class="mail-details">
        <mail-content-header  :isChecked="true" :isToRead="false"
            :isDetails="true" @unread="toUnread" @back="close" />
        <main v-if="mail">
            <h1>{{mail.subject}}<span class="btn">Label</span></h1>
            <div class="mail-info flex">
            <h2>{{formattedFrom}}</h2><p>&lt;{{mail.from}}></p><p>{{formattedDate}}</p>
            <span class="btn">STAR</span><span class="btn">Reply</span><span class="btn">More</span>
             </div>

            <p>{{mail.body}}</p>
            <button>reply</button>
            <button>forward</button>
        </main>
        <main v-else class="empty"></main>
        MESSAGE DETAILS {{id}}
    </section>
    `,
    data() {
        return {
            mail: null,
        }
    },
    computed: {
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
        }
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
