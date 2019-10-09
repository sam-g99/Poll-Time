import Vue from 'vue';
import Router from 'vue-router';

// Pages
import Home from './pages/Home';
import Create from './pages/Create';
import Poll from './pages/Poll';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/create',
      component: Create,
    },
    {
      path: '/poll/:id',
      component: Poll,
    },
  ],
});

export default router;
