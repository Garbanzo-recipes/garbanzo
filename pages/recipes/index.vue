<i18n>
{
  "en": {
    "title": "Recipes",
    "download": "Download",
    "upload": "Upload",
    "deleteDialog": {
      "title": "Delete '{title}'?",
      "message": "Do you really want to delete '{title}'?",
      "yes": "Yes",
      "no": "No"
    }
  },
  "de": {
    "title": "Rezepte",
    "download": "Herunterladen",
    "upload": "Hochladen",
    "deleteDialog": {
      "title": "'{title}' löschen?",
      "message": "Willst du '{title}' wirklich löschen?",
      "yes": "Ja",
      "no": "Nein"
    }
  }
}
</i18n>

<template>
  <div class="content">
    <g-title>{{ $t('title') }}</g-title>
    <div class="flex flex-row justify-end">
      <g-button outline @click="downloadRecipes()">
        <font-awesome-icon icon="download" /> {{ $t('download') }}
      </g-button>
      <g-button class="mx-1" outline @click="uploadRecipes()">
        <font-awesome-icon icon="upload" /> {{ $t('upload') }}
      </g-button>
      <g-button variant="primary" @click="$router.push('/recipes/new/edit')">
        <font-awesome-icon icon="plus" />
      </g-button>
    </div>
    <div class="rounded-lg border border-gray-300 shadow flex flex-col mt-2">
      <div
        v-for="recipe in recipes"
        :key="recipes.indexOf(recipe)"
        class="p-3 hover:bg-gray-200 flex flex-row justify-between"
      >
        <nuxt-link :to="`/recipes/${recipe.title}`">
          {{ recipe.title }}
          &nbsp;
          <span class="tag is-info">
            <font-awesome-icon icon="clock" />&nbsp;{{
              recipe.cookTimeInMinutes
            }}m
          </span>
          &nbsp;
          <span class="tag is-info">
            <font-awesome-icon icon="shopping-cart" />&nbsp;{{
              recipe.ingredientsCount
            }}
          </span>
        </nuxt-link>
        <g-button small outline @click="toggleRemoveRecipeDialog(recipe)">
          <font-awesome-icon icon="minus" />
        </g-button>
      </div>
    </div>

    <base-modal
      v-if="showRemoveRecipeDialog"
      :title="$t('deleteDialog.title', { title: recipeToDelete.title })"
      @close="toggleRemoveRecipeDialog()"
    >
      {{ $t('deleteDialog.message', { title: recipeToDelete.title }) }}
      <template v-slot:footer>
        <g-button variant="danger" @click="removeRecipe(recipeToDelete)">
          {{ $t('deleteDialog.yes') }}
        </g-button>
        <g-button class="mr-1" outline @click="toggleRemoveRecipeDialog()">
          {{ $t('deleteDialog.no') }}
        </g-button>
      </template>
    </base-modal>
  </div>
</template>

<script>
import BaseModal from '@/components/BaseModal.vue'
import GTitle from '@/components/GTitle.vue'

export default {
  components: {
    BaseModal,
    GTitle,
  },
  data() {
    return {
      recipes: [],
      recipeToDelete: {},
      showRemoveRecipeDialog: false,
      showShareMenu: false,
    }
  },
  mounted() {
    this.recipes = this.$store.getters['recipes/list']()
  },
  methods: {
    toggleRemoveRecipeDialog(recipe) {
      this.showRemoveRecipeDialog = !this.showRemoveRecipeDialog
      if (recipe) {
        this.recipeToDelete = recipe
      }
      this.$forceUpdate()
    },
    removeRecipe(recipe) {
      this.toggleRemoveRecipeDialog()
      this.$store.commit('removeRecipe', recipe)
      this.recipes = this.$store.getters['recipes/list']()
    },
    downloadRecipes() {
      this.downloadDataAsFile(
        'Recipes.json',
        JSON.stringify(this.$store.state.recipes)
      )
      this.showShareMenu = false
    },
    downloadDataAsFile(filename, data) {
      // from https://codepen.io/nigamshirish/pen/ZMpvRa
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
    },
    uploadRecipes() {},
  },
}
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
