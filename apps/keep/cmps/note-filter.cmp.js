import { noteService } from '../services/note.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    template: `
        <section class="filter-notes">
            <input type="search" list="d" class="search-box" @input="sendFilteredNotes" placeholder="Search" v-model="filterBy.txt" />
            <div v-if="notesToShow" v-for="note in notesToShow">{{note}}</div>
        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: '',
                type: '',
                label: '',
                isPinned: false
            },
            isSearchByType: false,
            notesToShow: null
        }
    },
    created() {
    },
    methods: {
        getNotesToShow() {
            noteService.getFilteredNotes({ ...this.filterBy })
                .then(notes => this.notesToShow = notes)
                .then(notes => eventBus.on('getEntities', this.notesToShow))

        },
        sendFilteredNotes() {
            this.$emit('filter', this.filterBy)
        }
    },
    computed: {
    }
}
