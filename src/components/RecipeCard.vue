<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title is-centered">
        {{ recipe.title }}
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
          <li>{{ recipe.ingredientsCount }} items on the list</li>
          <li>{{ recipe.cookTimeInMinutes }} minutes to prepare</li>
        </ul>
      </div>
    </div>
    <footer class="card-footer">
      <router-link class="card-footer-item" :to="`/recipe/${recipe.title}`">Cook now!</router-link>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'recipe-card',
  props: {
    recipe: Object,
  },
};
</script>
