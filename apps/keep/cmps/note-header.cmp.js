import noteFilter from './note-filter.cmp.js'

export default {
    template: `
        <note-filter @filter="emitFilter" />
    `,
    methods: {
        emitFilter(filter) {
            this.$emit('filter', filter)
        }
    },
    components: {
        noteFilter
    }

}