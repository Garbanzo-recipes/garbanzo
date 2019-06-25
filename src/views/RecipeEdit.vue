<template>
  <div class="content">
    <input class="input is-large" type="text" v-model="recipe.title" placeholder="Title">
    <h2 class="subtitle is-4">Ingredients</h2>
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
        <p class="control">
          <input class="input" type="number" v-model="ingredient.quantity" placeholder="Quantity">
        </p>
        <p class="control">
          <input class="input" type="text" v-model="ingredient.unit" placeholder="Unit">
        </p>
        <p class="control">
          <input class="input" type="text" v-model="ingredient.name" placeholder="Ingridient">
        </p>
        <p class="control">
          <button class="button is-secondary" @click="removeIngridient(ingredient)">
            <font-awesome-icon icon="minus" />
          </button>
        </p>
      </li>
      <li class="field is-horizontal">
        <button class="button is-secondary" @click="addEmptyIngridient()">
          <font-awesome-icon icon="plus" />
        </button>
      </li>
    </ul>
    <h2 class="subtitle is-4">Preparation</h2>
    <div class="field has-addons">
      <p class="control has-icons-left">
        <input class="input" type="text" v-model="recipe.cookTimeInMinutes" placeholder="Minutes" />
        <span class="icon is-small is-left">
          <font-awesome-icon icon="clock" />
        </span>
      </p>
    </div>
    <textarea class="textarea" v-model="recipe.preparation" placeholder="Preparation"></textarea>
    <br>
    <div class="buttons">
      <button class="button" @click="$router.back()">Cancel</button>
      <button class="button is-primary" @click="save()">Save</button>
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
        this.$store.commit('updateRecipe', {
          originalTitle: this.originalTitle,
          recipe: this.recipe,
        });
      } else {
        this.$store.commit('addRecipe', this.recipe);
      }

      this.$router.push(`/recipe/${this.recipe.title}`);
    },
  },
  mounted() {
    if (this.$route.path !== '/recipe/new') {
      this.recipe = this.$store.getters.recipeByTitle(this.$route.params.title);
      this.originalTitle = this.recipe.title;
    }
  },
};
</script>
