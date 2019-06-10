<template>
  <div class="content">
    <div class="panel">
      <div class="panel-heading">Rezepte</div>
        <router-link
          to="/recipe"
          class="panel-block"
          v-for="recipe in recipes"
          :key="recipes.indexOf(recipe)"
        >
          {{ recipe.title }}
        </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recipes',
  data() {
    return {
      recipes: [
        {
          title: 'low knead pizza',
        },
      ],
    };
  },
};
</script>
