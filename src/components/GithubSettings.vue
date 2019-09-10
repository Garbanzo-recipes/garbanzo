<template>
  <div class="box">
    <h4 class="title is-5"><font-awesome-icon :icon="['fab', 'github']" /> Github</h4>
    <form @submit="save">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Username</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="e.g. jdoe" v-model="username">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Password</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input" type="password" v-model="password">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Repository</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="e.g. recipes" v-model="repository">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label">
          <!-- Left empty for spacing -->
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <div class="control">
              <button class="button">Cancel</button>
            </div>
            <div class="control">
              <button class="button is-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'github-settings',
  data() {
    return {
      username: '',
      password: '',
      repository: '',
    };
  },
  methods: {
    save() {
      console.log('saving github creds and repo');
    },
  },
};
</script>
