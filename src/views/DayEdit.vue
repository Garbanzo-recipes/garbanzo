<i18n>
{
  "en": {
    "title": "Weekly",
    "breakfast": "Breakfast",
    "lunch": "Lunch",
    "afternoon": "Afternoon",
    "dinner": "Dinner",
    "cancel": "Cancel",
    "save": "Save"
  },
  "de": {
    "title": "Wochenplan",
    "breakfast": "Frühstück",
    "lunch": "Mittagessen",
    "afternoon": "Nachmittag",
    "dinner": "Abendessen",
    "cancel": "Abbrechen",
    "save": "Speichern"
  }
}
</i18n>

<template>
  <div class="content">
    <h1 class="title">{{ dateToLocaleString($route.params.date) }}</h1>
    <div class="buttons">
      <button class="button" @click="$router.back()">{{ $t('cancel') }}</button>
      <button class="button is-primary" @click="save()">{{ $t('save') }}</button>
    </div>
    <div class="columns">
      <div class="column" v-for="list in lists" :key="lists.indexOf(list)">
        <div class="list">
          <div class="list-item has-text-weight-bold">{{ $t(list) }}</div>
          <div v-for="item in day[list]" :key="day[list].indexOf(item)" class="list-item">
            <div class="level is-mobile">
              <div class="level-left">{{ item }}</div>
              <div class="level-right">
                <a class="delete" @click="removeItem(list, item)"></a>
              </div>
            </div>
          </div>
          <a class="list-item has-text-centered" @click="showModal = true">
            <font-awesome-icon icon="plus" />
          </a>
        </div>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ $t('addMeal') }}</p>
          <button class="delete" aria-label="close" @click="showModal = false"></button>
        </header>
        <section class="modal-card-body">
          <div class="select">
            <select v-model="selectedMeal">
              <option v-for="meal in meals" :key="meals.indexOf(meal)" :value="meal.title">
                {{ meal.title }}
              </option>
            </select>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="showModal = false">{{ $t('save') }}</button>
          <button class="button" @click="showModal = false">{{ $t('cancel') }}</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'day-edit',
  data() {
    return {
      day: {},
      lists: ['breakfast', 'lunch', 'afternoon', 'dinner'],
      selectedMeal: '',
      showModal: false,
    };
  },
  methods: {
    dateToLocaleString(date) {
      return Intl.DateTimeFormat(window.navigator.language, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(date));
    },
    removeItem(list, item) {
      this.day[list] = this.day[list].filter(n => n !== item);
      //this.$forceUpdate();
    },
  },
  computed: {
    meals() {
      return this.$store.getters.recipeList();
    }
  },
  mounted() {
    this.day = this.$store.getters.dayData(this.$route.params.date);
  },
};
</script>
