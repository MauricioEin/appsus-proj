const { createApp } = Vue

import { router } from './routes.js'

import appHeader from './cmps/app-header.cmp.js'
import appFooter from './cmps/app-footer.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'

const options = {
    template: `
        <section>
            <app-header v-if="!isApp" />
            <router-view @isApp="inApp" />
            <!-- <app-footer /> -->
            <user-msg />
        </section>
    `,
    data() {
        return { isApp: false }
    },
    methods:{
        inApp(isApp){
            this.isApp=isApp;
        }
    },
    components: {
        appHeader,
        appFooter,
        userMsg,
    },
}

const app = createApp(options)
app.use(router)
app.mount('#app')
