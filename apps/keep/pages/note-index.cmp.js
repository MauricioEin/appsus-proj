import { noteService } from "../services/note.service.js"
import { eventBus } from '../../../services/event-bus.service.js'


import noteHeader from '../cmps/note-header.cmp.js'
import noteList from '../cmps/note-list.cmp.js'
import noteNav from '../cmps/note-nav.cmp.js'
import noteDetails from './note-details.cmp.js'

export default {
    template: `
        <section class="note-app">
            <div class="full">
                <note-header class="note-header" @filter="setFilter"/></div>
                <hr>
                <section class="note-main-container flex">
                    <note-nav :labels="labels" @filterLabels="setFilter"/>
                    <note-list 
                        v-if="notes" 
                        class="main-layout"
                        :notes="notes"
                        :selectedNote="selectedNote"
                        @toggleTodoDone="toggleTodoDone"
                        @togglePinned="togglePinned"
                        @saveNote="saveNote"/>
                </section>
                <note-details v-if="noteId" @saveNote="saveNote"/>
        </section>
    `,
    data() {
        return {
            note: null,
            notes: [],
            labels: [],
            filterBy: {
                txt: '',
                type: '',
                label: '',
                isPinned: false
            }
        }
    },
    created() {
        if (this.noteId) noteService.get(this.noteId)
                            .then(note => this.note = note)
        this.getNotes()
        this.getLabels()
    },
    methods: {
        getNotes(){
            noteService.getFilteredNotes(this.filterBy)
                .then(notes => this.notes = notes)
        },
        getLabels(){
            noteService.query(false)
                .then(labels => this.labels = labels)
        },
        saveNote(note) {
            if (note.info.todos || note.info.url  ||
                note.info.txt || note.info.title) return noteService.saveNote(note)
                                                            .then(this.getNotes)
            else if (note.id) noteService.remove(note.id)
            this.note = []
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
        },
        setFilter(filterBy){
            this.filterBy = filterBy
            this.getNotes()
        }
    },
    computed: {
        noteId(){
            return this.$route.params.id
        }
    },
    components: {
        noteList,
        noteNav,
        noteHeader,
        noteDetails,

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
