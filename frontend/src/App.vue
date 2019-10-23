<template>
  <div id="App">
    <Alert />
    <div :style="{ height: `${windowHeight}px` }" class="container">
      <div :style="{ marginTop: `${browserH}px` }" class="content">
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
      console.log(window.innerWidth);
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
  width: 100%;
}
</style>
