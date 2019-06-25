<template>
  <div>
    <h1 class="title">Weekly</h1>
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
