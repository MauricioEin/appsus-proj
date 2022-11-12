import noteFilter from './note-filter.cmp.js'

export default {
    template: `
    <header class="notes-main-header full flex justify-between">
        <div>
            <iconify-icon inline icon="bytesize:menu" @click="$emit('toggleNavMenu')"></iconify-icon>
            <router-link :to="'/'">Keep</router-link>
        </div>  
        <note-filter @filter="emitFilter" />
        <div class="usr-icon">
            <span class="pill">M</span>
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