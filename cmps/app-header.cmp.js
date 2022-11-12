export default {
	template: `
        <header class="app-header flex justify-between">
            <h1 class="appsus"><router-link :to="'/'">AppSus</router-link></h1>
            <nav class="flex align-center"> 
                <div class="inlineblock relative">
                    <iconify-icon inline icon="ic:baseline-apps" @click="toggleMenu"></iconify-icon>
                    <ul class="clean-list dropdown-app-menu absolute" :class="{shown: isShown}">
                    <li><router-link :to="'/mail'" @click="toggleMenu"><iconify-icon inline icon="cib:gmail"></iconify-icon></router-link></li>
                    <li><router-link :to="'/keep'" @click="toggleMenu"><iconify-icon inline icon="simple-icons:googlekeep"></iconify-icon></router-link></li>
                    <li><router-link :to="'/read'" @click="toggleMenu"><iconify-icon inline icon="ph:books-light"></iconify-icon></router-link></li>
                    </ul>
                </div>
                <span class="app-about"><router-link to="/about">About</router-link></span>
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
