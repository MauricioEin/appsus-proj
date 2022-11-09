import mailPreview from "./mail-preview.cmp.js"

export default {
    props: ['mails'],
    template: `
    Checked: {{checkedCount}}
    <ul class="clean-list">
        <li v-for="mail in mails" :key="mail.id">
            <mail-preview :mail="mail" @checked="onChecked"/>
        </li>
    </ul>
    `,
    data(){
        return{
            checkedCount: 0,
        }
    },
    methods:{
        onChecked(isChecked){
            isChecked? this.checkedCount++: this.checkedCount--


        }
    },
    components: {
        mailPreview,
    }
}