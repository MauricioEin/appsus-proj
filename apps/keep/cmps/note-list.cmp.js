import { noteService } from "../services/note.service.js"

import noteText from '../cmps/note-text.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteVid from '../cmps/note-vid.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteUrl from '../cmps/note-url.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'

export default {
    template: `
        <main class="notes-preview-container columns">
            <note-vid />
            <div class="note-preview" v-for="note in notes">
                <!-- {{'type}} -->
                <component :is="note.type" class="note-preview-item" :note="note"> </component> 
             </div>
             <note-vid />
             <note-vid />
             <note-vid />
        </main>
    `,
    data() {
        return {
            notes: []
        }
    },
    created() {
        noteService.query()
            .then(notes => {
                this.notes = notes
                console.log(notes)
            })
    },
    methods: {

    },
    computed: {
    },
    components: {
        noteText,
        noteTodos,
        noteUrl,
        noteImg,
        noteVid,
        noteFilter
    }
}
