export default {
    props:['note'],
    template: `
        <article class="note-media-cmp img-placeholder" :style="style">
            <a v-if="info.type==='note-img'" :href="info.url" target="_blank">
                <img 
                    class="border-radius-top"
                    :class="{all: !info.txt && !info.tile}"
                    :src="info.url" /></a>
            <a v-if="info.type === 'note-url'" :href="info.url" target="_blank" class="note-url">{{info.url}}</a>
            <iframe 
                v-if="info.type === 'note-vid'" 
                class="inline-block border-radius-top" 
                :class="{all: !info.txt && !info.tile}"
                width="100%" height="100%" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                :src="info.url">
            </iframe>
                <h3 v-if="info.title" class="note-title">{{info.title}}</h3>
                <p v-if="info.txt" class="note-txt">{{note.info.txt}}</p>
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

