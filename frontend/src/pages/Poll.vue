<template>
  <div class="app-container">
    <Results v-if="submitted" />
    <div v-if="!submitted">
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Results from '@/components/alt-views/Results';

export default {
  components: {
    Results,
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
    submitVote() {
      this.axios
        .post(`${this.api}answer-poll`, {
          chose: this.vote,
          pollId: this.$route.params.id,
        })
        .then(r => {
          console.log(r);
          if (r.data.success) {
            this.submitted = true;
            this.$store.state.alert = 'Your vote was submitted successfully';
          } else if (r.data === 'Rate Limit') {
            this.$store.state.alert = 'You need to wait to vote again.';
          } else {
            this.$store.state.alert = 'Sorry error';
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  width: 100%;
}
</style>
