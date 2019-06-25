<template>
  <div class="content">
    <h1 class="title is-spaced">
      {{ recipe.title }}
      <!--<router-link :to="`/recipe/${recipe.title}/edit`">
        <font-awesome-icon icon="edit" />
      </router-link>-->
      <button class="button" @click="$router.push(`/recipe/${recipe.title}/edit`)">
        <font-awesome-icon icon="pen" />
      </button>
      <button class="button" @click="">
        <font-awesome-icon icon="share" />
      </button>
    </h1>
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
      <li v-for="ingredient in recipe.ingredients" :key="recipe.ingredients.indexOf(ingredient)">
        {{ ingredient.quantity * recipe.peopleCount }}{{ ingredient.unit }} {{ ingredient.name }}
      </li>
    </ul>
    <button class="button is-primary" @click="putItemsOnShoppingList()">
      Put on list!
    </button>
    &nbsp;
    <font-awesome-icon icon="check" v-if="didPutOnList" size="2x" class="has-text-success"/>
    <h2 class="subtitle is-4">Preparation</h2>
    <p>{{ recipe.preparation }}</p>
    <button class="button is-primary">Cook now!</button>

    <dialog-modal
      title=""
      ok=""
      cancel="No"
      @ok="clearShoppingList()"
      @cancelled="toggleClearAllDialog()"
      :show="showClearAllDialog"
    >
      Did you really buy every piece?
    </dialog-modal>
  </div>
</template>

<script>
export default {
  name: 'recipe',
  data() {
    return {
      recipe: {},
      didPutOnList: false,
    };
  },
  methods: {
    putItemsOnShoppingList() {
      this.$store.commit('addToShoppingList', this.recipe.ingredients.map(n => Object.assign({}, n, {
        quantity: n.quantity * this.recipe.peopleCount,
        from: this.recipe.title,
      })));
      this.didPutOnList = true;
    },
  },
  mounted() {
    this.recipe = this.$store.getters.recipeByTitle(this.$route.params.title);
  },
};
</script>
