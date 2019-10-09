<template>
  <div>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      question: '',
      options: [],
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
};
</script>

<style lang="scss" scoped></style>
