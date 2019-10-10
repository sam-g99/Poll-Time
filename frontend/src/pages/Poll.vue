<template>
  <div>
    <Results />
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
</template>

<script>
import { mapState } from 'vuex';
import Results from '@/components/Results';

export default {
  components: {
    Results,
  },
  data() {
    return {
      question: '',
      options: [],
      vote: Number,
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
          if (r.data.success) {
            this.$store.state.alert = 'Your vote was submitted successfully';
          } else {
            this.$store.state.alert = 'Sorry error';
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
