import {utilService} from '../../../../services/util.service.js'

export default{
    template:`
        <div 
            contenteditable="true" 
            aria-multiline="true" 
            v-html="html" 
            @click="deletePlaceHolder"
            @blur="searchUrls"
            @input="textInput"   
            class="note-text-body-input block">
        </div>
    `,
    data(){
        return{
            html:'Take a note, write some urls',
            isShown:false
        }
    },
    methods:{
        searchUrls(...args){
            if (args[0] && args[0].target && args[0].target.textContent) 
                this.html = utilService.strWithLinks(args[0].target.textContent)
        },
        textInput(...args){
            if (!args[0] || !args[0].target || !args[0].target.textContent) return
            const txt = utilService.htmlToStr(args[0].target.textContent)
            this.$emit('textInput',txt)
        },
        deletePlaceHolder(){
            if (this.isShown && this.html) return
            if (this.isShown) return this.html = "Take a note, write some urls"
            this.isShown = true
        }
    },
    computed:{
    }
}