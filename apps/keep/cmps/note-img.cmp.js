export default {
    props:['note'],
    template: `
        <article class="note-img-cmp img-placeholder" :style="style">
            <a :href="info.url" target="_blank"><img :src="info.url" :class="{all: info.txt && info.tile}"/></a>
            <section class="img-text" :style="style">
                <h3 v-if="info.title" class="note-title">{{info.title}}</h3>
                <p v-if="info.txt" class="note-txt">{{note.info.txt}}</p>
            </section>

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

