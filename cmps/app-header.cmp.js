export default {
	template: `
        <header class="app-header flex justify-between">
            <h1 class="appsus"><router-link :to="'/'">AppSus</router-link></h1>
            <nav class="flex align-center"> 
                <div class="inlineblock relative">
                    <iconify-icon inline icon="ic:baseline-apps" @click="toggleMenu"></iconify-icon>
                    <ul v-if="isShown" class="clean-list dropdown-app-menu absolute">
                    <li><router-link :to="'/mail'" ><iconify-icon inline icon="cib:gmail"></iconify-icon></router-link></li>
                    <li><router-link :to="'/keep'" ><iconify-icon inline icon="simple-icons:googlekeep"></iconify-icon></router-link></li>
                    <li><router-link :to="'/book'" ><iconify-icon inline icon="ph:books-light"></iconify-icon></router-link></li>
                    </ul>
                </div>
                <router-link to="/about">About</router-link>
            </nav>
        </header>
    `,
    data(){
        return{
            isShown: false,
        }
    },
    methods: {
        toggleMenu(){
            this.isShown = !this.isShown
        }
    },
    computed:{

    }
}
