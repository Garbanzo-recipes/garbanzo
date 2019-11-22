<template>
  <div class="modal is-active" v-if="show">
    <div class="modal-background"></div>
    <div class="modal-card pad-sides">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
      </header>
      <section class="modal-card-body">
        <slot name="content">
          {{ message }}
        </slot>
      </section>
      <footer class="modal-card-foot is-vertical-right">
        <slot name="footer">
          <button class="button" @click="$emit('cancelled')">{{ cancel }}</button>
          <button class="button is-success" @click="$emit('ok')">{{ ok }}</button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dialog-modal',
  props: {
    title: String,
    message: String,
    ok: String,
    cancel: String,
    show: Boolean,
  },
};
</script>

<style scoped>
.is-vertical-right {
  justify-content: flex-end;
}

.pad-sides {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
