import mailFilter from '../cmps/mail-filter.cmp.js'
// import image from '../../../assets/img/mail-loo.png'
export default {
    template: `
    <header class="mail-header flex full justify-between">
        <div class="flex nav-width align-center">
            <span class="btn" @click="toggleNav" title="Main menu">☰</span>
            <div  class="mail-logo flex align-center"
            title="Mr.mail" @click="toInbox">
                <img src="../../../assets/img/mail-logo.png"/>
                <span>Mr.mail</span>
            </div>
        </div>
        <mail-filter @filter="setFilter"/>
        
        <div class="flex">
            <span class="btn" title="Support">❔</span>
            <span class="btn" title="settings">⚙</span>
            <span class="btn" title="Appsus apps">🧮</span>
            <span class="btn" title="User">👤</span>
        </div>
    </header>
    `,
    methods: {
        setFilter(searchStr) {
            this.$emit('filter', searchStr)
        },
        toggleNav() {
            this.$emit('toggleNav')
        },
        toInbox() {
            this.$emit('logo', 'Inbox')
        }

    },
    components: {
        mailFilter,
    }
}