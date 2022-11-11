import noteTxt from './preview-cmps/note-txt.cmp.js'
import noteTodos from './preview-cmps/note-todos.cmp.js'
import noteVid from './preview-cmps/note-vid.cmp.js'
import noteImg from './preview-cmps/note-img.cmp.js'
import noteUrl from './preview-cmps/note-url.cmp.js'
import noteDetails from '../pages/note-details.cmp.js'

export default {
    props: ['note'],
    template: `
    <div class="relative note-item-container" >
        <span class="note-checkmark block absolute" @click="toggleSelected" :class="{hidden: !selected}">
            <iconify-icon inline icon="material-symbols:check-circle"></iconify-icon>
        </span>
        
        <span class="note-pinmark block hidden absolute" @click="togglePinned">
            <iconify-icon v-if="pinned" inline icon="bi:pin-fill"></iconify-icon>
            <iconify-icon v-else inline icon="bi:pin"></iconify-icon>
        </span>
            <component 
                @click="goToDetails"
                @toggleTodoDone="toggleTodoDone"
                :is="note.type" 
                class="note-preview-item" 
                :class="{selected: selected}"
                :note="note"> 
            </component>
        <note-details v-is="isShown" :note="note"/>
    </div>
    `,
    data() {
        return {
            isShown: false,
            selected: false,
            pinned: false,
        }
    },
    created() {
    },
    methods: {
        toggleTodoDone(todo) {
            this.$emit('toggleTodoDone', todo)
        },
        toggleSelected() {
            this.selected = !this.selected
        },
        togglePinned() {
            this.pinned = !this.pinned
            this.$emit('togglePinned', this.note.id)
        },
        toggleShowDetails() {
            this.isShown = !this.isShown
        },
        goToDetails(...args){
            if (args[0].target.tagName === 'INPUT') return 
            this.$router.push('/keep/' + this.note.id)
        }
    },
    components: {
        noteTxt,
        noteTodos,
        noteUrl,
        noteImg,
        noteVid,
        noteDetails,
    }
}