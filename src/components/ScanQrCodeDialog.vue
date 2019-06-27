<i18n>
{
  "en": {
    "title": "Scan QR Code",
    "cancel": "Cancel"
  },
  "de": {
    "title": "QR Code scannen",
    "cancel": "Abbrechen"
  }
}
</i18n>

<template>
  <div class="modal is-active" v-if="show">
    <div class="modal-background"></div>
    <div class="modal-card" ref="card">
      <header class="modal-card-head">
        <span class="modal-card-title">{{ $t('title') }}</span>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body is-flex is-justified-center">
        <qrcode-stream @decode="onDecode($event)"></qrcode-stream>
      </section>
      <footer class="modal-card-foot is-flex is-justified-center">
        <button class="button" @click="$emit('close')">{{ $t('cancel') }}</button>
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
  data() {
    return {
      chunks: [],
    };
  },
  methods: {
    onDecode(data) {
      const matches = data.match(/^\[([0-9]+)\/([0-9]+)\]:/);
      if (matches) {
        const chunksCount = parseInt(matches[2], 10);
        const chunkIndex = parseInt(matches[1], 10) - 1;
        this.chunks[chunkIndex] = data.slice(matches[0].length);

        if (this.chunks.length === chunksCount && this.chunks.every(chunk => chunk !== undefined)) {
          this.$emit('scanResult', this.chunks.join('').trim());
        }
      } else {
        this.$emit('scanResult', data);
      }
    },
    async onInitScanner(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          console.error('ERROR: you need to grant camera access permisson');
        } else if (error.name === 'NotFoundError') {
          console.error('ERROR: no camera on this device');
        } else if (error.name === 'NotSupportedError') {
          console.error('ERROR: secure context required (HTTPS, localhost)');
        } else if (error.name === 'NotReadableError') {
          console.error('ERROR: is the camera already in use?');
        } else if (error.name === 'OverconstrainedError') {
          console.error('ERROR: installed cameras are not suitable');
        } else if (error.name === 'StreamApiNotSupportedError') {
          console.error('ERROR: Stream API is not supported in this browser');
        }
      }
    },
  },
};
</script>

<style scoped>
.is-justified-center {
  justify-content: center;
}
</style>
