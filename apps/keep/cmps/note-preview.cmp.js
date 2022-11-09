import noteTxt from './note-txt.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteVid from '../cmps/note-vid.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteUrl from '../cmps/note-url.cmp.js'

export default {
    props:['note'],
    template:`
        <component :is="note.type" class="note-preview-item" :note="note"> 
        </component> 
    `,
    created(){
    },
    components: {
        noteTxt,
        noteTodos,
        noteUrl,
        noteImg,
        noteVid,
    }
}