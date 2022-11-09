export default {
    props:['labels'],
    template: `
        <nav class="note-nav flex flex-column nav-width">
            <div class="nav-row flex">
                <button><iconify-icon inline icon="ic:outline-lightbulb"></iconify-icon></button>
                <span class="nav-item inline-block grow capitalize">Notes</span>
            </div>
            <div v-for="label in labels" class="nav-row flex">
                <button><iconify-icon inline icon="ci:label"></iconify-icon></button>
                <span class="nav-item inline-block grow">{{label.title}}</span>
            </div>
            <div class="nav-row flex">
                <button><iconify-icon inline icon="ic:outline-edit"></iconify-icon></button>
                <span class="nav-item inline-block grow">Edit labels</span>
            </div>
            <div class="nav-row flex">
                <button><iconify-icon inline icon="material-symbols:archive-outline"></iconify-icon></button>
                <span class="nav-item inline-block grow">Archive</span>
            </div>
            <div class="nav-row flex">
                <button><iconify-icon inline icon="codicon:trash"></iconify-icon></button>
                <span class="nav-item inline-block grow">Trash</span>
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