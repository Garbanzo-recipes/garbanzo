<i18n>
{
  "en": {
    "itemsOnList": "{ingredientsCount} ingridients",
    "timeToPrepare": "{cookTimeInMinutes} minutes to prepare",
    "cookNow": "Cook now!"
  },
  "de": {
    "itemsOnList": "{ingredientsCount} Zutaten",
    "timeToPrepare": "{cookTimeInMinutes} Minuten Zubereitungszeit",
    "cookNow": "Jetz kochen!"
  }
}
</i18n>

<template>
  <div class="flex flex-col rounded-lg shadow-md border border-gray-200 w-64">
    <header class="text-xl py-2 px-3">
      {{ recipe.title }}
    </header>
    <ul class="list-disc ml-4 px-3 py-1 mb-2">
      <li>
        {{ $t('itemsOnList', { ingredientsCount: recipe.ingredientsCount }) }}
      </li>
      <li>
        {{
          $t('timeToPrepare', {
            cookTimeInMinutes: recipe.cookTimeInMinutes,
          })
        }}
      </li>
    </ul>
    <footer class="footer-bg px-2 py-2 flex flex-row justify-end">
      <g-button variant="primary" :to="`/recipes/${recipe.title}`">{{
        $t('cookNow')
      }}</g-button>
    </footer>
  </div>
</template>

<script>
import GButton from '@/components/GButton.vue'

export default {
  components: {
    GButton,
  },
  props: {
    recipe: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style scoped>
.footer-bg {
  background-color: hsl(220, 12%, 95%);
}
</style>
