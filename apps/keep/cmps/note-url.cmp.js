export default {
    props:['note'],
    template: `
        <article class="note-url-cmp" :style="style">
            <h3 v-if="note.title" class="note-title">{{info.title}}</h3>
            <p class="note-url">{{info.url}}</p>
            <p v-if="note.txt" (class="note-url">{{info.txt}}</p>
            <!-- <iframe :src="note.info.url" height="200" width="300"></iframe> -->

        </article>
    `,
    data() {
        return {
            info:this.note.info,
            style: this.note.style || '',
        }
    },
    created() {
    },
    methods: {

    },
    computed: {
    }
}

