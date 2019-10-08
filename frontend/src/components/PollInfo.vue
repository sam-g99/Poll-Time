<template>
  <div class="results">
    <h3>Your poll has been created</h3>
    <p class="id"><b> Poll ID:</b> {{ pollId }}</p>
    <p class="code">
      <b>Creator Code:</b> {{ creatorCode }} (Do not share this, use this to
      manage your poll)
    </p>
    <!-- <input type="text" :value="`http://localhost:8080/poll/${pollId}`" /> -->
  </div>
</template>

<script>
export default {
  props: {
    pollId: { type: String, default: '' },
    creatorCode: { type: String, default: '' },
  },
};
</script>

<style lang="scss" scoped>
.results {
  .id {
    background: lightblue;
  }

  .code {
    background: rgb(26, 26, 26);
    color: white;
  }
}

input {
  opacity: 0;
}
</style>
