import notePreview from './note-preview.cmp.js'
import noteCompose from './note-compose.cmp.js'

export default {
    props: ['notes'],
    template: `
        <main class="note-list main-layout">
            <note-compose @saveNote="saveNote"/>
            <section class="notes-preview-container columns">
                <note-preview 
                    v-for="note in notes"
                    @toggleTodoDone="toggleTodoDone"
                    @togglePinned="togglePinned"
                    :note="note" />
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
        },
        toggleTodoDone(todo){
            this.$emit('toggleTodoDone', todo)
        },
        togglePinned(noteId){
            this.$emit('togglePinned', noteId)
        }
    },
    computed: {
    },
    components: {
        notePreview,
        noteCompose,
    }
}
