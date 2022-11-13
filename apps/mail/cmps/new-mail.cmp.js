import { mailService } from "../services/mail.service.js"

export default {
    template: `
    <section class="new-mail fixed" @submit.prevent="" >
        <header class="flex justify-between">
            <div>New Message</div>     
 
             <div>
                <span class="btn blocked" title="Minimize" @click="minimize">-</span>
                <span class="btn blocked" title="Full screen" @click="toFullScreen">↕</span>
                <span class="btn" title="Save & close" @click="close(true)">x</span>
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
            <span class="btn pill send-btn" title="Send" @click="close(false)" >Send</span> <span class="btn blocked" title="More send options">🔽</span>
            <span class="btn blocked" title="Formatting options">A</span>
            <span class="btn blocked" title="Attach files">📎</span>
            <span class="btn blocked" title="Insert link">🔗</span>
            <span class="btn blocked" title="Insert emoji">🙂</span>
            <span class="btn blocked" title="Insert files using Drive">DRIVE</span>
            <span class="btn blocked" title="Insert photo">🖼</span>
            <span class="btn blocked" title="Toggle confidential mode">🔒</span>
            <span class="btn blocked" title="Insert signature">🖋</span>
            <span class="btn blocked" title="More options">more</span>
            </div>
            <span class="btn" @click="discard" title="Discard draft">🗑</span>
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
    computed: {
        isValid() {
            return (this.recipients, this.subject) ? true : false
        }
    },
    methods: {
        minimize() {
            console.log('minimizing')

        },
        toFullScreen() {
             blocked('toFull')

        },
        close(isDraft = false) {
            if (!isDraft && !this.isValid) return
            mailService.save(this.recipients, this.subject, this.body, isDraft)
            this.$emit('close', false)
        },
        discard() {
            this.recipients = this.subject = this.body = ''
            this.$emit('close', false)

        }
    }
}