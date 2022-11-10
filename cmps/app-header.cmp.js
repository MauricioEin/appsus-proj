export default {
	template: `
        <header class="app-header flex justify-between">
            <h1>AppSus</h1>
            <nav>
                <router-link to="/">Home</router-link> | 
                <router-link to="/about">About</router-link> |
                <router-link to="/mail">Mr.Mail</router-link> |
                <router-link to="/keep">Ms.Keep</router-link> |
                <router-link to="/">Ms.Books</router-link>
                
            </nav>
        </header>
    `,
    data(){
        return{
        }
    },
    computed:{

    }
}
