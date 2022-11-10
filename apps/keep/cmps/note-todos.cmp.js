export default {
    props:['note'],
    template: `
        <article class="note-todos-cmp" :style="style">
            <h3 class="note-title">{{info.title}}</h3>
            <ul class="todo-list">
                <li v-for="todo in info.todos">
                    <label> 
                        <input type="checkbox" 
                             @input="toggleChecked(todo)"
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
        toggleChecked(todo) {
           if (todo.doneAt) todo.doneAt = null
           else todo.doneAt = Date.now()
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
