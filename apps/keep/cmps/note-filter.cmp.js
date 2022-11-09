import {noteService} from '../services/note.service.js'

export default {
    template: `
        <section class="filter-notes">
            <input type="search" list="d" class="search-box" @input="getNotesToShow" placeholder="Search" v-model="filterBy.txt" />
            <div v-if="notesToShow" v-for="note in notesToShow">{{note}}</div>
        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: ' ',
                type: '',
                label: 'Get my stuff together',
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
            noteService.getFilteredNotes({...this.filterBy})
                .then(notes => this.notesToShow = notes)

        },
        computed: {
        }
    }
}
