export default {
    template: `
    <section class="new-mail fixed" @submit.prevent="" >
        <header class="flex justify-between">
            <div>New Message</div>     
            <div>
                <button title="Minimize" @click="minimize">-</button>
                <button title="Full screen" @click="toFullScreen">↕</button>
                <button title="Save & close" @click="close">x</button>
            </div>
        </header>
        <form class="flex flex-column">
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
        <footer class="flex justify-between">
            <div>
            <button title="Send" >Send</button> <button title="More send options">🔽</button>
            <button title="Formatting options">A</button>
            <button title="Attach files">📎</button>
            <button title="Insert link">🔗</button>
            <button title="Insert emoji">🙂</button>
            <button title="Insert files using Drive">DRIVE</button>
            <button title="Insert photo">🖼</button>
            <button title="Toggle confidential mode">🔒</button>
            <button title="Insert signature">🖋</button>
            <button title="More options">more</button>
            </div>
            <button title="Discard draft">🗑</button>

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
        minimize() {
            console.log('minimizing')

        },
        toFullScreen() {
            console.log('toFull')

        },
        close() {
            console.log('closing')
        }
    }
}