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
  <div>
    <input
      type="week"
      @input="$emit('input', $event.target.value)"
      :value="value"
      :min="min"
      :max="max"
      :required="required"
      v-if="canUseWeekInput()"
    />
    <div class="field has-addons" v-if="!canUseWeekInput()">
      <div class="control">
        <div class="select">
          <select @change="handleSelectEvent()" v-model="selectedWeek">
            <option
              v-for="week in weeks"
              :key="weeks.indexOf(week)"
              :value="week"
              :required="required"
            >
              {{ $t('week', { week }) }}
            </option>
          </select>
        </div>
      </div>
      <div class="control">
        <div class="select">
          <select @change="handleSelectEvent()" v-model="selectedYear">
            <option
              v-for="year in years"
              :key="years.indexOf(year)"
              :value="year"
              :required="required"
            >
              {{ year }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getISOWeeksInYear, getISOWeek, getYear } from 'date-fns';

const range = (from, to) => [...Array(to - from + 1).keys()].map((n) => n + from);

export default {
  name: 'week-input',
  props: {
    value: String,
    min: String,
    max: String,
    required: Boolean,
  },
  data() {
    return {
      selectedWeek: getISOWeek(Date.now()),
      selectedYear: getYear(Date.now()),
    };
  },
  methods: {
    handleSelectEvent() {
      this.$emit('input', `${this.selectedYear}-W${this.selectedWeek}`);
    },
    canUseWeekInput() {
      const hasWeekType = () => {
        const testInput = document.createElement('input');
        testInput.type = 'week';
        return testInput.type !== 'text';
      };

      const isIOS = () => window.navigator.userAgent.match(/(iPod|iPhone|iPad)/);

      return hasWeekType() && !isIOS();
    },
  },
  computed: {
    weeks() {
      const weeksInYear = getISOWeeksInYear(new Date(this.selectedYear, 1));
      return this.selectedYear ? range(1, weeksInYear) : [];
    },
    years() {
      return range(1970, 2038);
    },
  },
  mounted() {
    [, this.selectedYear, this.selectedWeek] = /(\d{4})-W(\d{1,2})/.exec(this.value);
  },
};
</script>
