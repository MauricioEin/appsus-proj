export default {
    props:['note'],
    template: `
        <article class="note-text-cmp" :style="style">
            <h3 v-if="info.title" class="note-title">{{info.title}}</h3>
            <p v-if="info.txt" class="note-text">{{info.txt}}</p>
        </article>
    `,
    data() {
        return {
            info:this.note.info,
            style: this.note.style || ''
        }
    },
    created() {
    },
    methods: {

    },
    computed: {
    }
}
