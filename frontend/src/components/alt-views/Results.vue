<template>
  <div class="app-container">
    <h1>{{ question }}</h1>
    <div v-for="(result, index) in results" :key="index" class="graph">
      <div class="bar">
        <div
          class="percentage"
          :style="{ width: `${percentages[index]}%` }"
        ></div>
        {{ options[index] }} <b>{{ result }}</b>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      question: '',
      chose: Array,
      socket: io('localhost:3001'),
      results: Array,
    };
  },
  computed: {
    percentages() {
      const add = (a, b) => a + b;
      const sum = this.results.reduce(add);
      return this.results.map(votes => (votes / sum) * 100);
    },
  },
  mounted() {
    this.socket.emit('poll', this.$route.params.id);
    this.socket.on('pollData', poll => {
      this.question = poll.question;
      this.options = poll.options;
      this.results = poll.results;
    });
    this.socket.on('updateResults', results => {
      this.results = results;
    });
  },
  methods: {
    ping() {
      this.socket.emit('poll', this.poll);
    },
    room(e) {
      this.poll = e.target.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  max-width: 600px;
}

.bar {
  border: 1px solid rgb(214, 214, 214);
  border-radius: 5px;
  color: rgb(36, 36, 36);
  margin-top: 10px;
  padding: 10px;
  position: relative;
  width: 100%;

  .percentage {
    background: $blue;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition-duration: 0.1s;
    z-index: -1;
  }
}
</style>
