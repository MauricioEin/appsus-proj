export default {
    template: `
    <section class="new-mail" @submit.prevent="" >
        <header class="flex">
        <div>New Message</div>     
        <div><button>-</button><button>↕</button><button>x</button></div>
    </header>
    <form>
        <input 
            v-model="recipients" 
            type="text" 
            placeholder="Recipients">
        <input 
            v-model="subject" 
            type="text" 
            placeholder="Subject">
        <textarea v-model="body">
        </textarea>
    </form>
    <footer>
        <button>Send</button> <button>🔽</button>
        <button>A</button>
        <button>📎</button>
        <button>🔗</button>
        <button>🙂</button>
        <button>DRIVE</button>
        <button>🖼</button>
        <button>🔒</button>
        <button>🖋</button>
        <button>more</button>
        <button>🧺</button>

    </footer>
    </section>
`,
    data() {
        return {
            recipients: '',
            subject: '',
            body: '',
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.searchStr)
        }
    }
}