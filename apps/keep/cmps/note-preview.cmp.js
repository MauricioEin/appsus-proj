import noteTxt from './note-txt.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteVid from '../cmps/note-vid.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteUrl from '../cmps/note-url.cmp.js'

export default {
    props:['note'],
    template:`
    <div class="relative note-item-container" >
        <span class="note-checkmark block" @click="toggleSelected" :class="{hidden: !selected}">
            <iconify-icon inline icon="material-symbols:check-circle"></iconify-icon>
        </span>
        
        <span class="note-pinmark block hidden" @click="togglePinned">
            <iconify-icon v-if="!pinned" inline icon="bi:pin"></iconify-icon>
            <iconify-icon v-if="pinned" inline icon="bi:pin-fill"></iconify-icon>
        </span>
        <component 
            @toggleTodoDone="toggleTodoDone"
            :is="note.type" 
            class="note-preview-item" 
            :class="{selected: selected}"
            :note="note"> 
        </component>
    </div>
    `,
    data(){
        return {
            selected: false,
            pinned: false,
        }
    },
    created(){
    },
    methods:{
        toggleTodoDone(todo){
            this.$emit('toggleTodoDone', todo)
        },
        toggleSelected(){
            this.selected =!this.selected
        },
        togglePinned(){
            this.pinned =!this.pinned
            this.$emit('togglePinned', this.note.id)
        },
    },
    components: {
        noteTxt,
        noteTodos,
        noteUrl,
        noteImg,
        noteVid,
    }
}