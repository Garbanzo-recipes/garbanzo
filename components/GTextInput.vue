<template>
  <input
    type="text"
    class="
      bg-gray-200
      appearance-none
      border-2 border-gray-200
      rounded
      py-2
      px-4
      text-gray-700
      leading-tight
      focus:outline-none focus:bg-white focus:border-purple-500
    "
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
}
</script>
