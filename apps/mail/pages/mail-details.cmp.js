import { mailService } from "../services/mail.service.js"
export default {
    props: ['id'],
    template: `
    <section class="mail-details">
        <header>
            <span class="btn" @click="close">🔙</span>
        </header>
        <h1>{{mail.subject}}</h1>
        <p>{{mail.body}}</p>
        MESSAGE DETAILS {{id}}
    </section>
    `,
    data() {
        return {
            mail: null,
        }
    },
    methods: {
        close() {
            this.$emit('close')
        },
    },
    created() {
        mailService.get(this.id)
            .then(mail => {
                this.mail = mail
                // mailService.getPrevNextIds(mail.id)
                // .then(ids => {
                // console.log('nbrIds:', ids)
                // this.prevMailId = ids.prev
                // this.nextMailId = ids.next
            })
    }

}
