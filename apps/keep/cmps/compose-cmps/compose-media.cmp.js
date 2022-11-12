import { utilService } from '../../../../services/util.service.js'

export default {
    props: ['src', 'type', 'linkConverter', 'youtubeConverter'],
    template: `
            <img 
                v-if="type==='note-img'"
                @error="$emit('srcInvalid')"
                class="usr-img border-radius-top" 
                :src="src" />
            <iframe  
                v-if="type==='note-vid'"
                @error="$emit('srcInvalid')"
                class="inline-block" 
                width="100%" height="100%" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                :src="convertSrc">
            </iframe>
    `,
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
        convertSrc() {
            this.$emit('scrValid')
            const src = this.$props.youtubeConverter(this.$props.src)
            this.$emit('embeddedLink', src)
            return src
        }
    }
}