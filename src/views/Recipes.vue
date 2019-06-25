<template>
  <div class="content">
    <div class="panel">
      <div class="panel-heading is-flex is-space-between-justified">
        <p class="is-marginless">Recipes</p>
        <div class="buttons">
          <button class="button is-small" @click="downloadRecipes()">
            <font-awesome-icon icon="download" />
          </button>
          <button class="button is-small" @click="$router.push('/recipe/new')">
            <font-awesome-icon icon="plus" />
          </button>
        </div>
      </div>
      <div
        class="panel-block is-flex has-space-between-items"
        v-for="recipe in recipes"
        :key="recipes.indexOf(recipe)"
      >
        <router-link :to="`/recipe/${recipe.title}`">{{ recipe.title }}</router-link>
        <button class="button is-small" @click="toggleRemoveRecipeDialog(recipe)">
          <font-awesome-icon icon="minus" />
        </button>
      </div>
    </div>

    <dialog-modal
      :title="`Delete ${recipeToDelete.title}?`"
      :message="`Do you really want to delete ${recipeToDelete.title}?`"
      ok="Yes"
      cancel="No"
      @ok="removeRecipe(recipeToDelete)"
      @cancelled="toggleRemoveRecipeDialog()"
      :show="showRemoveRecipeDialog"
    />
  </div>
</template>

<script>
import DialogModal from '@/components/DialogModal.vue';

export default {
  name: 'recipes',
  components: {
    DialogModal,
  },
  data() {
    return {
      recipes: [],
      recipeToDelete: {},
      showRemoveRecipeDialog: false,
    };
  },
  methods: {
    toggleRemoveRecipeDialog(recipe) {
      this.showRemoveRecipeDialog = !this.showRemoveRecipeDialog;
      if (recipe) {
        this.recipeToDelete = recipe;
      }
      this.$forceUpdate();
    },
    removeRecipe(recipe) {
      this.toggleRemoveRecipeDialog();
      this.$store.commit('removeRecipe', recipe);
      this.recipes = this.$store.getters.recipeList();
    },
    downloadRecipes() {
      this.downloadDataAsFile('Recipes.json', JSON.stringify(this.$store.state.recipes));
    },
    downloadDataAsFile(filename, data) { // from https://codepen.io/nigamshirish/pen/ZMpvRa
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    },
  },
  mounted() {
    this.recipes = this.$store.getters.recipeList();
  },
};
</script>

<style scoped>
.is-space-between-justified {
  justify-content: space-between;
}

.is-aligned-center {
  align-self: center;
}
.has-space-between-items {
  justify-content: space-between;
}
</style>
