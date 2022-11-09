import { noteService } from "../../../services/note.service.js"

import noteText from '../cmps/note-text.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
// import noteVid from '../cmps/note-vid.cmp.js'
// import noteImg from '../cmps/note-img.cmp.js'
import noteUrl from '../cmps/note-url.cmp.js'

export default {
    template: `

    <h1>notes</h1>
     <section v-if="notes">
        <div v-for="note in notes">
            <note-url v-if="note.type==='note-url'" :note="note"/>
        </div>
     </section>
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
        noteUrl
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
