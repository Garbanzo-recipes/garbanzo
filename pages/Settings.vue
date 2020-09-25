<template>
  <div class="about">
    <g-title>Settings</g-title>
    <h2 class="title is-4">Server connection</h2>
    <h2 class="title is-4">People in household</h2>
    <div class="field has-addons">
      <p class="control has-icons-left">
        <input
          v-model="peopleCount"
          class="input"
          type="number"
          min="1"
          max="99"
          step="1"
        />
        <span class="icon is-small is-left">
          <font-awesome-icon icon="user-friends" />
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import GTitle from '@/components/GTitle.vue'

export default {
  components: {
    GTitle,
  },
  data() {
    return {
      peopleCount: 1,
    }
  },
}
</script>
