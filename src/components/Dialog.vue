<template>
  <div class="modal is-active" v-if="show">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
      </header>
      <section class="modal-card-body">
        {{ message }}
      </section>
      <footer class="modal-card-foot is-vertical-right">
        <button class="button" @click="$emit('cancelled')">{{ cancel }}</button>
        <button class="button is-success" @click="$emit('ok')">{{ ok }}</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dialog',
  props: [
    'title',
    'message',
    'ok',
    'cancel',
    'show',
  ],
};
</script>

<style scoped>
.is-vertical-right {
  justify-content: flex-end;
}
</style>
