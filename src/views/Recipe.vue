<template>
  <div class="content">
    <h1 class="title is-spaced is-flex">
      {{ recipe.title }}
      <!--<router-link :to="`/recipe/${recipe.title}/edit`">
        <font-awesome-icon icon="edit" />
      </router-link>-->
      <div class="buttons">
        <button class="button" @click="$router.push(`/recipe/${recipe.title}/edit`)">
          <font-awesome-icon icon="pen" />
        </button>
        <button class="button" @click="toggleQRCodeDialog()">
          <font-awesome-icon icon="share" />
        </button>
      </div>
    </h1>
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
    <p>Preparation time: {{ recipe.cookTimeInMinutes }}m</p>
    <p>{{ recipe.preparation }}</p>
    <button class="button is-primary">Cook now!</button>
    <qr-code-dialog
      :title="recipe.title"
      v-model="recipe"
      :show="showQrCode"
      @close="toggleQRCodeDialog"
    />
  </div>
</template>

<script>
import QrCodeDialog from '@/components/QrCodeDialog.vue';

export default {
  name: 'recipe',
  components: {
    QrCodeDialog,
  },
  data() {
    return {
      recipe: {},
      didPutOnList: false,
      showQrCode: false,
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
    toggleQRCodeDialog() {
      this.showQrCode = !this.showQrCode;
    },
  },
  mounted() {
    this.recipe = this.$store.getters.recipeByTitle(this.$route.params.title);
  },
};
</script>
