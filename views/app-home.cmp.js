export default {
	template: `
        <section class="home-page">
            <div class="home-page-brand absolute">
                <h1 class="slogan"> Work smart<br>not hard</h1>
                <h1 class="appsus">AppSus</h1>
            </div>

            <div class="apps-logos absolute">
                <h1 class="relative gmail"><router-link :to="'/mail'" ><iconify-icon inline icon="cib:gmail"></iconify-icon></router-link></h1>
                <h1 class="relative keep"><router-link :to="'/keep'" ><iconify-icon inline icon="simple-icons:googlekeep"></iconify-icon></router-link></h1>
                <h1 class="relative books"><router-link :to="'/read'" ><iconify-icon inline icon="ph:books-light"></iconify-icon></router-link></h1>
            </div>
        </section>
    `,
}
