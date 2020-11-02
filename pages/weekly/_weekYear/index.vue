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
    <g-title>{{ $t('title') }}</g-title>
    <div class="flex flex-wrap">
      <week-input v-model="weekYear" class="mr-2 mb-2" />
      <g-button class="mb-2" outline @click="addToShoppingList()">
        {{ $t('addToShoppingList') }}
      </g-button>
    </div>
    <div class="flex flex-wrap has-gap-20px">
      <div
        v-for="day in days"
        :key="days.indexOf(day)"
        class="border rounded-lg shadow-md border-gray-200 w-64 flex flex-col"
      >
        <header class="flex flex-wrap justify-between p-2">
          <p class="font-bold">{{ dateToWeekDay(day.date) }}</p>
          <p class="font-bold text-gray-500">
            {{ localizedDate(day.date) }}
          </p>
        </header>
        <div>
          <div class="menu">
            <p class="menu-label">
              {{ $t('breakfast') }}
            </p>
            <ul class="menu-list">
              <li
                v-show="day.breakfast.length === 0"
                class="text-gray-500 text-center"
              >
                No items added
              </li>
              <li
                v-for="item in day.breakfast"
                :key="day.breakfast.indexOf(item)"
              >
                <nuxt-link :to="`/recipes/${item}`">{{ item }}</nuxt-link>
              </li>
            </ul>
            <p class="menu-label">{{ $t('lunch') }}</p>
            <ul class="menu-list">
              <li
                v-show="day.lunch.length === 0"
                class="text-gray-500 text-center"
              >
                No items added
              </li>
              <li v-for="item in day.lunch" :key="day.lunch.indexOf(item)">
                <nuxt-link :to="`/recipes/${item}`">{{ item }}</nuxt-link>
              </li>
            </ul>
            <p class="menu-label">{{ $t('afternoon') }}</p>
            <ul class="menu-list">
              <li
                v-show="day.lunch.length === 0"
                class="text-gray-500 text-center"
              >
                No items added
              </li>
              <li
                v-for="item in day.afternoon"
                :key="day.afternoon.indexOf(item)"
              >
                <nuxt-link :to="`/recipes/${item}`">{{ item }}</nuxt-link>
              </li>
            </ul>
            <p class="menu-label">{{ $t('dinner') }}</p>
            <ul class="menu-list">
              <li
                v-show="day.dinner.length === 0"
                class="text-gray-500 text-center"
              >
                No items added
              </li>
              <li v-for="item in day.dinner" :key="day.dinner.indexOf(item)">
                <nuxt-link :to="`/recipes/${item}`">{{ item }}</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
        <footer class="mt-2">
          <nuxt-link
            class="h-12 w-full text-center align-middle p-3 block hover:bg-gray-300"
            :to="`/weekly/${weekYear}/${dateToIsoDate(day.date)}`"
          >
            <font-awesome-icon icon="edit" />
          </nuxt-link>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns'
import WeekInput from '@/components/WeekInput.vue'
import GTitle from '@/components/GTitle.vue'

export default {
  components: {
    WeekInput,
    GTitle,
  },
  computed: {
    days() {
      return this.$store.getters['weekly/weekData'](this.weekYear)
    },
    weekYear: {
      get() {
        return this.$route.params.weekYear || format(new Date(), "yyyy-'W'II")
      },
      set(value) {
        this.$router.push(`/weekly/${value}`)
      },
    },
  },
  methods: {
    localizedDate(date) {
      return new Intl.DateTimeFormat(window.navigator.language, {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      }).format(date instanceof Date ? date : parseISO(date))
    },
    dateToWeekDay(date) {
      return (
        new Intl.DateTimeFormat(window.navigator.language, { weekday: 'long' })
          .formatToParts(new Date(date))
          .find((item) => item.type.toLowerCase() === 'weekday').value ||
        date.toString()
      )
    },
    dateToIsoDate(date) {
      return format(date instanceof Date ? date : parseISO(date), 'yyyy-MM-dd')
    },
  },
}
</script>

<style scoped>
.is-column {
  flex-flow: column;
}

.is-grow-1 {
  flex-grow: 1;
}

.is-wrapping {
  flex-flow: wrap;
}

.has-gap-20px {
  margin: -0.75rem;
}
.has-gap-20px > * {
  margin: 0.75rem;
}

.menu-label {
  @apply uppercase text-gray-600 text-sm font-light px-2;
}

.menu-list {
  @apply px-4;
}
</style>
