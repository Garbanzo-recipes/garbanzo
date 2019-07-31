<template>
  <div class="modal is-active" v-if="show">
    <div class="modal-background"></div>
    <div class="modal-card" ref="card">
      <header class="modal-card-head">
        <span class="modal-card-title">{{ title }}</span>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body is-flex is-justified-center">
        <qriously :value="qrContent" :size="270" level="M" />
      </section>
      <!--<footer class="modal-card-foot">
        <button class="button">Close</button>
      </footer>-->
    </div>
  </div>
</template>

<script>
const splitIntoChunks = (str, chunkLength = 100, rightPad = ' ') => {
  const chunks = [];

  for (let offset = 0; offset < str.length; offset += chunkLength) {
    chunks.push(str.slice(offset, chunkLength + offset).padEnd(chunkLength, rightPad));
  }

  return chunks;
};

export default {
  name: 'qr-code-dialog',
  props: {
    title: String,
    value: Object,
    show: Boolean,
  },
  data() {
    return {
      qrContent: '',
    };
  },
  mounted() {
    const self = this;
    const chunks = (function* chunksGenerator() {
      const currentChunks = () => {
        const chunksArr = splitIntoChunks(JSON.stringify(self.value));

        return {
          chunksCount: chunksArr.length,
          chunksIt: chunksArr.entries(),
        };
      };

      let { chunksCount, chunksIt } = currentChunks();

      while (true) {
        const nextChunk = chunksIt.next();
        const value = nextChunk.value || [0, ''];

        if (value[1].length !== 0) {
          yield `[${value[0] + 1}/${chunksCount}]:${value[1]}`;
        }

        if (nextChunk.done) {
          ({ chunksCount, chunksIt } = currentChunks());
        }
      }
    }());

    setInterval(() => { this.qrContent = chunks.next().value; }, 200);
  },
};
</script>

<style scoped>
.is-justified-center {
  justify-content: center;
}
</style>
