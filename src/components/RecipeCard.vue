<i18n>
{
  "en": {
    "itemsOnList": "{ingredientsCount} ingridients",
    "timeToPrepare": "{cookTimeInMinutes} minutes to prepare",
    "cookNow": "Cook now!"
  },
  "de": {
    "itemsOnList": "{ingredientsCount} Zutaten",
    "timeToPrepare": "{cookTimeInMinutes} Minuten Zubereitungszeit",
    "cookNow": "Jetz kochen!"
  }
}
</i18n>

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
          <li>{{ $t('itemsOnList', { ingredientsCount: recipe.ingredientsCount }) }}</li>
          <li>{{ $t('timeToPrepare', { cookTimeInMinutes: recipe.cookTimeInMinutes }) }}</li>
        </ul>
      </div>
    </div>
    <footer class="card-footer">
      <router-link class="card-footer-item" :to="`/recipe/${recipe.title}`" v-t="'cookNow'" />
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
