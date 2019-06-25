<template>
  <div class="content">
    <div class="panel">
      <div class="panel-heading is-flex has-space-between-items">
        Shopping list
        <div class="buttons">
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
        &nbsp;|&nbsp;<router-link :to="`/recipe/${item.from}`">Recipe</router-link>
      </label>
    </div>
    <dialog-modal
      title="Everything bought?"
      message="Did you really buy every piece?"
      ok="Yes"
      cancel="No"
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
      items: [],
    };
  },
  methods: {
    toggleClearAllDialog() {
      this.showClearAllDialog = !this.showClearAllDialog;
      this.$forceUpdate();
    },
    clearShoppingList() {
      this.toggleClearAllDialog();
      this.$store.commit('clearShoppingList');
      this.items = this.$store.getters.shoppingList;
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
      this.$store.commit('updateShoppingList', updatedList);
      this.items = this.$store.getters.shoppingList;
    },
  },
  mounted() {
    this.items = this.$store.getters.shoppingList;
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
