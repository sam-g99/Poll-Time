<template>
  <div :style="{ height: `${windowHeight}px` }" class="container">
    <div :style="{ marginTop: `${browserH}px` }" class="content">
      <h1>Poll Time</h1>
      {{ location }}
      <p>Create a poll and see the results in real time!</p>
      <router-link to="create">Get started</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => {
    return {
      browserH: '0',
      windowHeight: '100vh',
      location: '',
    };
  },
  computed: {
    ...mapState(['mapped']),
  },
  mounted() {
    this.browserH = window.innerHeight - window.outerHeight;
    this.windowHeight = window.innerHeight;
    window.addEventListener('resize', () => {
      this.windowHeight = document.documentElement.clientHeight;
      this.browserH = window.innerHeight - window.outerHeight;
    });
  },
};
</script>

<style lang="scss" scoped>
.container {
  align-items: center;
  display: flex;
  flex-flow: column;
  height: 100vh;
  justify-content: center;
  min-height: 400px;
  padding: 5px;
  width: 100%;
}

.content {
  align-items: center;
  display: flex;
  flex-flow: column;
  text-align: center;

  h1 {
    font-size: 32px;
    margin-bottom: 20px;
  }

  a {
    background: $blue;
    color: white;
    font-size: 26px;
    margin-top: 20px;
    padding: 10px;
    text-decoration: none;
  }
}
</style>
