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
          <p class="card-header-title">{{ day.name }}</p>
          <!--<a href="#" class="card-header-icon" aria-label="more options">
            <span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>-->
        </header>
        <div class="card-content">
          <div class="content">
            Frühstück <button class="button is-small"><font-awesome-icon icon="plus" /></button>
            <ul>
              <li v-for="item in day.breakfast" :key="day.breakfast.indexOf(item)">
                {{ item }} <button class="button is-small"><font-awesome-icon icon="minus" /></button>
              </li>
            </ul>
          </div>
          <div class="content">
            Mittagessen <button class="button is-small"><font-awesome-icon icon="plus" /></button>
            <ul>
              <li v-for="item in day.lunch" :key="day.lunch.indexOf(item)">
                {{ item }} <button class="button is-small"><font-awesome-icon icon="minus" /></button>
              </li>
            </ul>
          </div>
          <div class="content">
            Abendessen <button class="button is-small"><font-awesome-icon icon="plus" /></button>
            <ul>
              <li v-for="item in day.dinner" :key="day.dinner.indexOf(item)">
                {{ item }} <button class="button is-small"><font-awesome-icon icon="minus" /></button>
              </li>
            </ul>
          </div>
        </div>
        <!--<footer class="card-footer">
          <a href="#" class="card-footer-item">Save</a>
          <a href="#" class="card-footer-item">Edit</a>
          <a href="#" class="card-footer-item">Delete</a>
        </footer>-->
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
          name: 'Montag',
          breakfast: [],
          lunch: [
            'Low Knead Pizza',
            'Tiramisu',
            'Tomatensuppe',
          ],
          dinner: [],
        },
        {
          name: 'Dienstag',
          breakfast: [],
          lunch: [],
          dinner: [],
        },
        {
          name: 'Mittwoch',
          breakfast: [],
          lunch: [],
          dinner: [],
        },
        {
          name: 'Donnerstag',
          breakfast: [],
          lunch: [],
          dinner: [],
        },
        {
          name: 'Freitag',
          breakfast: [],
          lunch: [],
          dinner: [],
        },
        {
          name: 'Samstag',
          breakfast: [],
          lunch: [],
          dinner: [],
        },
        {
          name: 'Sonntag',
          breakfast: [],
          lunch: [],
          dinner: [],
        },
      ],
    };
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
