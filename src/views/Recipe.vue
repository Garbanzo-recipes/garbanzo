<template>
  <div class="content">
    <h1 class="title is-spaced">
      {{ title }}
      <router-link :to="`/recipe/edit`"><font-awesome-icon icon="edit" /></router-link>
    </h1>
    <h2 class="subtitle is-4">Zutaten</h2>
    <p>Personen: <input type="number" min="1" max="99" step="1" v-model="peopleCount"></p>
    <ul>
      <li v-for="ingredient in ingredients" :key="ingredients.indexOf(ingredient)">
        {{ ingredient.quantity * peopleCount }}{{ ingredient.unit }} {{ ingredient.name }}
      </li>
    </ul>
    <button class="button is-primary">Auf die Liste!</button>
    <h2 class="subtitle is-4">Zubereitung</h2>
    <p>{{ preparation }}</p>
    <button class="button is-primary">Will ich kochen!</button>
  </div>
</template>

<script>
export default {
  name: 'recipe',
  data() {
    return {
      title: 'low knead pizza',
      ingredients: [
        {
          name: 'Mehl',
          quantity: 300,
          unit: 'g',
        },
      ],
      preparation: 'lorem ipsum dolor sit amit',
      peopleCount: 1,
    };
  },
};
</script>
