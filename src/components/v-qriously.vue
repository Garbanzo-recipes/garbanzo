<!-- shamelessly copied from vue-qriously -->

<template>
  <div>
    <canvas ref="qrcode"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return { qrious: null };
  },
  props: {
    background: {
      type: String,
      default: 'white',
    },
    backgroundAlpha: {
      type: Number,
      default: 0.0,
    },
    foreground: {
      type: String,
      default: 'black',
    },
    foregroundAlpha: {
      type: Number,
      default: 1.0,
    },
    level: {
      type: String,
      default: 'L',
    },
    mime: {
      type: String,
      default: 'image/png',
    },
    padding: {
      type: Number,
      default: null,
    },
    size: {
      type: Number,
      default: 100,
    },
    value: {
      type: String,
      required: true,
    },
  },
  watch: {
    background() {
      if (this.qrious) {
        this.qrious.background = this.background;
      }
    },
    backgroundAlpha() {
      if (this.qrious) {
        this.qrious.backgroundAlpha = this.backgroundAlpha;
      }
    },
    foreground() {
      if (this.qrious) {
        this.qrious.foreground = this.foreground;
      }
    },
    foregroundAlpha() {
      if (this.qrious) {
        this.qrious.foregroundAlpha = this.foregroundAlpha;
      }
    },
    level() {
      if (this.qrious) {
        this.qrious.level = this.level;
      }
    },
    mime() {
      if (this.qrious) {
        this.qrious.mime = this.mime;
      }
    },
    padding() {
      if (this.qrious) {
        this.qrious.padding = this.padding;
      }
    },
    size() {
      if (this.qrious) {
        this.qrious.size = this.size;
      }
    },
    value() {
      if (this.qrious) {
        this.qrious.value = this.value;
      }
    },
  },
  async mounted() {
    try {
      const Qrious = () => import(/* webpackChunkName: "qrious" */ 'qrious');

      const element = this.$refs.qrcode;
      const { background } = this;
      const { backgroundAlpha } = this;
      const { foreground } = this;
      const { foregroundAlpha } = this;
      const { level } = this;
      const { mime } = this;
      const { padding } = this;
      const { size } = this;
      const { value } = this;

      this.qrious = new Qrious({
        element,
        background,
        backgroundAlpha,
        foreground,
        foregroundAlpha,
        level,
        mime,
        padding,
        size,
        value,
      });
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }
  },
};
</script>
