import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

import bookDetails from "./book-details.cpm.js"
import bookList from '../cmps/book-list.cmp.js'
import bookHeader from '../cmps/app-header.cmp.js'
import bookFooter from '../cmps/app-footer.cmp.js'
import userMsg from '../cmps/user-msg.cmp.js'


export default {
    template: `
    <section class="book">
        <book-header  v-if="!isHomePage"/>
        <main v-if="books" class="book main-layout main-content relative">
            <book-list 
            v-if="!selectedBook"
            :books="books"
            @bookSelected="selectBook" /> 
            <book-details
            v-else
            class="main-layout"
            :book="selectedBook" 
            @closed="selectedBook = null"/>
        </main>
        <book-footer class="book" v-if="!isHomePage"/>
</section>
    `,
    data() {
        return {
            selectedBook: null,
            books: null,
        }
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
            .catch(()=>showErrorMsg('Could not load books'))
    },
    methods: {
        selectBook(book) {
            this.selectedBook = book
        },
    },
    computed: {

    },
    components: {
        bookList,
        bookDetails,
        bookHeader,
        bookFooter,
        userMsg,
    }
}