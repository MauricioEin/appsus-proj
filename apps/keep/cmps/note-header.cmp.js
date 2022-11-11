import noteFilter from './note-filter.cmp.js'

export default {
    template: `
    <header class="notes-main-header full flex justify-between">
        <div>
            <iconify-icon inline icon="bytesize:menu" @click="$emit('toggleNavMenu')"></iconify-icon>
            <router-link :to="'/'">Keep</router-link>
        </div>  
        <note-filter @filter="emitFilter" />
        <div>
            <iconify-icon inline icon="ic:baseline-apps"></iconify-icon>
            <span class="usr-icon pill">M</span>
        </div>
    </header>
    `,
    methods: {
        emitFilter(filter) {
            this.$emit('filter', filter)
        },
    },
    components: {
        noteFilter
    }

}