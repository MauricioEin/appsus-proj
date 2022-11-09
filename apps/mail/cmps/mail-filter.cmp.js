export default {
    template: `
    <form class="mail-filter" @submit.prevent="filter" >
        <span class="btn" title="Search">🔍</span>
        <input 
            v-model="searchStr" 
            type="text" 
            placeholder="Search mail">
    </form>
`,
    data() {
        return {
            searchStr: ''
        }
    },
    methods: {
        filter() {
            this.$emit('filter',this.searchStr)
        }
    }
}