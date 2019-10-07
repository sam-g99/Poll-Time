import Vue from 'vue';
import Router from 'vue-router';

// Pages
import Home from './pages/Home';
import Page2 from './pages/Page2';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: Home,
		},
		{
			path: '/page2',
			component: Page2,
		},
	],
});

export default router;
