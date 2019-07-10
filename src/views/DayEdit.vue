<template>
  <div class="content">
    <h1 class="title">{{ dateToLocaleString($route.params.date) }}</h1>
    <div class="buttons">
      <button class="button" @click="$router.back()">{{ $t('cancel') }}</button>
      <button class="button is-primary" @click="save()">{{ $t('save') }}</button>
    </div>
    <div class="columns">
      <div class="column">
        <div class="list">
          <div class="list-item has-text-weight-bold">Frühstück</div>
          <div v-for="item in day.breakfast" :key="day.breakfast.indexOf(item)" class="list-item">
            <div class="level is-mobile">
              <div class="level-left">{{ item }}</div>
              <div class="level-right">
                <a class="delete"></a>
              </div>
            </div>
          </div>
          <a class="list-item has-text-centered"><font-awesome-icon icon="plus" /></a>
        </div>
      </div>
      <div class="column">
        <div class="list">
          <div class="list-item has-text-weight-bold">Mittagessen</div>
          <div v-for="item in day.lunch" :key="day.lunch.indexOf(item)" class="list-item">
            <div class="level is-mobile">
              <div class="level-left">{{ item }}</div>
              <div class="level-right">
                <a class="delete"></a>
              </div>
            </div>
          </div>
          <a class="list-item has-text-centered"><font-awesome-icon icon="plus" /></a>
        </div>
      </div>
      <div class="column">
        <div class="list">
          <div class="list-item has-text-weight-bold">Abendessen</div>
          <div v-for="item in day.dinner" :key="day.dinner.indexOf(item)" class="list-item">
            <div class="level is-mobile">
              <div class="level-left">{{ item }}</div>
              <div class="level-right">
                <a class="delete"></a>
              </div>
            </div>
          </div>
          <a class="list-item has-text-centered"><font-awesome-icon icon="plus" /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'day-edit',
  data() {
    return {
      day: {
        breakfast: [],
        lunch: [
          'Low Knead Pizza',
          'Tiramisu',
          'Tomatensuppe',
        ],
        afternoon: [],
        dinner: [],
        date: new Date('2019-07-22'),
      },
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
  },
}
</script>
