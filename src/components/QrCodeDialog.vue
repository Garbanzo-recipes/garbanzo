<template>
  <div class="modal is-active" v-if="show">
    <div class="modal-background"></div>
    <div class="modal-card" ref="card">
      <header class="modal-card-head">
        <span class="modal-card-title">{{ title }}</span>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body is-flex is-justified-center">
        <qriously :value="JSON.stringify(value)" :size="280" />
      </section>
      <!--<footer class="modal-card-foot">
        <button class="button">Close</button>
      </footer>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'qr-code-dialog',
  props: {
    title: String,
    value: Object,
    show: Boolean,
  },
};
</script>

<style scoped>
.is-justified-center {
  justify-content: center;
}
</style>
