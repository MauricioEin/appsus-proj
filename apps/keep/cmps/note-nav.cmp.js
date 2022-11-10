export default {
    props:['labels'],
    template: `
        <nav class="note-nav flex flex-column nav-width">
            <ul class="clean-list"> 
            <li class="nav-row flex">
                <span class="btn btn-nav"><iconify-icon inline icon="ic:outline-lightbulb"></iconify-icon></span>
                <span class="nav-item inline-block grow capitalize flex align-center"
                    @click="setFilter('')">Notes</span>
            </li>
            <li v-for="label in labels" class="nav-row flex">
                <span class="btn btn-nav"><iconify-icon inline icon="ci:label"></iconify-icon></span>
                <span class="nav-item inline-block grow capitalize flex align-center"
                    @click="setFilter(label.title)">{{label.title}}</span>
            </li>
            <li class="nav-row flex">
                <span class="btn btn-nav"><iconify-icon inline icon="ic:outline-edit"></iconify-icon></span>
                <span class="nav-item inline-block grow capitalize flex align-center">Edit labels</span>
            </li>
            <li class="nav-row flex">
                <span class="btn btn-nav"><iconify-icon inline icon="material-symbols:archive-outline"></iconify-icon></span>
                <span class="nav-item inline-block grow capitalize flex align-center">Archive</span>
            </li>
            <li class="nav-row flex">
                <span class="btn btn-nav"><iconify-icon inline icon="codicon:trash"></iconify-icon></span>
                <span class="nav-item inline-block grow capitalize flex align-center">Trash</span>
            </li>
        </ul>
        </nav>
    `
    ,
    data() {
        return {
            navItemsFirst: ['notes', 'reminders'],
            navItemsLast: ['edit labels', 'archive','trash']
        }
    },
    created() {

    },
    methods: {
        setFilter(label){
            const filter = {
                txt:'',
                isPinned: false,
                type: '',
                label
            }
            this.$emit('filterLabels',filter)
        }
    },
    computed: {

    }
}