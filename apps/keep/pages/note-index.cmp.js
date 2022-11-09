import { noteService } from "../../../services/note.service.js"

export default {
    template: `

    <h1>notes</h1>
     <section v-if="notes">
        <div v-for="note in notes">
            {{note}}
        </div>
     </section>
    `,
    data() {
        return {
            notes: null
        }
    },
    created() {
        noteService.query()
            .then(notes => this.notes = notes)
    },
    methods: {

    },
    computed: {
        getNotes(){ 
        }
    }
}
// export default {
//     template :`
//     `,
//     data() {
//         return {

//         }
//     },
//     created() {

//     },
//     methods: {

//     },
//     computed: {

//     }
// }
