import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Recipes from './views/Recipes.vue';
import Recipe from './views/Recipe.vue';
import RecipeEdit from './views/RecipeEdit.vue';
import Weekly from './views/Weekly.vue';
import ShoppingList from './views/ShoppingList.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
  // mode: 'history', // not compatible with gh-pages
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: Recipes,
      meta: {
        title: 'Recipes',
      },
    },
    {
      path: '/recipe',
      component: Vue.component('recipe-view', { render: h => h('router-view') }),
      children: [
        {
          path: '',
          component: { template: 'wtf??' },
        },
        {
          path: 'new',
          component: RecipeEdit,
        },
        {
          path: ':title/edit',
          component: RecipeEdit,
        },
        {
          path: ':title',
          component: Recipe,
        },
      ],
    },
    {
      path: '/weekly',
      name: 'weekly',
      component: Weekly,
      meta: {
        title: 'Weekly',
      },
    },
    {
      path: '/shopping-list',
      name: 'shopping-list',
      component: ShoppingList,
      meta: {
        title: 'Shopping list',
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      component: About,
      meta: {
        title: 'About',
      },
    },
  ],
  linkExactActiveClass: 'is-active',
});
