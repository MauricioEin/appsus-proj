export default {
    props: ['mail'],
    template: `
    <article class="mail-preview flex">
        <div>drag</div>
        <div><input type="checkbox" @change="check"></div>
        <div>star</div>
        <div>important</div>
        <div>{{mail.subject}}</div>
        <div>{{mail.body}}</div>
        <div>attachment</div>
        <div>{{mail.sentAt}}</div>
    </article>
    `,
    methods:{
        check({target:{checked}}){
            this.$emit('checked', checked)
        }
    }
}