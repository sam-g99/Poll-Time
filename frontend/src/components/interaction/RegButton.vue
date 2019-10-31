<template>
  <button type="submit ">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: { type: String, default: '' },
    action: {
      type: Function,
      default() {
        console.log('[Button] Please give me something to do.');
      },
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  background: $blue;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 22px;
  font-weight: 500;
  margin-left: auto;
  margin-right: 10px;
  margin-top: auto;
  outline: none;
  padding: 10px;
  width: 95%;
  margin-top: 25px;

  @include breakpoint(350) {
    font-size: 24px;
  }

  @include breakpoint($desktop) {
    font-size: 25px;
    margin-top: 40px;
    width: 220px;
  }
}
</style>
