export default{
    props:['noteTitle'],
    template:`
        <input
                v-model="title"
                @click="updateTitle" 
                @input="updateTitle"
                :placeholder="isShown ? 'Title' : 'Take a note'" 
                class="note-title-input"/>
    `,
    data(){
        return{
            title:'',
            isShown:false
        }
    },
    created(){
        if(this.noteTitle) this.title = this.noteTitle
    },
    methods: {
        updateTitle(){
            this.$emit('titleInput',this.title)
            this.isShown = true
        }
    }
}