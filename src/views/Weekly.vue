<i18n>
{
  "en": {
    "title": "Weekly"
  },
  "de": {
    "title": "Wochenplan"
  }
}
</i18n>

<template>
  <div>
    <h1 class="title">{{ $t('title') }}</h1>
    <week-input v-model="weekYear" />
    <br>
    <div class="is-flex is-wrapping has-gap-20px">
      <div class="card has-border-radius-6px" v-for="day in days" :key="days.indexOf(day)">
        <header class="card-header">
          <p class="card-header-title">{{ dateToWeekDay(day.date) }}</p>
          <!--<a href="#" class="card-header-icon" aria-label="more options">
            <span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>-->
        </header>
        <div class="card-content">
          <div class="menu">
            <p class="menu-label">Frühstück</p>
            <ul class="menu-list">
              <li v-for="item in day.breakfast" :key="day.breakfast.indexOf(item)">
                <router-link :to="`/recipe/${item}`">{{ item }}</router-link>
              </li>
            </ul>
            <p class="menu-label">Mittagessen</p>
            <ul class="menu-list">
              <li v-for="item in day.lunch" :key="day.lunch.indexOf(item)">
                <router-link :to="`/recipe/${item}`">{{ item }}</router-link>
              </li>
            </ul>
            <p class="menu-label">Abendessen</p>
            <ul class="menu-list">
              <li v-for="item in day.dinner" :key="day.dinner.indexOf(item)">
                <router-link :to="`/recipe/${item}`">{{ item }}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <footer class="card-footer">
          <!--<a href="#" class="card-footer-item">Save</a>
          <a class="card-footer-item"><font-awesome-icon icon="edit" /></a>
          <a href="#" class="card-footer-item">Delete</a>-->
          <router-link class="card-footer-item" :to="`/day/${day.date.toISOString().split('T')[0]}`">
            <font-awesome-icon icon="edit" />
          </router-link>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import WeekInput from '@/components/WeekInput.vue';

export default {
  name: 'weekly',
  components: {
    WeekInput,
  },
  data() {
    return {
      weekYear: '2019-W30',
      days: [
        {
          breakfast: [],
          lunch: [
            'Low Knead Pizza',
            'Tiramisu',
            'Tomatensuppe',
          ],
          dinner: [],
          date: new Date('2019-07-22'),
        },
        {
          breakfast: [],
          lunch: [],
          dinner: [],
          date: new Date('2019-07-23'),
        },
        {
          breakfast: [],
          lunch: [],
          dinner: [],
          date: new Date('2019-07-24'),
        },
        {
          breakfast: [],
          lunch: [],
          dinner: [],
          date: new Date('2019-07-25'),
        },
        {
          breakfast: [],
          lunch: [],
          dinner: [],
          date: new Date('2019-07-26'),
        },
        {
          breakfast: [],
          lunch: [],
          dinner: [],
          date: new Date('2019-07-27'),
        },
        {
          breakfast: [],
          lunch: [],
          dinner: [],
          date: new Date('2019-07-28'),
        },
      ],
    };
  },
  methods: {
    dateToWeekDay(date) {
      return new Intl.DateTimeFormat(window.navigator.language, {
        weekday: 'long',
      }).formatToParts(date).find(item => item.type.toLowerCase() === 'weekday').value || date.toString();
    },
  },
};
</script>

<style scoped>
.is-wrapping {
  flex-flow: wrap;
}

.has-gap-20px {
  gap: 20px;
}

.has-border-radius-6px {
  border-radius: 6px;
}
</style>
