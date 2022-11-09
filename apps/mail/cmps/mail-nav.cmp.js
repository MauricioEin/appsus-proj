
export default {
    template: `
        <aside class="mail-nav nav-width">
            <button @click="onCompose" class="flex justify-between align-center"><span>✏</span> <span>Compose</span></button>
            <ul class="mail-menu clean-list">
                <li v-for="label in systemLabels">
                    <article :title="label" class="pill-right">{{label}}</article>
                    
                </li>
            </ul>
        </aside>

    `,
    data() {
        return {
            systemLabels: ['Inbox', 'Starred', 'Important', 'Sent', 'Drafts', 'Spam', 'Snoozed', 'Scheduled', 'All mail', 'Trash'],

        }
    },
    methods: {
        onCompose() {
            this.$emit('compose')
        }
    },
    components: {
    }
}