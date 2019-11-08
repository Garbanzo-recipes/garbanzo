<i18n>
{
  "en": {
    "title": "Weekly",
    "breakfast": "Breakfast",
    "lunch": "Lunch",
    "afternoon": "Afternoon",
    "dinner": "Dinner",
    "addToShoppingList": "Add to shopping list"
  },
  "de": {
    "title": "Wochenplan",
    "breakfast": "Frühstück",
    "lunch": "Mittagessen",
    "afternoon": "Nachmittag",
    "dinner": "Abendessen",
    "addToShoppingList": "Wocheneinkauf"
  }
}
</i18n>

<template>
  <div>
    <h1 class="title">{{ $t('title') }}</h1>
    <div class="field is-grouped">
      <p class="control">
        <week-input v-model="weekYear" />
      </p>
      <p class="control">
        <button class="button is-secondary" @click="addToShoppingList()">
          {{ $t('addToShoppingList') }}
        </button>
      </p>
    </div>
    <br>
    <div class="is-flex is-wrapping has-gap-20px">
      <div class="card has-border-radius-6px" v-for="day in days" :key="days.indexOf(day)">
        <header class="card-header">
          <p class="card-header-title">{{ dateToWeekDay(day.date) }}</p>
          <p class="card-header-title has-text-grey-light">{{ localizedDate(day.date) }}</p>
        </header>
        <div class="card-content">
          <div class="menu">
            <p class="menu-label">{{ $t('breakfast') }}</p>
            <ul class="menu-list">
              <li v-for="item in day.breakfast" :key="day.breakfast.indexOf(item)">
                <router-link :to="`/recipe/${item}`">{{ item }}</router-link>
              </li>
            </ul>
            <p class="menu-label">{{ $t('lunch') }}</p>
            <ul class="menu-list">
              <li v-for="item in day.lunch" :key="day.lunch.indexOf(item)">
                <router-link :to="`/recipe/${item}`">{{ item }}</router-link>
              </li>
            </ul>
            <p class="menu-label">{{ $t('afternoon') }}</p>
            <ul class="menu-list">
              <li v-for="item in day.afternoon" :key="day.afternoon.indexOf(item)">
                <router-link :to="`/recipe/${item}`">{{ item }}</router-link>
              </li>
            </ul>
            <p class="menu-label">{{ $t('dinner') }}</p>
            <ul class="menu-list">
              <li v-for="item in day.dinner" :key="day.dinner.indexOf(item)">
                <router-link :to="`/recipe/${item}`">{{ item }}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <footer class="card-footer">
          <router-link class="card-footer-item" :to="`/day/${dateToIsoDate(day.date)}`">
            <font-awesome-icon icon="edit" />
          </router-link>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns';
import WeekInput from '@/components/WeekInput.vue';

export default {
  name: 'weekly',
  components: {
    WeekInput,
  },
  methods: {
    localizedDate(date) {
      return new Intl
        .DateTimeFormat(window.navigator.language, {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
        })
        .format(date instanceof Date ? date : parseISO(date));
    },
    dateToWeekDay(date) {
      return new Intl
        .DateTimeFormat(window.navigator.language, { weekday: 'long' })
        .formatToParts(new Date(date))
        .find(item => item.type.toLowerCase() === 'weekday').value || date.toString();
    },
    dateToIsoDate(date) {
      return format(date instanceof Date ? date : parseISO(date), 'yyyy-MM-dd');
    },
  },
  computed: {
    days() {
      return this.$store.getters['weekly/weekData'](this.weekYear);
    },
    weekYear: {
      get() {
        return this.$route.params.weekYear || format(new Date(), "yyyy-'W'II");
      },
      set(value) {
        this.$router.push(`/weekly/${value}`);
      },
    },
  },
};
</script>

<style scoped>
.is-wrapping {
  flex-flow: wrap;
}

.has-gap-20px {
  margin: -0.75rem;
}
.has-gap-20px>* {
  margin: 0.75rem;
}

.has-border-radius-6px {
  border-radius: 6px;
}
</style>
