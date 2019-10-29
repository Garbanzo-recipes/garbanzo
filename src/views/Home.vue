<i18n>
{
  "en": {
    "rotd": "Recipe of the day"
  },
  "de": {
    "rotd": "Rezept des Tages"
  }
}
</i18n>

<template>
  <div class="home">
    <h1 class="is-size-3">{{ $t('rotd') }}</h1>
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
    [this.recipeOfTheDay] = this.$store.getters['recipes/list']();
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
