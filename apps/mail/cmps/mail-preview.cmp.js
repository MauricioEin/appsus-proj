export default {
    props: ['mail'],
    template: `
    <article class="mail-preview flex justify-between" :class="{unread: !mail.isRead, checked: isChecked}">
        <span class="btn"><input class="checkbox" type="checkbox" @click.stop="" @change="check" title="Select"></span>
        <span class="btn"><input class="star" type="checkbox" @click.stop="" @change="onStar" :title="starTitle" :checked="mail.isStarred"></span>
        <span class="btn"><img class="importance-label" src="../../../assets/img/label-important.svg" @click.stop="onImportant" :class="{'label-important':mail.isImportant}" :title="importantTitle"/></span>
        <div class="capitalized" :class="{red:mail.isDraft}">{{formattedFrom}}</div>
        <div>{{mail.subject}}</div>
        <div>📎</div>
        <div>{{formattedDate}}</div>
    </article>
    `,
    data() {
        return {
            isChecked: false,
        }
    },
    computed: {
        starTitle() {
            return this.mail.isStarred ? 'Starred' : 'Not starred'
        },
        importantTitle() {
            return this.mail.isImportant ? 'Important' : 'Not important'
        },
        formattedDate() {
            const sentAtYear = new Date(this.mail.sentAt).getFullYear()
            const currYear = new Date().getFullYear()
            if (sentAtYear === currYear)
                return new Date(this.mail.sentAt).toLocaleString('en-US', { month: 'short', day: 'numeric' })
            return new Date(this.mail.sentAt).toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
        },
        formattedFrom() {
            if (this.mail.isDraft) return 'Draft'
            return this.mail.from.split('@')[0]
        },
   
    },
    methods: {
        check({ target: { checked } }) {
            this.isChecked = checked
            this.$emit('checked', checked, this.mail.id)
        },
        onStar({ target: { checked } }) {
            this.$emit('starred', checked, this.mail.id)
        },
        onImportant() {
            this.$emit('important', !this.mail.isImportant, this.mail.id)
        }

    }
}