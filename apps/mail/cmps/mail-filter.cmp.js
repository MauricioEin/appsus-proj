export default {
    template: `
    <form class="mail-filter" @submit.prevent="filter" >
        <button title="Search">🔍</button>
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