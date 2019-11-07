<template>
  <div class="about">
    <h1 class="title">Settings</h1>
    <h2 class="title is-4">Server connection</h2>
    <GithubSettings />
    <h2 class="title is-4">People in household</h2>
    <div class="field has-addons">
      <p class="control has-icons-left">
        <input class="input" type="number" min="1" max="99" step="1" v-model="peopleCount">
        <span class="icon is-small is-left">
          <font-awesome-icon icon="user-friends" />
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import GithubSettings from '../components/GithubSettings.vue';

export default {
  name: 'settings',
  components: {
    GithubSettings,
  },
  data() {
    return {
      peopleCount: 1,
    };
  },
};
</script>
