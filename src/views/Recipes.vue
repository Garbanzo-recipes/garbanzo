<template>
  <div class="content">
    <div class="panel">
      <div class="panel-heading is-flex is-space-between-justified">
        <p class="is-marginless">Recipes</p>
        <button class="button is-secondary is-small" @click="$router.push('/recipe/new')">
          New recipe
        </button>
      </div>
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

<style scoped>
.is-space-between-justified {
  justify-content: space-between;
}

.is-aligned-center {
  align-self: center;
}
</style>
