export default {
    template: `
     <nav class="book about-nav">
        <ul class="main-layout flex justify-evenly">
            <li><router-link to="/about/missread">About <span class="mini-logo">Ms. Books</span></router-link></li>
            <li><router-link to="/about/mission">Our mission</router-link></li>
            <li><router-link to="/about/resources">Resorces</router-link></li>
            <li><router-link to="/about/contact">Contact us</router-link></li>
        </ul>
    </nav>
        `
}