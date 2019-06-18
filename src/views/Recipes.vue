<template>
  <div class="content">
    <div class="panel">
      <div class="panel-heading">Recipes</div>
        <router-link
          :to="`/recipe/${recipe.title}`"
          class="panel-block"
          v-for="recipe in recipes"
          :key="recipes.indexOf(recipe)"
        >
          {{ recipe.title }}
        </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recipes',
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    console.log('mounted');
    this.recipes = this.$store.getters.recipeList();
  },
};
</script>
