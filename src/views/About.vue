<template>
  <div class="about">
    <h1 class="title">About Garbanzo</h1>
    <p>
      Garbanzo aims to be a personal cookbook app that makes it easy to follow
      recipes, to adopt them, to store them for later use and to share them
      privately with others.
    </p>
    <p>
      For more information, please have a look at the projects page at Github:
      <a href="https://github.com/Garbanzo-recipes/garbanzo">
        Garbanzo-recipes/garbanzo
      </a>
    </p>
    <p><qriously :value="url" :size="270" level="M" /></p>
  </div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      url: window.location.origin + window.location.pathname,
    };
  },
};
</script>
