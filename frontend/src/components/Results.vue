<template>
  <div>
    <h1>{{ question }}</h1>
    {{ chose }}
    <div v-for="(option, index) in options" :key="index">{{ option }}</div>
    <p>for poll {{ this.$route.params.id }}</p>
    <p>
      <!-- {{
        test - 1 === 0
          ? 'You are the only person viewing the results'
          : `whaterv other people are viewing the results`
      }} -->
    </p>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      question: '',
      results: Object,
      chose: Array,
      socket: io('localhost:3001'),
    };
  },
  mounted() {
    this.socket.emit('poll', this.$route.params.id);
    this.socket.on('pollData', poll => {
      this.question = poll.question;
      this.options = poll.options;
      this.chose = poll.chose;
    });
    this.socket.on('updateResults', results => {
      this.chose = results;
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

<style lang="scss" scoped></style>
