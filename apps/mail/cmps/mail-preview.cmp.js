export default {
    props: ['mail'],
    template: `
    <article class="mail-preview flex justify-between" :class="{unread: !mail.isRead}">
        <div>drag</div>
        <div><input type="checkbox" @change="check" title="Select"></div>
        <div>⭐</div>
        <div>🚩</div>
        <div class="capitalized">{{formattedFrom}}</div>
        <div>{{mail.subject}}</div>
        <div>📎</div>
        <div>{{formattedDate}}</div>
    </article>
    `,
    computed: {
        formattedDate() {
            const sentAtYear = new Date(this.mail.sentAt).getFullYear()
            const currYear = new Date().getFullYear()
            if (sentAtYear === currYear)
                return new Date(this.mail.sentAt).toLocaleString('en-US', { month: 'short', day: 'numeric' })
            return new Date(this.mail.sentAt).toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
        },
        formattedFrom() {
            return this.mail.from.split('@')[0]
        }
    },
    methods: {
        check({ target: { checked } }) {
            this.$emit('checked', checked, this.mail.id)
        }
    }
}