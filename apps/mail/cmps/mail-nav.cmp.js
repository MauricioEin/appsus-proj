
export default {
    props: ['folders', 'isWide'],
    template: `
        <aside class="mail-nav" :class="{'nav-width':isWide}">
            <button @click="onCompose" class="flex justify-between align-center">
                <span>✏</span>
                <span v-if="isWide">Compose</span>
            </button>
            <ul class="mail-menu clean-list">
                <li v-for="folder in folders">
                    <article @click="showFolder(folder.title)" :title="folder.title" :class="{'pill-right':isWide, pill:!isWide}">
                        <span class="folder-icon pill">{{folder.icon}}</span>
                        <span v-if="isWide" class="folder-title">{{folder.title}}</span>
                    </article>
                </li>
            </ul>
        </aside>

    `,
    data() {

    },
    methods: {
        onCompose() {
            this.$emit('compose')
        },
        showFolder(folder) {
            this.$emit('folder', folder)
        }
    },
    components: {
    }
}