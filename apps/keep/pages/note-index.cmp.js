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
                <note-header class="note-header" @filter="setFilter" @toggleNavMenu="toggleNavMenu"/></div>
                <hr>
                <section class="note-main-container flex relative" :key="containerKey">
                    <note-nav :labels="labels" @filterLabels="setFilter" :toggleNavMenu="isNavMenuShown"/>
                    <note-list 
                        v-if="notes" 
                        :notes="getNotes"
                        :selectedNote="selectedNote"
                        @toggleTodoDone="toggleTodoDone"
                        @togglePinned="togglePinned"
                        @saveNote="saveNote"
                        @removeNote="removeNote"/>
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
            },
            isNavMenuShown:false,
            containerKey:0
        }
    },
    created() {
        if (this.noteId) noteService.get(this.noteId)
                            .then(note => this.note = note)
        this.loadNotes()
        this.getLabels()
    },
    methods: {
        loadNotes(){
            noteService.getFilteredNotes(this.filterBy)
                .then(notes => this.notes = notes)
        },
        getLabels(){
            noteService.query(false)
                .then(labels => this.labels = labels)
        },
        saveNote(note) {
            this.containerKey++
            if (note.info.todos && note.info.todos.length || note.info.url  ||
                note.info.txt || note.info.title) return noteService.saveNote(note)
                                                            .then(this.loadNotes)
            else if (note.id) noteService.remove(note.id)
            this.note = []
        },
        removeNote(note){
            noteService.remove(note.id)
               .then(this.loadNotes)
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
            this.loadNotes()
        },
        toggleNavMenu(){
            this.isNavMenuShown = !this.isNavMenuShown
        }
    },
    computed: {
        noteId(){
            return this.$route.params.id
        },
        getNotes(){
            return this.notes
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
