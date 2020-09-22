<i18n>
{
  "en": {
    "week": "Week {week}"
  },
  "de": {
    "week": "Woche {week}"
  }
}
</i18n>

<template>
  <div class="flex">
    <div class="relative border-r border-gray-400">
      <select
        v-model="selectedWeek"
        class="block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-l leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        @change="handleSelectEvent()"
      >
        <option
          v-for="week in weeks"
          :key="weeks.indexOf(week)"
          :value="week"
          :required="required"
        >
          {{ $t('week', { week }) }}
        </option>
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      >
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>
    <div class="relative">
      <select
        v-model="selectedYear"
        class="block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-r leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        @change="handleSelectEvent()"
      >
        <option
          v-for="year in years"
          :key="years.indexOf(year)"
          :value="year"
          :required="required"
        >
          {{ year }}
        </option>
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      >
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { getISOWeeksInYear, getISOWeek, getYear } from 'date-fns'

const range = (from, to) =>
  [...Array(to - from + 1).keys()].map((n) => n + from)

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    min: {
      type: String,
      default: '',
    },
    max: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedWeek: getISOWeek(Date.now()),
      selectedYear: getYear(Date.now()),
    }
  },
  computed: {
    weeks() {
      const weeksInYear = getISOWeeksInYear(new Date(this.selectedYear, 1))
      return this.selectedYear ? range(1, weeksInYear) : []
    },
    years() {
      return range(1970, 2038)
    },
  },
  mounted() {
    ;[, this.selectedYear, this.selectedWeek] = /(\d{4})-W(\d{1,2})/.exec(
      this.value
    )
  },
  methods: {
    handleSelectEvent() {
      this.$emit('input', `${this.selectedYear}-W${this.selectedWeek}`)
    },
  },
}
</script>
