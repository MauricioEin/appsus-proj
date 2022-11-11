export default{
    template:`
        <input
                ref="title"
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
    methods: {
        updateTitle(){
            this.$emit('titleInput',this.title)
            this.isShown = true
        }
    }
}