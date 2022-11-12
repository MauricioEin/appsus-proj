export default {
    template: `
        <section class="about-page">
            <div class="about-page-brand absolute">
            <h1 class="appsus">AppSus</h1>

                <h1 class="slogan"> Keep things <span>simple</span></h1>
            </div>

            <div class="apps-logos flex">
            <div class="app-info flex flex-column">
                <div class="gmail"><router-link :to="'/maiml'" ><iconify-icon inline icon="cib:gmail"></iconify-icon></router-link></div>
                <p class="">Mr. Mail: All your messages <span> easily managed in one place </span></p>
            </div>
            <div class="app-info flex flex-column">                
                <div class="keep"><router-link :to="'/keep'" ><iconify-icon inline icon="simple-icons:googlekeep"></iconify-icon></router-link></div>
                <p class="">Ms. Notes: Keep track of <span> all your great ideas, anytime </span></p>
             </div>
             <div class="app-info flex flex-column">               
                <div class="books"><router-link :to="'/book'" ><iconify-icon inline icon="ph:books-light"></iconify-icon></router-link></div>
                <p class="">Ms. Books: Have your <span> library organised and growing </span></p>
                </div>
            </div>
        </section>
    `
}
