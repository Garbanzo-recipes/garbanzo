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
    <g-title>
      {{ dateToLocaleString($route.params.date) }}
    </g-title>
    <div class="flex mb-2">
      <g-button class="mr-2" outline @click="$router.back()">
        {{ $t('cancel') }}
      </g-button>
      <g-button variant="primary" @click="save()">
        {{ $t('save') }}
      </g-button>
    </div>
    <div class="flex flex-wrap">
      <div
        v-for="list in lists"
        :key="lists.indexOf(list)"
        class="
          flex flex-col
          rounded-lg
          shadow-md
          border border-gray-200
          w-64
          m-3
        "
      >
        <div class="list">
          <div class="font-bold p-2">{{ $t(list) }}</div>
          <div
            v-show="!(day && list && day[list] && day[list].length > 0)"
            class="text-gray-500 text-center"
          >
            No items added
          </div>
          <ul class="px-2">
            <li
              v-for="(item, index) in day[list]"
              :key="index"
              class="flex justify-between"
            >
              {{ item }}
              <a class="cursor-pointer" @click="removeItem(list, item)">
                <font-awesome-icon icon="minus" />
              </a>
            </li>
          </ul>
          <a
            class="
              h-12
              w-full
              text-center
              align-middle
              p-3
              block
              hover:bg-gray-300
              cursor-pointer
            "
            @click="toggleAddModal(list)"
          >
            <font-awesome-icon icon="plus" />
          </a>
        </div>
      </div>
    </div>

    <base-modal
      v-if="showModal"
      :title="$t('addMeal')"
      @close="toggleAddModal()"
    >
      <div class="flex flex-wrap">
        <select
          v-model="selectedMeal"
          class="
            block
            appearance-none
            bg-gray-200
            border border-gray-200
            text-gray-700
            py-3
            px-4
            pr-8
            rounded
            leading-tight
            focus:outline-none focus:bg-white focus:border-gray-500
          "
        >
          <option
            v-for="meal in meals"
            :key="meals.indexOf(meal)"
            :value="meal.title"
          >
            {{ meal.title }}
          </option>
        </select>
        <div class="flex">
          <g-number-input
            v-model="peopleCount"
            class="w-24"
            min="1"
            max="99"
            step="1"
          />
          <span class="icon is-small is-left">
            <font-awesome-icon icon="user-friends" />
          </span>
        </div>
      </div>
      <template v-slot:footer>
        <g-button variant="success" class="ml-2" @click="addMeal()">
          {{ $t('save') }}
        </g-button>
        <g-button outline @click="toggleAddModal()">
          {{ $t('cancel') }}
        </g-button>
      </template>
    </base-modal>
  </div>
</template>

<script>
import { format } from 'date-fns'
import BaseModal from '@/components/BaseModal.vue'
import GNumberInput from '@/components/GNumberInput.vue'
import GTitle from '@/components/GTitle.vue'

export default {
  components: {
    BaseModal,
    GNumberInput,
    GTitle,
  },
  data() {
    return {
      day: {},
      lists: ['breakfast', 'lunch', 'afternoon', 'dinner'],
      selectedMeal: '',
      showModal: false,
      selectedTimeSlot: '',
      peopleCount: 1,
    }
  },
  computed: {
    meals() {
      if (this.day[this.selectedTimeSlot]) {
        return this.$store.getters['recipes/list']().filter(
          (meal) => !this.day[this.selectedTimeSlot].includes(meal)
        )
      }

      return this.$store.getters['recipes/list']()
    },
  },
  mounted() {
    this.day = this.$store.getters['weekly/dayData'](this.$route.params.date)
  },
  methods: {
    dateToLocaleString(date) {
      return Intl.DateTimeFormat(window.navigator.language, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(date))
    },
    removeItem(list, item) {
      this.day[list] = this.day[list].filter((n) => n !== item)
    },
    save() {
      this.$store.commit('weekly/updateDay', {
        date: this.$route.params.date,
        data: this.day, // TODO: rename attribute!
      })

      this.$router.push(
        `/weekly/${format(new Date(this.day.date), "yyyy-'W'II")}`
      )
    },
    toggleAddModal(timeSlot) {
      this.selectedTimeSlot = timeSlot
      this.showModal = !this.showModal
    },
    addMeal() {
      this.day[this.selectedTimeSlot].push(this.selectedMeal)
      this.toggleAddModal()
    },
  },
}
</script>
