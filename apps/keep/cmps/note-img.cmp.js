export default {
    props:['note'],
    template: `
        <article class="note-img-cmp" :style="style">
            <img :src="info.url"/>
            <h3 v-if="info.title" class="note-title">{{info.title}}</h3>
            <p v-if="info.txt" class="note-txt">{{note.info.url}}</p>

        </article>
    `,
    data() {
        return {
            info:this.note.info,
            style: this.note.style || '',
        }
    },
    created() {
        console.log(this.$props.note)
    },
    methods: {

    },
    computed: {
    }
}

