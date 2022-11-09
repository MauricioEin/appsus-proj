export default {
    props:['labels'],
    template: `
        <nav class="note-nav flex column nav-width">
            <div class="nav-row flex">
                <button><iconify-icon inline icon="ic:outline-lightbulb"></iconify-icon></button>
                <span class="nav-item inline-block capitalize">Notes</span>
            </div>
            <div v-for="label in labels" class="nav-row flex">
                <button><iconify-icon inline icon="ci:label"></iconify-icon></button>
                <span class="nav-item inline-block">{{label.title}}</span>
            </div>
            <div class="nav-row flex">
                <button><iconify-icon inline icon="ic:outline-edit"></iconify-icon></button>
                <span class="nav-item inline-block">Edit labels</span>
            </div>
            <div class="nav-row flex">
                <button><iconify-icon inline icon="material-symbols:archive-outline"></iconify-icon></button>
                <span class="nav-item inline-block">Archive</span>
            </div>
            <div class="nav-row flex">
                <button><iconify-icon inline icon="codicon:trash"></iconify-icon></button>
                <span class="nav-item inline-block">Trash</span>
            </div>
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

    },
    computed: {

    }
}