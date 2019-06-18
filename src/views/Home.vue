<template>
  <div class="home">
    <h1 class="is-size-3">Recipe of the day</h1>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title is-centered">
          Low knead pizza
        </p>
        <!--<a href="#" class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>-->
      </header>
      <div class="card-content">
        <div class="content">
          <ul>
            <li>{{ '4' }} items on the list</li>
            <li>{{ '30' }} minutes to prepare</li>
          </ul>
        </div>
      </div>
      <footer class="card-footer">
        <router-link class="card-footer-item" to="/recipe/low knead pizza">Cook now!</router-link>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
};
</script>

<style scoped>
.card {
  margin-top: 10px;
  max-width: 300px !important;
}

.content ul {
  margin-top: 0;
}
</style>
