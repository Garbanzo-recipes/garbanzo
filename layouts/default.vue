<i18n>
{
  "en": {
    "Home": "Home",
    "Recipes": "Recipes",
    "Weekly": "Weekly",
    "Shopping list": "Shopping list",
    "Settings": "Settings",
    "About": "About"
  },
  "de": {
    "Home": "Home",
    "Recipes": "Rezepte",
    "Weekly": "Wochenplan",
    "Shopping list": "Einkaufsliste",
    "Settings": "Einstellungen",
    "About": "Über"
  }
}
</i18n>

<template>
  <div class="container">
    <nav-bar :items="navItems" />
    <transition name="fade" mode="out-in">
      <Nuxt class="pt-16 px-3 pb-3" />
    </transition>
    <portal-target name="modal" />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      navItems: [
        {
          title: this.$t('Home'),
          path: '/',
        },
        {
          title: this.$t('Recipes'),
          path: '/recipes',
        },
        {
          title: this.$t('Weekly'),
          path: '/weekly',
        },
        {
          title: this.$t('Shopping list'),
          path: '/shoppinglist',
        },
        {
          title: this.$t('Settings'),
          path: '/settings',
        },
        {
          title: this.$t('About'),
          path: '/about',
        },
      ],
    }
  },
}
</script>

<style scoped>
.margin-top-bottom-10 {
  margin-top: 10px;
  margin-bottom: 10px;
}

.fade-leave-active,
.fade-enter-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.pad-sides {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
