import notePreview from './note-preview.cmp.js'
import noteCompose from './note-compose.cmp.js'

export default {
    props: ['notes', 'selectedNote'],
    template: `
        <main class="note-list main-layout ">
            <note-compose @saveNote="saveNote" @removeNote="removeNote" :selectedNote="selectedNote"/>
            <section class="notes-preview-container" @dragover.prevent.stop @drop.prevent.stop="dropNote($event, 'pinnedNote')">
                <div class="columns div-3" >
                    <div v-for="note in notes">
                        <note-preview
                            v-if="note.isPinned"
                            @toggleTodoDone="toggleTodoDone"
                            @togglePinned="togglePinned"
                            :note="note"/>
                    </div>
                </div>
            </section>
            <hr/>
            <section class="notes-preview-container">
                <div class="columns div-3">
                    <div v-for="note in notes">
                        <note-preview  
                            v-if="!note.isPinned"
                            draggable="true"
                            @toggleTodoDone="toggleTodoDone"
                            @togglePinned="togglePinned"
                            :note="note"/>
                    </div>
                </div>
            </section>
        </main>
    `,
    data() {
        return {
            
        }
    },
    created() {
    },
    methods: {
        saveNote(note) {
            this.$emit('saveNote', note)
        },
        removeNote(note) {
            this.$emit('removeNote', note)
        },
        toggleTodoDone(todo){
            this.$emit('toggleTodoDone', todo)
        },
        togglePinned(noteId){
            this.$emit('togglePinned', noteId)
        },
        startDrag(ev, isPinned){
            ev.dataTransfer.setData(isPinned, ev.target.id)
        },
        dropNote(ev, isPinned){
            const note = ev.dataTransfer.getData(isPinned);
            ev.target.appendChild(document.getElementById(note));
        }
    },
    computed: {
    },
    components: {
        notePreview,
        noteCompose,
    }
}
