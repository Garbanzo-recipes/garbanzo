<template>
  <div class="content">
    <h1 class="title is-spaced">
      {{ recipe.title }}
      <router-link :to="`/recipe/${recipe.title}/edit`">
        <font-awesome-icon icon="edit" />
      </router-link>
    </h1>
    <h2 class="subtitle is-4">Ingredients</h2>
    <p>Personen: <input type="number" min="1" max="99" step="1" v-model="recipe.peopleCount"></p>
    <ul>
      <li v-for="ingredient in recipe.ingredients" :key="recipe.ingredients.indexOf(ingredient)">
        {{ ingredient.quantity * recipe.peopleCount }}{{ ingredient.unit }} {{ ingredient.name }}
      </li>
    </ul>
    <button class="button is-primary" @click="putItemsOnShoppingList()">Put on list!</button>
    <h2 class="subtitle is-4">Preparation</h2>
    <p>{{ recipe.preparation }}</p>
    <button class="button is-primary">Cook now!</button>
  </div>
</template>

<script>
export default {
  name: 'recipe',
  data() {
    return {
      recipe: {},
    };
  },
  methods: {
    putItemsOnShoppingList() {
      this.$store.commit('addToShoppingList', this.recipe.ingredients.map(n => Object.assign({}, n, {
        quantity: n.quantity * this.recipe.peopleCount,
        from: this.recipe.title,
      })));
    },
  },
  mounted() {
    this.recipe = this.$store.getters.recipeByTitle(this.$route.params.title);
  },
};
</script>
