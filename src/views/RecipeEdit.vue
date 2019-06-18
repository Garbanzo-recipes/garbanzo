<template>
  <div class="content">
    <h1 class="title is-spaced">
      <input type="text" v-model="recipe.title" class="title is-spaced">
    </h1>
    <h2 class="subtitle is-4">Ingredients</h2>
    <p>Personen: <input type="number" min="1" max="99" step="1" v-model="recipe.peopleCount"></p>
    <ul>
      <li v-for="ingredient in recipe.ingredients" :key="recipe.ingredients.indexOf(ingredient)">
        {{ ingredient.quantity * recipe.peopleCount }}{{ ingredient.unit }} {{ ingredient.name }}
      </li>
    </ul>
    <h2 class="subtitle is-4">Preparation</h2>
    <textarea v-model="recipe.preparation"></textarea>
    <br><br>
    <button class="button is-primary" @click="save()">Save</button>
  </div>
</template>

<script>
export default {
  name: 'recipe',
  data() {
    return {
      recipe: {},
      originalTitle: '',
    };
  },
  methods: {
    save() {
      this.$store.commit('updateRecipe', {
        originalTitle: this.originalTitle,
        recipe: this.recipe,
      });
      this.$router.push(`/recipe/${this.recipe.title}`);
    },
  },
  mounted() {
    this.recipe = this.$store.getters.recipeByTitle(this.$route.params.title);
    this.originalTitle = this.recipe.title;
  },
};
</script>
