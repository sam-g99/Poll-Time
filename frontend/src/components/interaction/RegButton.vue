<template>
  <button @click="action">{{ text }}</button>
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
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  margin-top: 10px;
  outline: none;
  padding: 10px;
  width: 100%;
}
</style>
