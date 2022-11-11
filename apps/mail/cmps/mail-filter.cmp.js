export default {
    template: `
    <form class="mail-filter flex justify-between" >
        <span class="btn" @click="filter" title="Search">🔍</span>
        <input 
            v-model="searchStr" 
            type="search" @search="filter"
            placeholder="Search mail">
        <span class="btn" title="Show search options">🎚</span>

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