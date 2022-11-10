export default {
    props:['note'],
    template: `
        <article class="note-todos-cmp" :style="style">
            <h3 class="note-title">{{info.title}}</h3>
            <ul class="todo-list clean-list">
                <li v-for="(todo, idx) in info.todos">
                    <label> 
                        <input type="checkbox" 
                             @input="toggleTodoDone(idx)"
                             :checked="todo.doneAt"/>
                    <span :class="{'todo-done': todo.doneAt}"> {{todo.txt}} </span> </label>
                </li>
            </ul>
        </article>
    `,
    data() {
        return {
            info:this.note.info,
            style: this.note.style || '',
        }
    },
    created() {
        // this.title = this.getTitle
    },
    methods: {
        toggleTodoDone(idx) {
           this.$emit('toggleTodoDone', {noteId:this.note.id, idx:idx})
        }


    },
    computed: {
        getTitle(){
            if (this.info.title) return this.info.title
            return this.info.todos.splice(0,1).txt
        },
        getClass(){
            return 'todo-done'
        }
    }
}
