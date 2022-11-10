import notePreview from './note-preview.cmp.js'
import noteCompose from './note-compose.cmp.js'

export default {
    props: ['notes'],
    template: `
        <main class="note-list main-layout">
            <note-compose @saveNote="saveNote" :colorPalette="colorPalette"/>
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
            colorPalette: [{ color: 'background-color: var(--usr-clr-red);', title: 'Red' },
            { color: 'background-color: var(--usr-clr-orng);', title: 'Orange' },
            { color: 'background-color: var(--usr-clr-yellow);', title: 'Yellow' },
            { color: 'background-color: var(--usr-clr-grn);', title: 'Green' },
            { color: 'background-color: var(--usr-clr-teal);', title: 'Teal' },
            { color: 'background-color: var(--usr-clr-blu);', title: 'Blue' },
            { color: 'background-color: var(--usr-clr-nvy);', title: 'Dark blue' },
            { color: 'background-color: var(--usr-clr-prpl);', title: 'Purple' },
            { color: 'background-color: var(--usr-clr-pnk);', title: 'Pink' },
            { color: 'background-color: var(--usr-clr-brwn);', title: 'Brown' },
            { color: 'background-color: var(--usr-clr-gray);', title: 'Gray' }]
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
