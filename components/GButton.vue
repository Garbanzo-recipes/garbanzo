<template>
  <button
    class="btn"
    :class="[variant, { outline, disabled, small }]"
    @click.prevent="clickEvent"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'secondary',
    },
    to: {
      type: String,
      default: null,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    clickEvent($event) {
      if (!this.disabled) {
        if (this.to) {
          this.$nuxt.$router.push(this.to)
        } else {
          this.$emit('click', $event)
        }
      }
    },
  },
}
</script>

<style scoped>
.btn {
  @apply font-bold py-2 px-4 rounded inline-flex items-center border;
}

.btn.small {
  @apply py-1 px-3;
}

.btn.disabled {
  @apply opacity-50 cursor-not-allowed;
}

.btn.primary {
  @apply bg-blue-500 text-white border-blue-500;
}

.btn.primary:hover {
  @apply bg-blue-700 border-blue-700;
}

.btn.primary.outline {
  @apply bg-transparent text-blue-700 font-semibold border-blue-500;
}

.btn.primary.outline:hover {
  @apply bg-blue-500 text-white border-transparent;
}

.btn.secondary {
  @apply bg-gray-300 text-gray-800 border-gray-300;
}

.btn.secondary:hover {
  @apply bg-gray-400 border-gray-400;
}

.btn.secondary.outline {
  @apply bg-transparent text-gray-600 font-semibold border-gray-500;
}

.btn.secondary.outline:hover {
  @apply bg-gray-300 text-gray-800 border-transparent;
}

.btn.success {
  @apply bg-green-500 text-white border-green-500;
}

.btn.success:hover {
  @apply bg-green-700 border-green-700;
}

.btn.success.outline {
  @apply bg-transparent text-green-700 font-semibold border-green-500;
}

.btn.success.outline:hover {
  @apply bg-green-500 text-white border-transparent;
}

.btn.warning {
  @apply bg-yellow-400 text-black border-yellow-400;
}

.btn.warning:hover {
  @apply bg-yellow-600 border-yellow-600;
}

.btn.warning.outline {
  @apply bg-transparent text-yellow-700 font-semibold border-yellow-600;
}

.btn.warning.outline:hover {
  @apply bg-yellow-400 text-black border-transparent;
}

.btn.danger {
  @apply bg-red-500 text-white border-red-500;
}

.btn.danger:hover {
  @apply bg-red-700 border-red-700;
}

.btn.danger.outline {
  @apply bg-transparent text-red-700 font-semibold border-red-500;
}

.btn.danger.outline:hover {
  @apply bg-red-500 text-white border-transparent;
}
</style>
