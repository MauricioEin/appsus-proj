export default {
    props:['idx', 'todo'],
    template:`
        <label class="todo-input block main-layout">
            <span v-if="!hasText" class="add-todo">+</span>
            <input v-else class="todo-check-input" type="checkbox" @click="toggleDone" :checked="checked"/>
            <input 
                class="todo-text-input"
                type="text"
                @input="inputBegun"
                :class="{'todo-done' : doneAt}"
                v-model="txt"/>
                <span class="remove-todo absolute" @click.prevent="$emit('removeTodo',idx)">x</span>
        </label>
    `,
    data(){
        return {
            txt:'',
            doneAt:null,
            checked: false
        }
    },
    created(){
        if (this.todo){
            this.txt = this.todo.txt
            this.checked = this.todo.doneAt? true : false
        } 
        console.log()
    },
    methods:  {
        toggleDone(){
            this.checked =!this.checked
            if (this.doneAt) this.doneAt = null
            else this.doneAt = Date.now()
            this.$emit('toggleDone', {idx:this.idx, doneAt: this.doneAt})
        },
        inputBegun(){
            // this.hasText = true
            this.$emit('todoAdded', {txt:this.txt, doneAt:this.doneAt, idx:this.idx})
        }
    },
    computed: {
        hasText(){
            return this.txt
        }
    }
}