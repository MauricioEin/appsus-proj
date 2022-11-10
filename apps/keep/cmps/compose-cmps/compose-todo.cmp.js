export default {
    props:['idx'],
    template:`
        <label class="todo-input block">
            <span v-if="!hasText" class="add-todo">+</span>
            <input v-else class="todo-check-input" type="checkbox" @input="toggleDone"/>
            <input 
                class="toto-text-input"
                type="text"
                @input="inputBegun"
                :class="{'todo-done' : doneAt}"
                v-model="txt"/>
        </label>
    `,
    data(){
        return {
            hasText:false,
            txt:'',
            doneAt:null,
        }
    },
    created(){
        console.log('maade it here')
    },
    methods:  {
        toggleDone(){
            if (this.doneAt) this.doneAt = null
            else this.doneAt = Date.now()
            this.$emit('toggleDone', {idx:this.idx, doneAt: this.doneAt})
        },
        inputBegun(){
            this.hasText = true
            this.$emit('todoAdded', {txt:this.txt, doneAt:this.doneAt, idx:this.idx})
        }
    },
    computed: {

    }
}