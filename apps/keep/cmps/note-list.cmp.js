import notePreview from './note-preview.cmp.js'
import noteCompose from './note-compose.cmp.js'

export default {
    props: ['notes'],
    template: `
        <main class="note-list">
            <note-compose @saveNote="saveNote"/>
            <section class="notes-preview-container columns">
                <note-preview v-for="note in notes" :note="note" />
            </section>
        </main>
    `,
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
        saveNote(note) {
            this.$emit('saveNote', note)
        }

    },
    computed: {
    },
    components: {
        notePreview,
        noteCompose,
    }
}
