
export default {
    props: [''],
    template: `
        <aside>
            <button @click="onCompose">✏ Compose</button>
            <ul class="mail-menu">
                <li></li>
            </ul>
        </aside>

    `,
    data() {
    },
    methods: {
        onCompose(){
            this.$emit('compose')
        }
    },
    components: {
    }
}