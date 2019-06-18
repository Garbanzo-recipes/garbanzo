<template>
  <div class="content">
    <div class="panel">
      <div class="panel-heading">Shopping list</div>
      <label
        class="panel-block"
        v-for="item in $store.state.shoppingList"
        :key="$store.state.shoppingList.indexOf(item)"
      >
        <input type="checkbox" />
        {{ item.quantity }}{{ item.unit }} {{ item.name }}
        &nbsp;|&nbsp;<router-link :to="`/recipe/${item.from}`">Recipe</router-link>
      </label>
    </div>

    <button class="button is-primary" @click="toggleDialog()">
      Alles eingekauft
    </button>
    <Dialog
      title="Everything bought?"
      message="Did you really buy every piece?"
      ok="Yes"
      cancel="No"
      @ok="clearShoppingList()"
      @cancelled="toggleDialog()"
      :show="showClearDialog"
    />
  </div>
</template>

<script>
import Dialog from '@/components/Dialog.vue';

export default {
  name: 'shopping-list',
  components: {
    Dialog,
  },
  data() {
    return {
      showClearDialog: false,
    };
  },
  methods: {
    toggleDialog() {
      this.showClearDialog = !this.showClearDialog;
      this.$forceUpdate();
    },
    clearShoppingList() {
      this.toggleDialog();
      this.$store.commit('clearShoppingList');
    },
  },
};
</script>
