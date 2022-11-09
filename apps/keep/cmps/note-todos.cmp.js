export default {
    props:['note'],
    template: `
        <article class="note-todos-cmp" :style="style">
            <h3 class="note-title">{{info.title}}</h3>
            <ul class="todo-list">
                <li 
                    v-for="todo in info.todos"
                    :class="{'todo-done':todo.doneAt}">{{todo.txt}}
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

    },
    computed: {
        getTitle(){
            if (this.info.title) return this.info.title
            return this.info.todos.splice(0,1).txt
        }
    }
}
