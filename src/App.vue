<template>
  <div class="container">
    <nav class="navbar">
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
      <transition name="slide-down">
        <div class="navbar-menu is-active" v-if="showMenu">
          <div class="navbar-start">
            <router-link to="/" class="navbar-item" @click="toggleMenu()">
              Home
            </router-link>
            <router-link to="/recipes" class="navbar-item" @click="toggleMenu()">
              Recipes
            </router-link>
            <router-link to="/shopping-list" class="navbar-item" @click="toggleMenu()">
              Shopping List
            </router-link>
            <router-link to="/about" class="navbar-item" @click="toggleMenu()">
              About
            </router-link>
          </div>
        </div>
      </transition>
    </nav>
    <transition name="fade">
      <router-view class="margin-top-10" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
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

    this.$router.afterEach(() => {
      if (window.getComputedStyle(document.querySelector('a.burger')).display !== 'none') {
        this.showMenu = false;
      }
    });
  },
};
</script>

<style lang="sass">
@import '~bulma/bulma.sass'
</style>


<style scoped>
.margin-top-10 {
  margin-top: 10px;
}

.slide-down-leave-active,
.slide-down-enter-active {
  transition: transform .3s;
}
.slide-down-enter,
.slide-down-leave-to {
  transform: translateY(-100%);
}
.slide-down-enter-to,
.slide-down-leave {
  transform: translateY(0);
}

.fade-leave-active,
.fade-enter-active {
  transition: opacity .3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
