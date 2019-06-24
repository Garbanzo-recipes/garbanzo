<template>
  <div class="home">
    <h1 class="is-size-3">Recipe of the day</h1>
    <recipe-card :recipe="recipeOfTheDay" />
  </div>
</template>

<script>
import RecipeCard from '@/components/RecipeCard.vue';

export default {
  name: 'home',
  components: {
    RecipeCard,
  },
  data() {
    return {
      recipeOfTheDay: {},
    };
  },
  mounted() {
    [this.recipeOfTheDay] = this.$store.getters.recipeList();
    this.$forceUpdate();
  },
};
</script>

<style scoped>
.card {
  margin-top: 10px;
  max-width: 300px !important;
}

.content ul {
  margin-top: 0;
}
</style>
