import mailPreview from "./mail-preview.cmp.js"
import mailListHeader from "./mail-list-header.cmp.js"

export default {
    props: ['mails'],
    template: `
    <section class="mail-list">
        <mail-list-header :checkedCount="checkedCount"/>
        <ul class="clean-list">
            <li v-for="mail in mails" :key="mail.id">
                <mail-preview :mail="mail" @checked="onChecked"/>
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
            checkedCount: 0,
        }
    },
    methods: {
        onChecked(isChecked) {
            isChecked ? this.checkedCount++ : this.checkedCount--
        },
    },
    components: {
        mailPreview,
        mailListHeader
    }
}