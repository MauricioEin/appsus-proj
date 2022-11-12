import { noteService } from "../services/note.service.js"

import noteCompose from '../cmps/note-compose.cmp.js'

export default {
    // props: ['id'],
    template: `
        <section v-if="note" class="note-details-container fixed" @click="returnToList">
            <div class="note-deatils" @click.stop>
                <note-compose :selectedNote="note" @saveNote="saveNote"
                    class="absolute center"/>
            </div>
        </section>
    `,
    data() {
        return {
            note: null,
        }
    },
    created() {
        this.loadNote()
    },
    methods: {
        loadNote() {
            noteService.get(this.noteId)
                .then(note => {
                    this.note = note
                }).catch(()=>this.$router.push('/keep'))
        },
        setStyle(color) {
            this.note.style = { 'background-color': color }
        },
        returnToList() {
            this.$router.push('/keep')
        },
        saveNote(note) {
            this.$emit('saveNote', note)
            this.$router.push('/keep')
        }
    },
    computed: {
        noteId() {
            return this.$route.params.id
        }
    },
    components: {
        noteCompose
    },
    watch: {
        noteId() {
            if (this.noteId) this.loadNote()
        }
    }
}