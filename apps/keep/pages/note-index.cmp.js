import { noteService } from "../services/note.service.js"
import { eventBus } from '../../../services/event-bus.service.js'


import noteHeader from '../cmps/note-header.cmp.js'
import noteList from '../cmps/note-list.cmp.js'
import noteNav from '../cmps/note-nav.cmp.js'

export default {
    template: `
        <section class="note-app">
            <div class="full"><note-header/></div>
            <section class=" flex">
                <note-nav :labels="labels"/>
                <note-list 
                    v-if="notes" 
                    class="main-layout"
                    :notes="notes" 
                    @toggleTodoDone="toggleTodoDone"
                    @togglePinned="togglePinned"
                    @saveNote="saveNote"/>
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
        },
        toggleTodoDone({noteId, idx}){
            noteService.get(noteId)
                .then(note => {
                    const {todos} = note.info
                    todos[idx].doneAt = todos[idx].doneAt ? null : Date.now()
                    note.info.todos = todos
                    return note
                }).then(this.saveNote)
        },
        togglePinned(noteId){
            noteService.get(noteId)
               .then(note => {
                    note.isPinned = !note.isPinned
                    return note
                }).then (this.saveNote)
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
