<template>
  <div class="content">
    <div class="panel">
      <div class="panel-heading">Einkaufsliste</div>
      <label
        class="panel-block"
        v-for="item in $store.state.shoppingList"
        :key="$store.state.shoppingList.indexOf(item)"
      >
        <input type="checkbox" />
        {{ item.quantity }}{{ item.unit }} {{ item.name }}
        &nbsp;<router-link :to="`/recipe/${item.from}`">Rezept</router-link>
      </label>
    </div>

    <button class="button is-primary" @click="toggleDialog()">
      Alles eingekauft
    </button>
    <Dialog
      title="Alles eingekauft?"
      message="Hast du wirklich alles eingekauft?"
      ok="Ja"
      cancel="Nein"
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
