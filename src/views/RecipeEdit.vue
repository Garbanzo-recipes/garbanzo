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
    <input class="input is-large" type="text" v-model="recipe.title" :placeholder="$t('title')">
    <h2 class="subtitle is-4">{{ $t('ingredients') }}</h2>
    <div class="field has-addons">
      <p class="control has-icons-left">
        <input class="input" type="number" min="1" max="99" step="1" v-model="recipe.peopleCount">
        <span class="icon is-small is-left">
          <font-awesome-icon icon="user-friends" />
        </span>
      </p>
    </div>
    <ul>
      <li
        class="field has-addons"
        v-for="ingredient in recipe.ingredients"
        :key="recipe.ingredients.indexOf(ingredient)"
      >
        <div class="control">
          <input
            class="input"
            type="number"
            v-model="ingredient.quantity"
            :placeholder="$t('quantity')"
          />
        </div>
        <div class="control">
          <input class="input" type="text" v-model="ingredient.unit" :placeholder="$t('unit')">
        </div>
        <div class="control">
          <input
            class="input"
            type="text"
            v-model="ingredient.name"
            :placeholder="$t('ingridient')"
          />
        </div>
        <div class="control">
          <button class="button is-secondary" @click="removeIngridient(ingredient)">
            <font-awesome-icon icon="minus" />
          </button>
        </div>
      </li>
      <li class="field is-horizontal">
        <button class="button is-secondary" @click="addEmptyIngridient()">
          <font-awesome-icon icon="plus" />
        </button>
      </li>
    </ul>
    <h2 class="subtitle is-4">{{ $t('preparation') }}</h2>
    <div class="field has-addons">
      <p class="control has-icons-left">
        <input
          class="input"
          type="text"
          v-model="recipe.cookTimeInMinutes"
          :placeholder="$t('minutes')"
        />
        <span class="icon is-small is-left">
          <font-awesome-icon icon="clock" />
        </span>
      </p>
    </div>
    <textarea class="textarea" v-model="recipe.preparation" :placeholder="$t('preparation')" />
    <br>
    <div class="buttons">
      <button class="button" @click="$router.back()">{{ $t('cancel') }}</button>
      <button class="button is-primary" @click="save()">{{ $t('save') }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recipe-edit',
  data() {
    return {
      recipe: {
        ingredients: [],
      },
      originalTitle: '',
    };
  },
  methods: {
    addEmptyIngridient() {
      this.recipe.ingredients.push({
        quantity: null,
        unit: null,
        name: null,
      });
    },
    removeIngridient(ingredient) {
      this.recipe.ingredients = this.recipe.ingredients.filter(n => n !== ingredient);
    },
    save() {
      if (this.$route.path !== '/recipe/new') {
        this.$store.commit('recipes/updateRecipe', {
          originalTitle: this.originalTitle,
          recipe: this.recipe,
        });
      } else {
        this.$store.commit('recipes/addRecipe', this.recipe);
      }

      this.$router.push(`/recipe/${this.recipe.title}`);
    },
  },
  mounted() {
    if (this.$route.path !== '/recipe/new') {
      this.recipe = this.$store.getters['recipes/recipeByTitle'](this.$route.params.title);
      this.originalTitle = this.recipe.title;
    }
  },
};
</script>
