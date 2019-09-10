<template>
  <div class="about">
    <h1 class="title">Settings</h1>
    <h2 class="title is-4">Server connection</h2>
    <GithubSettings />
  </div>
</template>

<script>
import GithubSettings from '../components/GithubSettings.vue';

export default {
  name: 'settings',
  components: {
    GithubSettings,
  },
};
</script>
