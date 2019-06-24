<template>
  <div class="content">
    <input class="input is-large" type="text" v-model="recipe.title" placeholder="Title">
    <h2 class="subtitle is-4">Ingredients</h2>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">People</label>
      </div>
      <div class="field-body">
        <input class="input" type="number" min="1" max="99" step="1" v-model="recipe.peopleCount">
      </div>
    </div>
    <ul>
      <li
        class="field is-horizontal"
        v-for="ingredient in recipe.ingredients"
        :key="recipe.ingredients.indexOf(ingredient)"
      >
        <input class="input" type="number" v-model="ingredient.quantity" placeholder="Quantity">
        &nbsp;
        <input class="input" type="text" v-model="ingredient.unit" placeholder="Unit">
        &nbsp;
        <input class="input" type="text" v-model="ingredient.name" placeholder="Ingridient">
        &nbsp;
        <button class="button is-secondary" @click="removeIngridient(ingredient)">Remove</button>
      </li>
      <li class="field is-horizontal">
        <button class="button is-secondary" @click="addEmptyIngridient()">Add</button>
      </li>
    </ul>
    <h2 class="subtitle is-4">Preparation</h2>
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
