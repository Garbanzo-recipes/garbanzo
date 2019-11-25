<i18n>
{
  "en": {
    "title": "Weekly",
    "breakfast": "Breakfast",
    "lunch": "Lunch",
    "afternoon": "Afternoon",
    "dinner": "Dinner",
    "cancel": "Cancel",
    "save": "Save",
    "addMeal": "Add meal"
  },
  "de": {
    "title": "Wochenplan",
    "breakfast": "Frühstück",
    "lunch": "Mittagessen",
    "afternoon": "Nachmittag",
    "dinner": "Abendessen",
    "cancel": "Abbrechen",
    "save": "Speichern",
    "addMeal": "Essen hinzufügen"
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
          <a class="list-item has-text-centered" @click="toggleAddModal(list)">
            <font-awesome-icon icon="plus" />
          </a>
        </div>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <span class="modal-card-title">{{ $t('addMeal') }}</span>
          <button class="delete" aria-label="close" @click="toggleAddModal()"></button>
        </header>
        <section class="modal-card-body">
          <div class="field is-grouped">
            <p class="control select">
              <select v-model="selectedMeal">
                <option v-for="meal in meals" :key="meals.indexOf(meal)" :value="meal.title">
                  {{ meal.title }}
                </option>
              </select>
            </p>
            <p class="control has-icons-left">
              <input
                class="input"
                type="number"
                min="1"
                max="99"
                step="1"
                v-model="peopleCount"
              >
              <span class="icon is-small is-left">
                <font-awesome-icon icon="user-friends" />
              </span>
            </p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="addMeal()">{{ $t('save') }}</button>
          <button class="button" @click="toggleAddModal()">{{ $t('cancel') }}</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  name: 'day-edit',
  data() {
    return {
      day: {},
      lists: ['breakfast', 'lunch', 'afternoon', 'dinner'],
      selectedMeal: '',
      showModal: false,
      selectedTimeSlot: '',
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
      this.day[list] = this.day[list].filter((n) => n !== item);
    },
    save() {
      this.$store.commit('weekly/updateDay', {
        date: this.$route.params.date,
        data: this.day, // TODO: rename attribute!
      });
      this.$router.push(`/weekly/${format(new Date(this.day.date), "yyyy-'W'II")}`);
    },
    toggleAddModal(timeSlot) {
      this.selectedTimeSlot = timeSlot;
      this.showModal = !this.showModal;
    },
    addMeal() {
      this.day[this.selectedTimeSlot].push(this.selectedMeal);
      this.toggleAddModal();
    },
  },
  computed: {
    meals() {
      if (this.day[this.selectedTimeSlot]) {
        return this.$store.getters['recipes/list']()
          .filter((meal) => !this.day[this.selectedTimeSlot].includes(meal));
      }

      return this.$store.getters['recipes/list']();
    },
  },
  mounted() {
    this.day = this.$store.getters['weekly/dayData'](this.$route.params.date);
  },
};
</script>
