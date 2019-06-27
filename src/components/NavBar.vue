<i18n>
{
  "en": {
    "Home": "Home",
    "Recipes": "Recipes",
    "Weekly": "Weekly",
    "Shopping list": "Shopping list",
    "About": "About"
  },
  "de": {
    "Home": "Home",
    "Recipes": "Rezepte",
    "Weekly": "Wochenplan",
    "Shopping list": "Einkaufsliste",
    "About": "Über"
  }
}
</i18n>

<template>
  <nav class="navbar is-fixed-top">
    <div class="navbar-brand">
      <div class="navbar-item">Garbanzo</div>
      <a
        role="button"
        class="navbar-burger burger"
        @click="toggleMenu()"
        :class="showMenu ? 'is-active' : ''"
      >
        <span />
        <span />
        <span />
      </a>
    </div>
    <transition name="slide-down" mode="in-out">
      <div class="navbar-menu is-active" v-if="showMenu">
        <div class="navbar-start">
          <router-link
            v-for="item in items"
            :key="items.indexOf(item)"
            :to="item.path"
            class="navbar-item"
            v-t="item.title"
          />
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
export default {
  name: 'nav-bar',
  props: {
    items: Array,
  },
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
  mounted() {
    this.showMenu = window.getComputedStyle(document.querySelector('a.burger')).display === 'none';

    this.$router.beforeEach((to, from, next) => {
      if (window.getComputedStyle(document.querySelector('a.burger')).display !== 'none') {
        this.showMenu = false;
      }
      next();
    });
  },
};
</script>

<style scoped>
.slide-down-leave-active,
.slide-down-enter-active {
  transition: transform .1s;
}
.slide-down-enter,
.slide-down-leave-to {
  transform: translateY(-100%);
}
.slide-down-enter-to,
.slide-down-leave {
  transform: translateY(0);
}

@media screen and (min-width: 1024px) {
  .container > .navbar .navbar-brand {
    margin-left: 0;
  }
}
</style>
