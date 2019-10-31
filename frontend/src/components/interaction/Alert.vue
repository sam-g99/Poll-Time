<template>
  <div
    :class="{
      show: alert !== '',
      alertBad: alert.type === 'bad',
      alertGood: alert.type === 'good',
      alertLimited: alert.type === 'limited',
    }"
    class="alert"
    @click="closeAlert"
  >
    <h3>{{ alert.title }}</h3>
    <p>{{ alert.message }}</p>
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
  background: rgb(124, 124, 124);
  border-radius: 5px;
  color: white;
  cursor: pointer;
  height: 120px;
  padding: 10px;
  position: fixed;
  right: 15px;
  top: 15px;
  transform: translateX(320px);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  width: 300px;
}

.show {
  transform: translateX(0px);
}

.alertGood {
  background: #98ffa2;
  color: #02650c;
}

.alertBad {
  background: #ffb4b4;
  color: #8f0202;
}

.alertLimited {
  background: #d1d1d1;
  color: #000;
}
</style>
