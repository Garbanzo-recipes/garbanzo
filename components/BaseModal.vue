<!--
shamelessly copied from https://jakzaizzat.com/vue-modal
and afterwards slightly modified
-->

<template>
  <portal to="modal">
    <transition name="fade">
      <div
        class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center"
      >
        <div class="fixed inset-0 transition-opacity">
          <div
            class="absolute inset-0 bg-gray-500 opacity-75"
            @click.self.stop.prevent="handleClose"
          ></div>
        </div>
        <div
          class="z-10 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white px-4 pt-4 pb-4 sm:p-5 sm:pb-5">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div class="flex items-center justify-between mb-4">
                  <h3
                    id="modal-headline"
                    class="text-lg leading-6 font-semibold text-gray-900"
                  >
                    {{ title }}
                  </h3>
                  <a
                    class="p-1 text-gray-500 hover:text-gray-900 cursor-pointer"
                    @click.prevent="handleClose"
                  >
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
                <div class="mt-2" :class="{ scrollable: scrollable }">
                  <slot />
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-6 sm:px-6 sm:flex sm:flex-row-reverse">
            <slot name="footer">
              <g-button outline @click.prevent="handleClose">Cancel</g-button>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </portal>
</template>

<script>
import GButton from '@/components/GButton.vue'

export default {
  name: 'BaseModal',
  components: {
    GButton,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
  },
  /*
  created() {
    document.addEventListener('keyup', this.onClose)
  },
  destroyed() {
    document.removeEventListener('keyup', this.onClose)
  },
  */
  methods: {
    handleClose() {
      this.$emit('close')
    },
    onClose(event) {
      // Escape key
      if (event.keyCode === 27) {
        this.handleClose()
      }
    },
  },
}
</script>
<style scoped>
.scrollable {
  height: 300px;
  overflow-y: scroll;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
