<template>
  <div class="container">
    <h1>Hey create a poll.</h1>
    <router-link to="create">Get started</router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['mapped']),
  },
};
</script>

<style lang="scss" scoped></style>
