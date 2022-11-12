import appNav from '../cmps/app-nav.cmp.js'
import bookHeader from '../cmps/app-header.cmp.js'

export default {
    template:`
    <book-header />
        <section class="book home-page-container book full absolute">
            <div class="main-layout full flex justify-between absolute">
            </div>
            <section class="welcome-header absolute main-layout">
                <h1 class="bold">
                    Experience a fresh way to <span class="pop">manage books</span>
                </h1>
                <p class="sub-header">
                    Reach your goals with personalized insights, custom budget, spend tracking and subscription monitoring.
                </p>
            </section>

        </section>
        `,
    data() {
        return {
            a: 1
        }
    },
    created(){

    },
    methods:{

    },
    computed:{

    },
    components:{
        appNav,
        bookHeader,
    }
}