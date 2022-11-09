export default {
    template: `
    <form class="mail-filter flex justify-between" @submit.prevent="filter" >
        <span class="btn" title="Search">🔍</span>
        <input 
            v-model="searchStr" 
            type="text" 
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