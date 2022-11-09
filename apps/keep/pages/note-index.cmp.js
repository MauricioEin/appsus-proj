import { noteService } from "../services/note.service.js"

import noteText from '../cmps/note-text.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteVid from '../cmps/note-vid.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteUrl from '../cmps/note-url.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'

export default {
    template: `
<note-vid  />

    <note-filter />
    <!-- <h1>notes</h1>
     <section v-if="getNotes">
     </section> -->
    `,
    data() {
        return {
            notes: null
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
        getNotes() {
        }
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
// export default {
    // template: `
    // `
    // ,
//     data() {
//         return {

//         }
//     },
//     created() {

//     },
//     methods: {

//     },
//     computed: {

//     }
// }
