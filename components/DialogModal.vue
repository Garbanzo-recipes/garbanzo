<template>
  <div v-if="show" class="modal is-active">
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
          <button class="button" @click="$emit('cancelled')">
            {{ cancel }}
          </button>
          <button class="button is-success" @click="$emit('ok')">
            {{ ok }}
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    ok: {
      type: String,
      default: '',
    },
    cancel: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
}
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
