<template>
  <div class="info">
    <h3>Share this poll</h3>
    <div class="id">
      <input
        ref="pollLink"
        type="text"
        :value="`${baseUrl}/poll/${pollId}`"
        class="copy-input"
        readonly
      />
      <button class="copy-button" @click="copyLink">Copy Link</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pollId: { type: String, default: '' },
  },
  data: () => {
    return {
      baseUrl: '',
    };
  },
  mounted() {
    this.baseUrl = window.location.origin;
  },
  methods: {
    userAlert(alert) {
      this.$store.state.alert = alert;
      setTimeout(() => {
        this.$store.state.alert = '';
      }, 2000);
    },
    copyLink() {
      const link = this.$refs.pollLink;
      link.select();
      link.setSelectionRange(0, 99999);
      document.execCommand('copy');
      this.userAlert({
        title: 'Link Copied',
        message: "You're ready to share it out into the wild!",
        type: 'good',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
  background: #f1f1f1;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 20px;
  max-width: 600px;
  padding: 10px;
  position: relative;

  .id {
    background: lightblue;
    display: flex;
    padding: 5px;
    position: relative;

    @include breakpoint-max(500) {
      align-items: center;
      flex-flow: column;
      justify-content: center;
      text-align: center;
    }

    .tag {
      align-items: center;
      background: white;
      border-radius: 10px 0px 0px 10px;
      display: flex;
      font-weight: 600;
      height: 100%;
      justify-content: center;
      justify-items: center;
      left: 0;
      padding: 10px;
      position: absolute;
      top: 0;

      .poll-link-tag {
      }
    }
  }

  .code {
    background: rgb(26, 26, 26);
    border-radius: 0px 0px 5px 5px;
    bottom: 0;
    color: white;
    left: 0;
    padding: 7px;
    position: absolute;
    width: 100%;
  }

  h3 {
    margin-bottom: 5px;
  }

  .copy-input {
    background: none;
    border: none;
    color: #116cc0;
    font-size: 16px;
    font-weight: 600;
    outline: none;
    width: 100%;
    @include breakpoint-max(500) {
      margin-bottom: 10px;
    }
  }

  .copy-button {
    background: green;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-weight: 500;
    padding: 10px;
    margin-left: auto;
    min-width: 120px;
    font-size: 17px;

    @include breakpoint-max(500) {
      margin-left: 0;
      width: 80%;
    }
  }
}
</style>
