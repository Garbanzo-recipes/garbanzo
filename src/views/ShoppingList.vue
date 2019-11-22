<i18n>
{
  "en": {
    "title": "Shopping list",
    "recipe": "Recipe",
    "clearAllDialog": {
      "title": "Everything bought?",
      "message": "Did you really buy every piece?",
      "yes": "Yes",
      "no": "No"
    },
    "quantity": "Quantity",
    "unit": "Unit",
    "ingridient": "Ingridient",
    "cancel": "Cancel",
    "save": "Save",
    "addItem": "Add ingridient"
  },
  "de": {
    "title": "Einkaufsliste",
    "recipe": "Rezept",
    "clearAllDialog": {
      "title": "Alles eingekauft?",
      "message": "Hast du wirklich alles eingekauft?",
      "yes": "Ja",
      "no": "Nein"
    },
    "quantity": "Menge",
    "unit": "Einheit",
    "ingridient": "Zutat",
    "cancel": "Abbrechen",
    "save": "Speichern",
    "addItem": "Zutat hinzufügen"
  }
}
</i18n>

<template>
  <div class="content">
    <div class="panel">
      <div class="panel-heading is-flex has-space-between-items">
        {{ $t('title') }}
        <div class="buttons">
          <button class="button is-small" @click="toggleAddItemDialog()">
            <font-awesome-icon icon="plus" />
          </button>
          <button
            class="button is-small"
            :class="{ 'is-primary': items.some(item => item.checked) }"
            @click="removeSelectedItemd()/*toggleClearSelectedDialog()*/"
            :disabled="!items.some(item => item.checked)"
          >
            <font-awesome-icon icon="check" />
          </button>
          <button
            class="button is-small"
            :class="{ 'is-primary': items.every(item => !item.checked) }"
            @click="toggleClearAllDialog()"
            :disabled="items.length === 0"
          >
            <font-awesome-icon icon="check-double" />
          </button>
        </div>
      </div>
      <label
        class="panel-block"
        v-for="item in items"
        :key="items.indexOf(item)"
      >
        <input type="checkbox" v-model="item.checked" />
        {{ item.quantity }}{{ item.unit }} {{ item.name }}
        <span v-if="item.from">
          &nbsp;|&nbsp;<router-link :to="`/recipe/${item.from}`">{{ $t('recipe') }}</router-link>
        </span>
      </label>
    </div>
    <dialog-modal
      :title="$t('clearAllDialog.title')"
      :message="$t('clearAllDialog.message')"
      :ok="$t('clearAllDialog.yes')"
      :cancel="$t('clearAllDialog.no')"
      @ok="clearShoppingList()"
      @cancelled="toggleClearAllDialog()"
      :show="showClearAllDialog"
    />
    <!--<dialog-modal
      title="Bought selected items?"
      message="Did you really buy the selected items?"
      ok="Yes"
      cancel="No"
      @ok="removeSelectedItemd()"
      @cancelled="toggleClearSelectedDialog()"
      :show="showClearSelectedDialog"
    />-->
    <dialog-modal
      :title="$t('addItem')"
      ok="OK"
      cancel="Cancel"
      :show="showAddItemDialog"
      @ok="addItem()"
      @cancel="toggleAddItemDialog()"
    >
      <div slot="content">
        <div class="field has-addons">
          <div class="control">
            <input
              class="input"
              type="number"
              :placeholder="$t('quantity')"
              v-model="newItem.quantity"
            />
          </div>
          <div class="control">
            <input
              class="input"
              type="text"
              :placeholder="$t('unit')"
              v-model="newItem.unit"
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input
              class="input"
              type="text"
              :placeholder="$t('ingridient')"
              v-model="newItem.name"
            />
          </div>
        </div>
      </div>
    </dialog-modal>
  </div>
</template>

<script>
import DialogModal from '@/components/DialogModal.vue';

export default {
  name: 'shopping-list',
  components: {
    DialogModal,
  },
  data() {
    return {
      showClearAllDialog: false,
      showClearSelectedDialog: false,
      showAddItemDialog: false,
      items: [],
      newItem: {
        quantity: 0,
        unit: '',
        name: '',
      },
    };
  },
  methods: {
    toggleAddItemDialog() {
      this.showAddItemDialog = !this.showAddItemDialog;
      this.$forceUpdate();
    },
    addItem() {
      this.$store.commit('shoppingList/addItem', this.newItem);
      this.items = this.$store.getters['shoppingList/entries'];
      this.toggleAddItemDialog();
    },
    toggleClearAllDialog() {
      this.showClearAllDialog = !this.showClearAllDialog;
      this.$forceUpdate();
    },
    clearShoppingList() {
      this.toggleClearAllDialog();
      this.$store.commit('shoppingList/clear');
      this.items = this.$store.getters['shoppingList/entries'];
    },
    toggleClearSelectedDialog() {
      this.showClearSelectedDialog = !this.showClearSelectedDialog;
      this.$forceUpdate();
    },
    removeSelectedItemd() {
      this.toggleClearSelectedDialog();

      const updatedList = this.items
        .filter(item => !item.checked)
        .map((item) => {
          const newItem = item;
          delete newItem.checked;
          return newItem;
        });
      this.$store.commit('shoppingList/update', updatedList);
      this.items = this.$store.getters['shoppingList/entries'];
    },
  },
  mounted() {
    this.items = this.$store.getters['shoppingList/entries'];
  },
};
</script>

<style scoped>
.is-justified-left {
  justify-content: flex-start;
}
.has-space-between-items {
  justify-content: space-between;
}
</style>
