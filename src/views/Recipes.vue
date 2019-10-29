<i18n>
{
  "en": {
    "title": "Recipes",
    "scan": "Scan QR Code",
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
    "scan": "QR Code scannen",
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
    <div class="panel">
      <div class="panel-heading is-flex is-space-between-justified">
        <p class="is-marginless">{{ $t('title') }}</p>
        <div class="buttons">
          <div class="dropdown is-right" :class="{ 'is-active': showShareMenu }">
            <div class="dropdown-trigger">
              <button class="button is-small" @click="showShareMenu = !showShareMenu">
                <span><font-awesome-icon icon="share" /></span>
                <span class="icon is-small">
                  <font-awesome-icon icon="angle-down" />
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <a @click="toggleQrCodeScannerDialog()" class="dropdown-item">
                  <font-awesome-icon icon="qrcode" /> {{ $t('scan') }}
                </a>
                <hr class="dropdown-divider">
                <a @click="downloadRecipes()" class="dropdown-item">
                  <font-awesome-icon icon="download" /> {{ $t('download') }}
                </a>
                <a @click="uploadRecipes()" class="dropdown-item">
                  <font-awesome-icon icon="upload" /> {{ $t('upload') }}
                </a>
              </div>
            </div>
          </div>
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
        <router-link :to="`/recipe/${recipe.title}`">
          {{ recipe.title }}
          &nbsp;
          <span class="tag is-info">
            <font-awesome-icon icon="clock" />&nbsp;{{ recipe.cookTimeInMinutes }}m
          </span>
          &nbsp;
          <span class="tag is-info">
            <font-awesome-icon icon="shopping-cart" />&nbsp;{{ recipe.ingredientsCount }}
          </span>
        </router-link>
        <button class="button is-small" @click="toggleRemoveRecipeDialog(recipe)">
          <font-awesome-icon icon="minus" />
        </button>
      </div>
    </div>

    <dialog-modal
      :title="$t('deleteDialog.title', { title: recipeToDelete.title })"
      :message="$t('deleteDialog.message', { title: recipeToDelete.title })"
      :ok="$t('deleteDialog.yes')"
      :cancel="$t('deleteDialog.no')"
      @ok="removeRecipe(recipeToDelete)"
      @cancelled="toggleRemoveRecipeDialog()"
      :show="showRemoveRecipeDialog"
    />

    <scan-qr-code-dialog
      :show="showQrCodeScannerDialog"
      @scanResult="importRecipeFromQrCode"
      @close="toggleQrCodeScannerDialog"
    />
  </div>
</template>

<script>
import DialogModal from '@/components/DialogModal.vue';
import ScanQrCodeDialog from '@/components/ScanQrCodeDialog.vue';

export default {
  name: 'recipes',
  components: {
    DialogModal,
    ScanQrCodeDialog,
  },
  data() {
    return {
      recipes: [],
      recipeToDelete: {},
      showRemoveRecipeDialog: false,
      showShareMenu: false,
      showQrCodeScannerDialog: false,
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
      this.recipes = this.$store.getters['recipes/list']();
    },
    downloadRecipes() {
      this.downloadDataAsFile('Recipes.json', JSON.stringify(this.$store.state.recipes));
      this.showShareMenu = false;
    },
    downloadDataAsFile(filename, data) { // from https://codepen.io/nigamshirish/pen/ZMpvRa
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    },
    uploadRecipes() {

    },
    toggleQrCodeScannerDialog() {
      this.showQrCodeScannerDialog = !this.showQrCodeScannerDialog;
    },
    importRecipeFromQrCode(content) {
      this.toggleQrCodeScannerDialog();
      this.$store.commit('recipes/addRecipe', JSON.parse(content));
      this.recipes = this.$store.getters['recipes/list']();
    },
  },
  mounted() {
    this.recipes = this.$store.getters['recipes/list']();
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
