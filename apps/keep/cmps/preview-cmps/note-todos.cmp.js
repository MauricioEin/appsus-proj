export default {
    props:['note'],
    template: `
        <article class="note-todos-cmp" :style="style">
            <h3 v-if="info.title" class="note-title">{{info.title}}</h3>
            <ul class="todo-list clean-list">
                <li v-for="(todo, idx) in info.todos">
                    <label> 
                        <input type="checkbox" 
                             @click="toggleTodoDone(idx)"
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
    },
    methods: {
        toggleTodoDone(idx) {
            if (this.info.todos[idx].doneAt) this.info.todos[idx].doneAt = null
            else this.info.todos[idx].doneAt = Date.now()
           this.$emit('toggleTodoDone', {noteId:this.note.id, idx:idx})
        },
        fuck(ev){
            return
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
