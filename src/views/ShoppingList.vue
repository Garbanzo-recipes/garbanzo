<template>
  <div class="content">
    <div class="panel">
      <div class="panel-heading">Einkaufsliste</div>
      <label class="panel-block" v-for="item in items" :key="items.indexOf(item)">
        <input type="checkbox" /> {{ item.quantity }}{{ item.unit }} {{ item.name }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shopping-list',
  data() {
    return {
      items: [
        {
          name: 'Mehl',
          unit: 'g',
          quantity: 300,
          from: 'low kneed pizza',
        },
        {
          name: 'Hefe',
          unit: 'g',
          quantity: 5,
          from: 'low kneed pizza',
        },
      ],
    };
  },
};
</script>
