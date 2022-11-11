export default {
    template:`
        <img 
            v-if="isShown"
            class="usr-img border-radius-top" 
            :src="src" />
            <!-- alt="Link appears to be broken. Perhaps an upload would be best." -->
            <input type="url" @submit="updateSrc" @keyup.enter="updateSrc" @blur="updateSrc" placeholder="here">
    `,
    data(){
        return{
            src:'',
            isShown: false,
        }
    },
    methods:{
        updateSrc(...args){
            this.src = args[0].target.value
            this.isShown = true
        }
    }
}