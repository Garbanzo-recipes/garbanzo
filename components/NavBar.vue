<template>
  <nav class="flex flex-col w-full sm:flex-row fixed bg-white">
    <div ref="nav" class="flex flex-row justify-between p-1">
      <img src="~/assets/garbanzo.svg" width="28" height="28" class="mx-3" />
      <div class="sm:hidden">
        <g-button outline @click="toggleMenu">
          <font-awesome-icon icon="hamburger" />
        </g-button>
      </div>
    </div>
    <nuxt-link
      v-for="item in items"
      v-show="showMenu"
      :key="items.indexOf(item)"
      :to="item.path"
      class="px-3 py-4 hover:bg-gray-100 text-gray-700 hover:text-black"
    >
      {{ item.title }}
    </nuxt-link>
  </nav>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showMenu: true,
      resizeObserver: null,
    }
  },
  /*
  mounted() {
    this.showMenu =
      window.getComputedStyle(document.querySelector('a.burger')).display ===
      'none'

    this.$router.beforeEach((to, from, next) => {
      if (
        window.getComputedStyle(document.querySelector('a.burger')).display !==
        'none'
      ) {
        this.showMenu = false
      }
      next()
    })
  },
  */
  mounted() {
    this.resizeObserver = new window.ResizeObserver((entries) => {
      this.showMenu = entries[0].contentRect.width < 100
    })

    this.resizeObserver.observe(this.$refs.nav)
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
  },
}
</script>

<style scoped>
.nuxt-link-exact-active {
  @apply text-black;
}

.slide-down-leave-active,
.slide-down-enter-active {
  transition: transform 0.1s;
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
