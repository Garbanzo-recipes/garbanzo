import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Recipes from './views/Recipes.vue';
import Recipe from './views/Recipe.vue';
import RecipeEdit from './views/RecipeEdit.vue';
import ShoppingList from './views/ShoppingList.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: Recipes,
    },
    {
      path: '/recipe/new',
      name: 'recipe-edit',
      component: RecipeEdit,
    },
    {
      path: '/recipe/:title/edit',
      name: 'recipe-edit',
      component: RecipeEdit,
    },
    {
      path: '/recipe/:title',
      name: 'recipe',
      component: Recipe,
    },
    {
      path: '/shopping-list',
      name: 'shopping-list',
      component: ShoppingList,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      component: About,
    },
  ],
});
