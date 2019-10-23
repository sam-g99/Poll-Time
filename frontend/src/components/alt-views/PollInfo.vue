<template>
  <div class="info">
    <h3>Your poll has been created</h3>
    <div class="id">
      <div class="tag">
        <p class="poll-link-tag">Poll Link</p>
      </div>

      <input
        ref="pollLink"
        type="text"
        :value="`${baseUrl}/poll/${pollId}`"
        class="copy-input"
        readonly
      />
      <button class="copy-button" @click="copyLink">Copy Link</button>
    </div>
    <p class="code">
      <b>Creator Code:</b> {{ creatorCode }} (Do not share this, use this to
      manage your poll)
    </p>
    <router-link :to="`/poll/${pollId}`">
      Go To Your Poll
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    pollId: { type: String, default: '' },
    creatorCode: { type: String, default: '' },
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
    copyLink() {
      const link = this.$refs.pollLink;
      link.select();
      link.setSelectionRange(0, 99999);
      document.execCommand('copy');
      this.$store.state.alert = 'Your link has been copied';
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
  background: #f1f1f1;
  border-radius: 5px;
  height: 200px;
  margin: 0 auto;
  max-width: 600px;
  padding: 10px;
  position: relative;

  .id {
    background: lightblue;
    border-radius: 100px;
    padding: 10px;
    position: relative;

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

  .copy-input {
    background: none;
    border: none;
    color: #116cc0;
    font-size: 16px;
    font-weight: 600;
    outline: none;
    width: 300px;
  }

  .copy-button {
    background: green;
    border: none;
    border-radius: 100px;
    color: white;
    cursor: pointer;
    font-weight: 500;
    padding: 10px;
  }
}
</style>
