import mailFilter from '../cmps/mail-filter.cmp.js'

export default {
    template: `
    <header class="mail-header flex full justify-between">
        <div class="flex nav-width">
            <span class="btn" @click="toggleNav" title="Main menu">☰</span>
            <div title="Mr. Mail">logo</div>
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
    data() {
    },
    methods: {
        setFilter(searchStr){
            this.$emit('filter', searchStr)
        },
        toggleNav(){
            this.$emit('toggleNav')
        }

    },
    components: {
        mailFilter,
    }
}