import { noteService } from "../services/note.service.js"

import noteHeader from '../cmps/note-header.cmp.js'
import noteList from '../cmps/note-list.cmp.js'
import noteNav from '../cmps/note-nav.cmp.js'

export default {
    template: `
        <section class="note-app flex">
            <note-nav :labels="labels"/>
            <note-list v-if="notes" :notes="notes"/>
        </section>
    `,
    data() {
        return {
            notes: null,
            labels: null
        }
    },
    created() {
        this.getNotes()
        this.getLabels()
    },
    methods: {
        getNotes(){
            noteService.query(true)
                .then(notes => this.notes = notes)
        },
        getLabels(){
            noteService.query(false)
                .then(labels => this.labels = labels)
        }
    },
    computed: {

    },
    components: {
        noteList,
        noteNav,
        noteHeader

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
