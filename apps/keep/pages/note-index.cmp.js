import { noteService } from "../services/note.service.js"

import noteList from '../cmps/note-list.cmp.js'
import noteNav from '../cmps/note-nav.cmp.js'

export default {
    template: `
        <section class="note-app flex">
            <note-nav :labels="labels"/>
            <note-list :notes="notes"/>
        </section>
    `,
    data() {
        return {
            notes: null,
            labels: null
        }
    },
    created() {
        this.notes = this.getNotes()
        this.labels = this.getLabels()
    },
    methods: {
        getNotes(){
            noteService.query(true)
                .then(notes => this.note = notes)
        },
        getLables(){
            noteService.query(false)
                .then(notes => this.note = notes)
        }
    },
    computed: {

    },
    components: {
        noteList,
        noteNav
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
