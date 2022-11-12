import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'

import keepApp from './apps/keep/pages/note-index.cmp.js'
import mailApp from './apps/mail/pages/mail-index.cmp.js'
import bookHome from './apps/book/pages/home-page.cmp.js'
import bookApp from './apps/book/pages/book-index.cmp.js'
import bookDetails from './apps/book/pages/book-details.cpm.js'
import bookEdit from './apps/book/pages/book-edit.cmp.js'
import bookSearch from './apps/book/pages/search-page.cmp.js'


const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: homePage,
		},
		{
			path: '/about',
			component: aboutPage,
		},
		{
			path: '/mail',
			component: mailApp,
		},
		{
			path: '/keep',
			component: keepApp,
		},
		{
			path: '/keep/:id',
			component: keepApp,
		},
		{
            path: '/read',
            component: bookHome,
		},
		{
			path: '/book',
			component: bookApp
		},
		{
			path: '/book/:id',
			component: bookDetails
		},
		{
			path: '/book/edit/:id?',
			component: bookEdit
		},
		{
			path: '/book/search/',
			component: bookSearch,
			children: [
				{
					path: ':search',
					component: bookSearch,
				},
				// {
				//     path: 'goals',
				//     component: aboutGoals,
				// },                
			]
		}

	],
}

export const router = createRouter(routerOptions)
