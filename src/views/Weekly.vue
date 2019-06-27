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
    <week-input />
    <table class="table">

    </table>
  </div>
</template>

<script>
import WeekInput from '@/components/WeekInput.vue';

export default {
  name: 'weekly',
  components: {
    WeekInput,
  },
};
</script>
