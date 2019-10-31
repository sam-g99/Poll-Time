<template>
  <div id="App">
    <Alert />
    <div class="container">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '@/components/interaction/Alert';

export default {
  name: 'App',
  components: { Alert },
  data: () => {
    return {
      browserH: '0',
      windowHeight: '100vh',
    };
  },
  mounted() {
    const desktop = 800;
    const browser = () => {
      if (window.innerWidth >= desktop) {
        this.browserH = window.innerHeight - window.outerHeight;
      } else {
        this.browserH = 0;
      }
    };
    browser(this.browserH);
    this.windowHeight = window.innerHeight;
    window.addEventListener('resize', () => {
      this.windowHeight = document.documentElement.clientHeight;
      browser();
    });
  },
};
</script>

<style lang="scss">
#App {
  background: linear-gradient(123.69deg, #6db6fa 70%, #7cbdfa 100%);
}
.container {
  padding: 10px;
  padding-bottom: 50px;
}
.content {
  align-items: center;
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
}
</style>
