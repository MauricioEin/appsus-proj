import { mailService } from "../services/mail.service.js"
import mailContentHeader from "../cmps/mail-content-header.cmp.js"

export default {
    props: ['id', 'folder'],
    template: `
    <section class="mail-details">
        <mail-content-header  :isChecked="true" :isToRead="false" :folder="folder" :idx="currIdx+1" :length="mailCount"
            :isDetails="true" :isNext="nextMailId" :isPrev="prevMailId" @unread="toUnread" @back="close"
            @trash="toTrash" @spam="toSpam" @prev="onPrev" @next="onNext" @eliminate="eliminate" />
        <main v-if="mail">
            <h1>{{mail.subject}}<span class="btn" @click="onImportant"><img class="importance-label" src="assets/img/label-important.svg" :class="{'label-important':mail.isImportant}" :title="importantTitle"/></span>
</h1>
            <div class="mail-info flex justify-between">
                <div class="flex">
                    <h2 class="capitalized">{{formattedFrom}}</h2>
                    <p>&lt;{{mail.from}}></p>
                </div>
                <div class="flex">
                    <p>{{formattedDate}}</p>
                    <span class="btn"><input class="star" type="checkbox" @change="onStar" :title="starTitle" :checked="mail.isStarred"></span>

                    <!-- <span class="btn">Reply</span>
                    <span class="btn">More</span> -->
                </div>
            </div>
            <p>{{mail.body}}</p>
            <button class="pill blocked">↩ Reply</button>
            <button class="pill blocked">↪ Forward</button>
        </main>
        <main v-else class="empty"></main>
    </section>
    `,
    data() {
        return {
            currId: this.id,
            mail: null,
            prevMailId: null,
            nextMailId: null,
            currIdx: null,
            mailCount: null,
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
        loadDetails() {
            mailService.get(this.currId)
                .then(mail => {
                    this.mail = mail
                    mailService.toUnread(this.mail, false)
                        .then(() => {
                            this.$emit('update')
                        })
                    mailService.getNeighbourIds(this.mail.id, this.folder)
                        .then(negsData => {
                            this.prevMailId = negsData.prev
                            this.nextMailId = negsData.next
                            this.currIdx = negsData.currIdx
                            this.mailCount = negsData.mailCount
                        })
                })
        },
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
        },
        toSpam() {
            mailService.toSpam(this.mail).then(() => {
                this.$emit('update')
                this.close()
            })
        },
        toTrash() {
            mailService.toTrash(this.mail).then(() => {
                this.$emit('update')
                this.close()
            })
        },
        eliminate() {
            mailService.eliminate(this.mail.id).then(() => {
                this.$emit('update')
                this.close()
            })

        },
        onNext() {
            if (!this.nextMailId) return
            this.currId = this.nextMailId
            this.loadDetails()
        },
        onPrev() {
            if (!this.prevMailId) return
            this.currId = this.prevMailId
            this.loadDetails()
        }
    },
    created() {
        this.loadDetails()
    },
    components: {
        mailContentHeader
    }

}
