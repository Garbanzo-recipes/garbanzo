<template>
  <div class="container pad-sides">
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
            <router-link to="/" class="navbar-item">
              Home
            </router-link>
            <router-link to="/recipes" class="navbar-item">
              Recipes
            </router-link>
            <router-link to="/shopping-list" class="navbar-item">
              Shopping List
            </router-link>
            <router-link to="/about" class="navbar-item">
              About
            </router-link>
          </div>
        </div>
      </transition>
    </nav>
    <transition name="fade" mode="out-in">
      <router-view class="margin-top-bottom-10" />
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

    this.$router.beforeEach((to, from, next) => {
      if (window.getComputedStyle(document.querySelector('a.burger')).display !== 'none') {
        this.showMenu = false;
      }
      next();
    });
  },
};
</script>

<style lang="sass">
@import '~bulma/bulma.sass'
</style>


<style scoped>
.margin-top-bottom-10 {
  margin-top: 10px;
  margin-bottom: 10px;
}

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

.fade-leave-active,
.fade-enter-active {
  transition: opacity .1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.pad-sides {
  padding-left: 10px;
  padding-right: 10px;
}

@media screen and (min-width: 1024px) {
  .container > .navbar .navbar-brand {
    margin-left: 0;
  }
}
</style>
