<template>
  <div class="app-container">
    <Logo />
    <p>Create polls and see them update in real time!</p>
    <LinkButton page="create" text="Get Started" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Logo from '@/components/Logo';
import LinkButton from '@/components/interaction/LinkButton';

export default {
  components: { Logo, LinkButton },
  data: () => {
    return {};
  },
  computed: {
    ...mapState(['mapped']),
  },
};
</script>

<style lang="scss">
.content {
  height: 100%;

  @include breakpoint($desktop) {
    height: auto;
  }
}
</style>

<style lang="scss" scoped>
.app-container {
  align-items: center;
  display: flex;
  height: 100%;
  text-align: center;
}

p {
  color: white;
  font-size: 18px;
  font-weight: 300;
  line-height: 30px;

  @include breakpoint(370) {
    font-size: 25px;
    line-height: 40px;
  }

  @include breakpoint(500) {
    font-size: 25px;
  }
}

div {
  display: flex;
  flex-flow: column;
}
</style>
