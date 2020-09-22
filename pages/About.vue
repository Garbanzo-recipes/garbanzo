<template>
  <div class="about">
    <g-title>{{ $t('title') }}</g-title>
    <p v-t="'description'" />
    <p>
      {{ $t('moreInfo') }}:
      <a
        href="https://github.com/Garbanzo-recipes/garbanzo"
        class="font-medium text-blue-500 underline hover:text-blue-700"
      >
        Garbanzo-recipes/garbanzo
      </a>
    </p>
    <p><v-qriously :value="url" :size="270" level="M" /></p>
  </div>
</template>

<script>
import GTitle from '@/components/GTitle.vue'

export default {
  components: {
    GTitle,
    VQriously: () =>
      import(
        /* webpackChunkName: "v-qriously" */ '@/components/v-qriously.vue'
      ),
  },
  data() {
    return {
      url: window.location.origin + window.location.pathname,
    }
  },
}
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
