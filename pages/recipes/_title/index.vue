<i18n>
{
  "en": {
    "ingredients": "Ingredients",
    "putOnList": "Put on list!",
    "preparation": "Preparation",
    "preparationTime": "Preparation time",
    "cookNow": "Cook now!"
  },
  "de": {
    "ingredients": "Zutaten",
    "putOnList": "Auf die Liste!",
    "preparation": "Zubereitung",
    "preparationTime": "Dauer",
    "cookNow": "Jetz kochen!"
  }
}
</i18n>

<template>
  <div class="content">
    <g-title>
      <div class="flex flex-wrap">
        {{ recipe.title }}
        <g-button
          class="ml-2"
          outline
          @click="$router.push(`/recipes/${recipe.title}/edit`)"
        >
          <font-awesome-icon icon="pen" />
        </g-button>
      </div>
    </g-title>
    <g-subtitle>{{ $t('ingredients') }}</g-subtitle>
    <div class="field has-addons">
      <g-number-input v-model="recipe.peopleCount" min="1" max="99" step="1" />
      <span class="icon is-small is-left">
        <font-awesome-icon icon="user-friends" />
      </span>
    </div>
    <ul class="list-disc ml-8 my-4">
      <li
        v-for="ingredient in recipe.ingredients"
        :key="recipe.ingredients.indexOf(ingredient)"
        class="mt-1"
      >
        {{ ingredient.quantity * recipe.peopleCount }}{{ ingredient.unit }}
        {{ ingredient.name }}
      </li>
    </ul>
    <g-button variant="primary" @click="putItemsOnShoppingList()">
      {{ $t('putOnList') }}
    </g-button>
    &nbsp;
    <font-awesome-icon
      v-if="didPutOnList"
      icon="check"
      size="2x"
      class="has-text-success"
    />
    <g-subtitle>{{ $t('preparation') }}</g-subtitle>
    <p class="mb-3">
      {{ $t('preparationTime') }}: {{ recipe.cookTimeInMinutes }}m
    </p>
    <p class="mb-3 text-justify w-text">
      {{ recipe.preparation }}
    </p>
    <g-button variant="primary">{{ $t('cookNow') }}</g-button>
  </div>
</template>

<script>
import GTitle from '@/components/GTitle.vue'
import GSubtitle from '@/components/GSubtitle.vue'
import GButton from '@/components/GButton.vue'
import GNumberInput from '@/components/GNumberInput.vue'

export default {
  components: {
    GTitle,
    GSubtitle,
    GButton,
    GNumberInput,
  },
  data() {
    return {
      recipe: {},
      didPutOnList: false,
    }
  },
  mounted() {
    this.recipe = this.$store.getters['recipes/recipeByTitle'](
      this.$route.params.title
    )
  },
  methods: {
    putItemsOnShoppingList() {
      this.$store.commit(
        'shoppingList/addItems',
        this.recipe.ingredients.map((n) => ({
          ...n,
          quantity: n.quantity * this.recipe.peopleCount,
          from: this.recipe.title,
        }))
      )
      this.didPutOnList = true
    },
  },
}
</script>

<style scoped>
.w-text {
  width: 35rem;
}
</style>
