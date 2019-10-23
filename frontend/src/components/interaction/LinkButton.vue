<template>
  <router-link :to="page">{{ text }}</router-link>
</template>

<script>
export default {
  props: {
    page: { type: String, default: '' },
    text: { type: String, default: '' },
  },
};
</script>

<style lang="scss" scoped>
a {
  background: white;
  border-radius: 5px;
  color: #3f93e0;
  display: block;
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 10px;
  margin-top: auto;
  padding: 10px;
  text-decoration: none;
  width: 95%;

  @include breakpoint(400) {
    font-size: 32px;
  }

  @include breakpoint($desktop) {
    font-size: 25px;
    margin-top: 40px;
    width: 220px;
  }
}
</style>
