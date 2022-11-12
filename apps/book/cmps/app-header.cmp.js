import appNav from './app-nav.cmp.js'

export default {
    template: `
    <section class="book">
        <header class="main-header full relative">
            <!-- <h1 class="logo full absolute center">missRead</h1> -->
        </header>
        <div class="full nav-container">
            <div class="main-layout flex justify-between">
                <app-nav/>
                <router-link to="/" class="logo bright main-layout">Ms. Books</router-link>
            </div>
        </div>
    </section>
    `,
    methods: {
        setFilter(filterBy) {
            this.$emit('filter-by', filterBy)
        }
    },
    components: {
        appNav
    }
}