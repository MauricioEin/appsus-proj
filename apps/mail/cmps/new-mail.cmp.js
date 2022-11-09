export default {
    template: `
    <section class="new-mail fixed" @submit.prevent="" >
        <header class="flex justify-between">
            <div>New Message</div>     
 
             <div>
                <span class="btn" title="Minimize" @click="minimize">-</span>
                <span class="btn" title="Full screen" @click="toFullScreen">↕</span>
                <span class="btn" title="Save & close" @click="close">x</span>
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
            <span class="btn" title="Send" >Send</span> <span class="btn" title="More send options">🔽</span>
            <span class="btn" title="Formatting options">A</span>
            <span class="btn" title="Attach files">📎</span>
            <span class="btn" title="Insert link">🔗</span>
            <span class="btn" title="Insert emoji">🙂</span>
            <span class="btn" title="Insert files using Drive">DRIVE</span>
            <span class="btn" title="Insert photo">🖼</span>
            <span class="btn" title="Toggle confidential mode">🔒</span>
            <span class="btn" title="Insert signature">🖋</span>
            <span class="btn" title="More options">more</span>
            </div>
            <span class="btn" title="Discard draft">🗑</span>

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