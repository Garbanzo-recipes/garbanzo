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
    <g-title>{{ $t('title') }}</g-title>
    <div class="flex flex-row justify-start">
      <g-button @click="toggleAddItemDialog()">
        <font-awesome-icon icon="plus" />
      </g-button>
      <g-button
        class="mx-1"
        :variant="items.some((item) => item.checked) ? 'primary' : 'secondary'"
        :disabled="!items.some((item) => item.checked)"
        @click="removeSelectedItemd() /*toggleClearSelectedDialog()*/"
      >
        <font-awesome-icon icon="check" />
      </g-button>
      <g-button
        :variant="
          items.every((item) => !item.checked) ? 'primary' : 'secondary'
        "
        :disabled="items.length === 0"
        @click="toggleClearAllDialog()"
      >
        <font-awesome-icon icon="check-double" />
      </g-button>
    </div>
    <div class="rounded-lg border border-gray-300 shadow flex flex-col mt-2">
      <label v-show="items.length === 0" class="p-3 text-gray-500 text-center">
        No entries yet
      </label>
      <label
        v-for="item in items"
        :key="items.indexOf(item)"
        class="p-3 hover:bg-gray-200 cursor-pointer"
      >
        <input v-model="item.checked" type="checkbox" />
        {{ item.quantity }}{{ item.unit }} {{ item.name }}
        <span v-if="item.from">
          &nbsp;|&nbsp;<nuxt-link :to="`/recipes/${item.from}`">{{
            $t('recipe')
          }}</nuxt-link>
        </span>
      </label>
    </div>

    <base-modal v-if="showClearAllDialog" :title="$t('clearAllDialog.title')">
      {{ $t('clearAllDialog.message') }}
      <template #footer>
        <g-button variant="danger" @click="clearShoppingList()">
          {{ $t('clearAllDialog.yes') }}
        </g-button>
        <g-button class="mr-1" outline @click="toggleClearAllDialog()">
          {{ $t('clearAllDialog.no') }}
        </g-button>
      </template>
    </base-modal>
    <!--<dialog-modal
      title="Bought selected items?"
      message="Did you really buy the selected items?"
      ok="Yes"
      cancel="No"
      @ok="removeSelectedItemd()"
      @cancelled="toggleClearSelectedDialog()"
      :show="showClearSelectedDialog"
    />-->
    <base-modal v-if="showAddItemDialog" :title="$t('addItem')">
      <div class="flex flex-wrap">
        <g-number-input
          v-model="newItem.quantity"
          :placeholder="$t('quantity')"
          class="w-24"
        />
        <g-text-input
          v-model="newItem.unit"
          class="w-32"
          :placeholder="$t('unit')"
        />
        <g-text-input
          v-model="newItem.name"
          class="w-56"
          :placeholder="$t('ingridient')"
        />
      </div>
      <template #footer>
        <g-button variant="danger" @click="addItem()"> OK </g-button>
        <g-button class="mr-1" outline @click="toggleAddItemDialog()">
          Cancel
        </g-button>
      </template>
    </base-modal>
  </div>
</template>

<script>
import BaseModal from '@/components/BaseModal.vue'
import GNumberInput from '@/components/GNumberInput.vue'
import GTextInput from '@/components/GTextInput.vue'
import GTitle from '@/components/GTitle.vue'

export default {
  components: {
    BaseModal,
    GNumberInput,
    GTextInput,
    GTitle,
  },
  data() {
    return {
      showClearAllDialog: false,
      showClearSelectedDialog: false,
      showAddItemDialog: false,
      items: [],
      newItem: {
        quantity: 1,
        unit: '',
        name: '',
      },
    }
  },
  mounted() {
    this.items = this.$store.getters['shoppingList/entries']
  },
  methods: {
    toggleAddItemDialog() {
      this.showAddItemDialog = !this.showAddItemDialog
      this.$forceUpdate()
    },
    addItem() {
      if (this.newItem.quantity !== 0 && this.newItem.name.length > 0) {
        this.$store.commit('shoppingList/addItem', this.newItem)
        this.items = this.$store.getters['shoppingList/entries']
      }

      this.toggleAddItemDialog()

      this.newItem = {
        quantity: 1,
        unit: '',
        name: '',
      }
    },
    toggleClearAllDialog() {
      this.showClearAllDialog = !this.showClearAllDialog
      this.$forceUpdate()
    },
    clearShoppingList() {
      this.toggleClearAllDialog()
      this.$store.commit('shoppingList/clear')
      this.items = this.$store.getters['shoppingList/entries']
    },
    toggleClearSelectedDialog() {
      this.showClearSelectedDialog = !this.showClearSelectedDialog
      this.$forceUpdate()
    },
    removeSelectedItemd() {
      this.toggleClearSelectedDialog()

      const updatedList = this.items
        .filter((item) => !item.checked)
        .map((item) => {
          const newItem = item
          delete newItem.checked
          return newItem
        })
      this.$store.commit('shoppingList/update', updatedList)
      this.items = this.$store.getters['shoppingList/entries']
    },
  },
}
</script>

<style scoped>
.is-justified-left {
  justify-content: flex-start;
}
.has-space-between-items {
  justify-content: space-between;
}
</style>
