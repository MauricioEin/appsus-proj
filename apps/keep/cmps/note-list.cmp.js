import notePreview from '../cmps/note-preview.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'

export default {
    props: ['notes'],
    template: `
        <main class="notes-preview-container columns">
            <note-preview v-for="note in notes" :note="note" />
        </main>
    `,
    data() {
        return {
        }
    },
    created() {
    },
    methods: {


    },
    computed: {
    },
    components: {
        notePreview,
        noteFilter
    }
}
