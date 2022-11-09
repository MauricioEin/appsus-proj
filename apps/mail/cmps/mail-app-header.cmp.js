import mailFilter from '../cmps/mail-filter.cmp.js'

export default {
    template: `
    <header class="mail-header flex">
        <div class="flex">
            <button title="Main menu">🍔</button>
            <div title="Mr. Mail">logo</div>
        </div>
        <mail-filter @filter="setFilter"/>
        <div class="flex">
            <button title="Support">❔</button>
            <button title="settings">⚙</button>
            <button title="Appsus apps">🧮</button>
            <button title="User">👤</button>
        </div>
    </header>
    `,
    data() {
    },
    methods: {
        setFilter(searchStr){
            this.$emit('filter', searchStr)
        }

    },
    components: {
        mailFilter,
    }
}