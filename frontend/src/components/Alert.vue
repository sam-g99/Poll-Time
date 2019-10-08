<template>
  <div :class="{ show: alert.length > 0 }" class="alert" @click="closeAlert">
    {{ alert }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['alert']),
  },
  methods: {
    closeAlert() {
      this.$store.state.alert = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.alert {
  background: red;
  box-shadow: 0px 3px 3px #ccc;
  color: white;
  cursor: pointer;
  opacity: 0;
  padding: 10px;
  position: absolute;
  right: 0;
  top: 0;
  transition-duration: 0.2s;
  width: 100%;
}

.show {
  opacity: 1;
}
</style>
