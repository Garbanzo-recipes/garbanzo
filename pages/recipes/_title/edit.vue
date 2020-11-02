<i18n>
{
  "en": {
    "title": "Title",
    "ingredients": "Ingredients",
    "quantity": "Quantity",
    "unit": "Unit",
    "ingridient": "Ingridient",
    "putOnList": "Put on list!",
    "preparation": "Preparation",
    "preparationTime": "Preparation time",
    "minutes": "Minutes",
    "cancel": "Cancel",
    "save": "Save"
  },
  "de": {
    "title": "Titel",
    "ingredients": "Zutaten",
    "quantity": "Menge",
    "unit": "Einheit",
    "ingridient": "Zutat",
    "putOnList": "Auf die Liste!",
    "preparation": "Zubereitung",
    "preparationTime": "Dauer",
    "minutes": "Minuten",
    "cookNow": "Jetz kochen!",
    "cancel": "Abbrechen",
    "save": "Speichern"
  }
}
</i18n>

<template>
  <div class="content">
    <g-text-input v-model="recipe.title" :placeholder="$t('title')" />
    <g-subtitle>{{ $t('ingredients') }}</g-subtitle>
    <div class="field has-addons">
      <p class="control has-icons-left">
        <g-number-input
          v-model="recipe.peopleCount"
          min="1"
          max="99"
          step="1"
        />
        <span class="icon is-small is-left">
          <font-awesome-icon icon="user-friends" />
        </span>
      </p>
    </div>
    <ul class="list-disc ml-8 my-4">
      <li
        v-for="ingredient in recipe.ingredients"
        :key="recipe.ingredients.indexOf(ingredient)"
        class="flex flex-wrap"
      >
        <g-number-input
          v-model="ingredient.quantity"
          :placeholder="$t('quantity')"
        />
        <g-text-input v-model="ingredient.unit" :placeholder="$t('unit')" />
        <g-text-input
          v-model="ingredient.name"
          :placeholder="$t('ingridient')"
        />
        <g-button outline @click="removeIngridient(ingredient)">
          <font-awesome-icon icon="minus" />
        </g-button>
      </li>
      <li>
        <g-button outline @click="addEmptyIngridient()">
          <font-awesome-icon icon="plus" />
        </g-button>
      </li>
    </ul>
    <g-subtitle>{{ $t('preparation') }}</g-subtitle>
    <div class="flex flex-wrap mb-4">
      <g-text-input
        v-model="recipe.cookTimeInMinutes"
        :placeholder="$t('minutes')"
      />
      <span class="icon is-small is-left">
        <font-awesome-icon icon="clock" />
      </span>
    </div>
    <textarea
      v-model="recipe.preparation"
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 w-text h-48"
      :placeholder="$t('preparation')"
    />
    <br />
    <div class="flex flex-row flex-wrap mt-4">
      <g-button outline class="mr-2" @click="$router.back()">
        {{ $t('cancel') }}
      </g-button>
      <g-button variant="primary" @click="save()">
        {{ $t('save') }}
      </g-button>
    </div>
  </div>
</template>

<script>
import GNumberInput from '@/components/GNumberInput.vue'
import GTextInput from '@/components/GTextInput.vue'
import GButton from '@/components/GButton.vue'
import GSubtitle from '@/components/GSubtitle.vue'

export default {
  components: {
    GNumberInput,
    GTextInput,
    GButton,
    GSubtitle,
  },
  data() {
    return {
      recipe: {
        ingredients: [],
      },
      originalTitle: '',
    }
  },
  mounted() {
    if (this.$route.path !== '/recipes/new/edit') {
      this.recipe = this.$store.getters['recipes/recipeByTitle'](
        this.$route.params.title
      )
      this.originalTitle = this.recipe.title
    }
  },
  methods: {
    addEmptyIngridient() {
      this.recipe.ingredients.push({
        quantity: null,
        unit: null,
        name: null,
      })
    },
    removeIngridient(ingredient) {
      this.recipe.ingredients = this.recipe.ingredients.filter(
        (n) => n !== ingredient
      )
    },
    save() {
      if (this.$route.path !== '/recipes/new/edit') {
        this.$store.commit('recipes/updateRecipe', {
          originalTitle: this.originalTitle,
          recipe: this.recipe,
        })
      } else {
        this.$store.commit('recipes/addRecipe', this.recipe)
      }

      this.$router.push(`/recipes/${this.recipe.title}`)
    },
  },
}
</script>

<style scoped>
.w-text {
  width: 35rem;
}
</style>
