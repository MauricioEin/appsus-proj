import { utilService } from '../../../services/util.service.js'

import topToolbar from './compose-cmps/compose-top-toolbar.cmp.js'
import bottomToolbar from './compose-cmps/compose-bottom-toolbar.cmp.js'
import composeTodo from './compose-cmps/compose-todo.cmp.js'
import composeMedia from './compose-cmps/compose-media.cmp.js'
import composeTxt from './compose-cmps/compose-txt.cmp.js'
import composeTitle from './compose-cmps/compose-title.cmp.js'

export default {
    props: ['selectedNote'],
    template: `
        <div class="note-compose general-border" :style="this.note.style">
            <compose-media 
                v-if="(note.info.type==='note-vid' || note.info.type==='note-img'|| note.info.type==='note-url') && isValid"
                :type="note.info.type"
                :src="note.info.url"
                :youtubeConverter="youtubeConverter"
                @srcValid="srcValid"
                @srcInvalid="srcInvalid"
                @embeddedLink="saveSrc"/>

            <div class="relative">
                <compose-title @titleInput="updateTitle" :noteTitle="note.info.title"/>
                <top-toolbar @toglePinned="togglePinned" @setType="setType"/>
                <input 
                    @blur="srcValid"
                    class="note-media-url-input" 
                    v-if="note.info.type === 'note-img' || note.info.type === 'note-vid' || note.info.type==='note-url'" 
                    type="url" 
                    v-model="note.info.url" 
                    placeholder="Media url"/>
            </div>

            <section v-if="isShown" class="new-note-input">
                <compose-txt v-if="!isNoteTodos" @textInput="updateText" :noteTxt="note.info.txt"/>
                <form v-else>
                    <compose-todo 
                        v-for="(todo, idx) in note.info.todos.length+1"
                        @todoAdded="todoAdded" 
                        @toggleDone="toggleDone"
                        @removeTodo="removeTodo"
                        :idx="idx"
                        :todo="note.info.todos[idx]"
                        :key="todoKey" />
                </form>
                <bottom-toolbar @setColor="setColor" @saveNote="saveNote" @duplicate="duplicateNote()" @removeNote="removeNote"/>
            </section>
        </div>
    `,
    data() {
        return {
            note: {
                id: null,
                style: {},
                info: { title: '', txt: '', todos: [], url: '' },
                type: '',
                isPinned: false,
                url: ''
            },
            isShown: false,
            isValid: true,
            todoKey:0
        }
    },
    created() {
        if (this.selectedNote) {
            this.note = this.selectedNote
            this.isShown = true
        }
    },
    methods: {
        setType(type) {
            this.isShown = true
            if (this.note.info.type && type==='note-txt') return
            if (type === 'noote-vid') this.isValid = false
            this.note.info.type = type
        },
        updateTitle(title){
            if (!this.note.info.type) this.setType('note-txt')
            this.note.info.title = title
        },
        updateText(txt){
            console.log(txt)
            this.note.info.txt = txt
        },
        todoAdded({ txt, doneAt, idx }) {
            this.note.info.todos[idx] = { txt, doneAt }
        },
        removeTodo(idx) {
            this.note.info.todos.splice(idx, 1)
            this.todoKey++

        },
        togglePinned() {
            this.note.isPinned = !this.note.isPinned
        },
        setColor(color) {
            this.note.style = 'background-color:' + color
        },
        saveNote() {
            this.$emit('saveNote', this.note)
            this.resetVar()
        },
        removeNote() {
            this.$emit('removeNote', this.note)
            this.resetVar()
            this.$router.push('/keep/')
        },
        resetVar() {
            this.isShown = false,
            this.note = {
                id:null,
                info: {
                    title: '',
                    txt: '',
                    todos: [{}],
                    url: '',
                    type:'',
                },
                isPinned: false,
                style:{},
            }
        },
        srcInvalid(){
            this.isValid=false
        },
        srcValid(){
            this.isValid=true
        },
        saveSrc(src){
            this.note.info.url = src
        },
        duplicateNote(){
            const note = utilService.getDeepCopy(this.note)
            note.id = null
            this.$emit('saveNote', note)
        }
    },
    computed: {
        isNoteTodos() {
            return this.note.info.type === 'note-todos'
        },
        youtubeConverter(){
            return utilService.youtubeToEmbed
        }
    },
    components: {
        composeTodo,
        composeMedia,
        composeTxt,
        composeTitle,
        topToolbar,
        bottomToolbar,
    }
}