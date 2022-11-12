export default {
    props: ['labels', 'toggleNavMenu'],
    template: `
        <nav class="note-nav flex flex-column nav-width" :class="{shown:toggleNavMenu}">
            <ul class="clean-list"> 
            <li class="nav-row pill-right flex" @click="setFilter('')">
                <span class="btn-nav"><iconify-icon inline icon="ic:outline-lightbulb"></iconify-icon></span>
                <span class="nav-item inline-block grow capitalize flex align-center"
                    >Notes</span>
            </li>
            <li v-for="label in labels" class="nav-row pill-right flex" @click="setFilter(label.title)">
                <span class="btn-nav"><iconify-icon inline icon="ci:label"></iconify-icon></span>
                <span class="nav-item inline-block grow capitalize flex align-center"
                    >{{label.title}}</span>
            </li>
            <li class="nav-row pill-right flex">
                <span class="btn-nav"><iconify-icon inline icon="ic:outline-edit"></iconify-icon></span>
                <span class="nav-item inline-block grow capitalize flex align-center">Edit labels</span>
            </li>
            <li class="nav-row pill-right flex">
                <span class="btn-nav"><iconify-icon inline icon="material-symbols:archive-outline"></iconify-icon></span>
                <span class="nav-item inline-block grow capitalize flex align-center">Archive</span>
            </li>
            <li class="nav-row pill-right flex">
                <span class="btn-nav"><iconify-icon inline icon="codicon:trash"></iconify-icon></span>
                <span class="nav-item inline-block grow capitalize flex align-center">Trash</span>
            </li>
        </ul>
        </nav>
    `
    ,
    data() {
        return {
            navItemsFirst: ['notes', 'reminders'],
            navItemsLast: ['edit labels', 'archive', 'trash']
        }
    },
    created() {

    },
    methods: {
        setFilter(label) {
            const filter = {
                txt: '',
                isPinned: false,
                type: '',
                label
            }
            this.$emit('filterLabels', filter)
        }
    },
    computed: {

    }
}