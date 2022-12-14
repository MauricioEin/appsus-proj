import noteTxt from './preview-cmps/note-txt.cmp.js'
import noteTodos from './preview-cmps/note-todos.cmp.js'
import noteMedia from './preview-cmps/note-media.cmp.js'
import noteUrl from './preview-cmps/note-url.cmp.js'
import noteDetails from '../pages/note-details.cmp.js'

export default {
    props: ['note'],
    template: `
    <div class="relative note-item-container" 
                            :id="note.id"
                            
                            >
        <span class="note-checkmark block absolute" @click="toggleSelected" :class="{hidden: !selected}">
            <iconify-icon inline icon="material-symbols:check-circle"></iconify-icon>
        </span>
        
        <span class="note-pinmark block hidden absolute" @click="togglePinned">
            <iconify-icon v-if="isPinned" inline icon="bi:pin-fill"></iconify-icon>
            <iconify-icon v-else inline icon="bi:pin"></iconify-icon>
        </span>
        <component 
            @click="goToDetails"
            @toggleTodoDone="toggleTodoDone"
            :is="getType" 
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
            isPinned: false,
        }
    },
    created() {
        if (this.note.isPinned) this.isPinned = true
    },
    methods: {
        toggleTodoDone(todo) {
            this.$emit('toggleTodoDone', todo)
        },
        toggleSelected() {
            this.selected = !this.selected
        },
        togglePinned() {
            this.isPinned = !this.isPinned
            this.$emit('togglePinned', this.note.id)
        },
        toggleShowDetails() {
            this.isShown = !this.isShown
        },
        goToDetails(...args) {
            if (args[0].target.tagName === 'INPUT') return
            this.$router.push('/keep/' + this.note.id)
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
        getType() {
            const type = this.note.info.type
            if (type === 'note-img' || type === 'note-vid' || type === 'note-url') return 'note-media'
            return type
        }
    },
    components: {
        noteTxt,
        noteTodos,
        noteMedia,
        noteDetails,
    }
}