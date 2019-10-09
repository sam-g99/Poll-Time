<template>
  <div>
    <h1>{{ test }}</h1>
    <input type="text" placeholder="enter room id" @keyup="room" />
    <button @click="ping">Test Socket</button>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      test: '',
      socket: io('localhost:3001'),
      poll: 'test',
    };
  },
  mounted() {
    this.socket.emit('poll', this.poll);
    this.socket.on('reallyimportantupdate', update => {
      this.test = update;
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
div {
  margin-top: 100px;
}
</style>
