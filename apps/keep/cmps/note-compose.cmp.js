
import topToolbar from './compose-cmps/compose-top-toolbar.cmp.js'
import bottomToolbar from './compose-cmps/compose-bottom-toolbar.cmp.js'
import composeTodo from './compose-cmps/compose-todo.cmp.js'
import composeImg from './compose-cmps/compose-img.cmp.js'
import composeTxt from './compose-cmps/compose-txt.cmp.js'
import composeTitle from './compose-cmps/compose-title.cmp.js'

export default {
    props: ['selectedNote'],
    template: `
        <div class="note-compose general-border" :style="this.note.style">
            <img 
            v-if="isShown && isValid"

                @error="srcInvalid"
                class="usr-img border-radius-top" 
                :src="note.info.url" />
                <!-- alt="Link appears to be broken. Perhaps an upload would be best." -->
            <div class="relative">
                <compose-title @titleInput="updateTitle"/>
                <top-toolbar @toglePinned="togglePinned" @setType="setType"/>
                <input 
                    @blur="srcValid"
                    class="note-img-url-input" 
                    v-if="note.type === 'note-img'" 
                    type=url v-model="note.info.url" 
                    placeholder="Image url"/>
            </div>
            <section v-if="isShown" class="new-note-input">
                <compose-txt v-if="!isNoteTodos" @textInput="updateText"/>
            
                <form v-else>
                    <compose-todo 
                        v-for="(todo, idx) in note.info.todos.length+1"
                        @todoAdded="todoAdded" 
                        @toggleDone="toggleDone"
                        @removeTodo="removeTodo"
                        :idx="idx"
                        :todo="note.info.todos[idx]"
                        :key="idx" />
                </form>

                <bottom-toolbar @setColor="setColor" @saveNote="saveNote"/>
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
            isValid: false,
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
            if (this.note.type && type==='note-txt') return
            this.note.type = type
        },
        updateTitle(title){
            this.setType('note-txt')
            this.title = title
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
            this.saveNote()
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
        resetVar() {
            this.isShown = false,
            this.note = {
                id:null,
                info: {
                    title: '',
                    txt: '',
                    todos: [{}],
                    url: '',
                },
                isPinned: false,
                type:'',
                style:{},
            }
        },
        srcInvalid(){
            this.isValid=false
        },
        srcValid(){
            this.isValid=true
        }
    },
    computed: {
        isNoteTodos() {
            return this.note.type === 'note-todos'
        }
    },
    components: {
        composeTodo,
        composeImg,
        composeTxt,
        composeTitle,
        topToolbar,
        bottomToolbar,
    }
}