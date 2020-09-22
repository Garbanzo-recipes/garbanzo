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
    <g-title>{{ $t('rotd') }}</g-title>
    <recipe-card :recipe="recipeOfTheDay" />
  </div>
</template>

<script>
import GTitle from '@/components/GTitle.vue'
import RecipeCard from '@/components/RecipeCard.vue'

export default {
  GTitle,
  components: {
    RecipeCard,
  },
  data() {
    return {
      recipeOfTheDay: {},
    }
  },
  mounted() {
    ;[this.recipeOfTheDay] = this.$store.getters['recipes/list']()
    this.$forceUpdate()
  },
}
</script>
