export default {
    template: `
    <form class="book-filter" @submit.prevent="filter" >
        <button>🔍</button>
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