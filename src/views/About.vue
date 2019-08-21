<template>
  <div class="about">
    <h1 class="title">{{ $t('title') }}</h1>
    <p v-t="'description'" />
    <p>
      {{ $t('moreInfo') }}:
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

<!-- eslint-disable -->
<i18n>
{
  "en": {
    "title": "About Garbanzo",
    "description": "Garbanzo aims to be a personal cookbook app that makes it easy to follow recipes, to adopt them, to store them for later use and to share them privately with others.",
    "moreInfo": "For more information, please have a look at the projects page at Github"
  },
  "de": {
    "title": "Über Garbanzo",
    "description": "Garbanzo versucht eine persönliche Kochbuch-App zu sein, die es ermöglicht einfach Rezepten zu folgen, zu übernehmen, zu speichern und  mit Freunden zu Teilen.",
    "moreInfo": "Für weitere Informationen, schau bitte auf der Projektseite bei Github"
  }
}
</i18n>
<!-- eslint-enable -->
