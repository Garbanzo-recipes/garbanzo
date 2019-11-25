<template>
  <div class="container pad-sides">
    <nav-bar :items="navItems" />
    <transition name="fade" mode="out-in">
      <router-view class="margin-top-bottom-10" />
    </transition>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'app',
  components: {
    NavBar,
  },
  data() {
    return {
      navItems: this.$router.options.routes
        .filter((route) => !!route.meta)
        .map((route) => ({
          title: route.meta.title,
          path: route.path.replace(/:.*/, ''),
        })),
    };
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
</style>
