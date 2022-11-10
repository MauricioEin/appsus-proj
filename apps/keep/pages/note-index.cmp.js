import { noteService } from "../services/note.service.js"
import { eventBus } from '../../../services/event-bus.service.js'


import noteHeader from '../cmps/note-header.cmp.js'
import noteList from '../cmps/note-list.cmp.js'
import noteNav from '../cmps/note-nav.cmp.js'

export default {
    template: `
        <section class="note-app">
            <note-header />
            <section class=" flex">
                <note-nav :labels="labels"/>
                <note-list v-if="notes" :notes="notes" @saveNote="saveNote"/>
            </section>
        </section>
    `,
    data() {
        return {
            notes: null,
            labels: null
        }
    },
    created() {
        // eventBus.emit('getEntities', this.getNotes)
        this.getNotes()
        this.getLabels()
    },
    methods: {
        getNotes(notes){
            noteService.query(true)
                .then(notes => this.notes = notes)
        },
        getLabels(){
            noteService.query(false)
                .then(labels => this.labels = labels)
        },
        saveNote(note) {
            if (note.info.txt || note.info.title) return noteService.saveNote(note)
                                                            .then(this.getNotes)
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
