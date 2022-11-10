export default {
    props:['info'],
    template: `
    <article class="note-vid-cmp" >
        <h3 v-if="info.title" class="note-title">{{info.title}}</h3>
        <p v-if="info.txt" class="note-text">{{info.txt}}</p>
        <iframe  
            class="inline-block" 
            width="100%" height="100%" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            :src="info.url">
        </iframe>
    </article>
    `,
    data() {
        return {
            // info: this.note.info
        }
    },
    created(){
        console.log(this.note)
    }
    // data() {
    //     return {
    //     }
    // },
    // created() {
    // },
    // methods: {

    // },
    // computed: {
    // }
}

