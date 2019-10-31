<template>
  <div class="app-container">
    <Results v-if="this.$route.name === 'results'" />
    <div v-if="this.$route.name === 'poll'">
      <h1>{{ question }}</h1>
      <div class="options">
        <div
          v-for="(option, index) in options"
          :key="index"
          class="radio-button-container"
        >
          <input
            :id="index"
            v-model="vote"
            type="radio"
            name="vote"
            :value="index"
          />
          <label :for="index">{{ option }}</label>
        </div>
        <br />
      </div>
      <button @click="submitVote">Submit Vote</button>
    </div>
    <PollInfo :pollId="this.$route.params.id" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Results from '@/components/alt-views/Results';
import PollInfo from '@/components/alt-views/PollInfo';

export default {
  components: {
    Results,
    PollInfo,
  },
  data() {
    return {
      question: '',
      options: [],
      vote: Number,
      submitted: false,
    };
  },
  computed: {
    ...mapState(['api']),
  },

  watch: {
    $route(to, from) {},
  },

  created() {
    this.axios
      .get(`${this.api}view-poll`, {
        params: {
          pollId: this.$route.params.id,
        },
      })
      .then(r => {
        const { question, options } = r.data;
        this.question = question;
        this.options = options;
      });
  },
  methods: {
    userAlert(alert) {
      this.$store.state.alert = alert;
      setTimeout(() => {
        this.$store.state.alert = '';
      }, 2000);
    },
    submitVote() {
      this.axios
        .post(`${this.api}answer-poll`, {
          chose: this.vote,
          pollId: this.$route.params.id,
        })
        .then(r => {
          console.log(r);
          if (r.data.success) {
            this.$router.push(`/results/${this.$route.params.id}`);
            this.userAlert({
              title: 'Success',
              message: 'Your vote was added succesfully',
              type: 'good',
            });
          } else if (r.data === 'Rate Limit') {
            this.userAlert({
              title: 'Rate Limit',
              message: 'You need to wait to vote again.',
              type: 'limited',
            });
          } else {
            this.userAlert({
              title: 'Sorry unknown error',
              message: 'Something went wrong try again later.',
              type: 'bad',
            });
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  background: white;
  border-radius: 5px;
  height: 90%;
  padding: 10px;
}

div {
  width: 100%;
}

h1 {
  margin-bottom: 10px;
}

input[type='radio'] {
  display: none;
}
label {
  display: block;
  background: #383838;
  width: 100%;
  color: #ffffff;
  font-weight: 500;
  font-family: Arial, sans-serif;
  font-size: 14px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 0px;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
    transition-duration: 0.1s;
  }
}

input[type='radio']:checked + label {
  background: $blue;
}

button {
  background: $blue;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 22px;
  font-weight: 500;
  margin-top: auto;
  margin-left: auto;
  outline: none;
  padding: 10px;
  width: 100%;

  @include breakpoint(350) {
    font-size: 24px;
  }

  @include breakpoint($desktop) {
    font-size: 25px;
    margin-top: 40px;
    width: 220px;
  }
}
</style>
