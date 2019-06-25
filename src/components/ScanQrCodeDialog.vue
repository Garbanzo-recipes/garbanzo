<template>
  <div class="modal is-active" v-show="show">
    <div class="modal-background"></div>
    <div class="modal-card" ref="card">
      <header class="modal-card-head">
        <span class="modal-card-title">Scan QR Code</span>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body is-flex is-justified-center">
        <qrcode-stream @decode="$emit('scanResult', $event)"></qrcode-stream>
      </section>
      <footer class="modal-card-foot is-flex is-justified-center">
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
  name: 'scan-qr-code-dialog',
  components: {
    QrcodeStream,
  },
  props: {
    // title: String,
    // value: Object,
    show: Boolean,
  },
};
</script>

<style scoped>
.is-justified-center {
  justify-content: center;
}
</style>
