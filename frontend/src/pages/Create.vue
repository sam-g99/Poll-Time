<template>
  <div class="app-container">
    <div v-if="!submitted" class="creation-container">
      <h1>Poll Creation</h1>
      <input
        id="question"
        class="question-input"
        type="text"
        name="question"
        autocomplete="off"
        placeholder="Enter your question"
        @blur="registerQuestion"
      />
      <div class="options">
        <input
          v-for="(option, index) in options"
          id="option1"
          :key="index"
          type="text"
          name="question"
          autocomplete="off"
          placeholder="Enter your option"
          @keyup="updateOption(index, $event)"
          @click="checkOption(index)"
        />
      </div>
      <RegButton text="Create Poll" :action="createPoll" />
    </div>
    <PollInfo v-if="submitted" :pollId="pollId" :creatorCode="creatorCode" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PollInfo from '@/components/alt-views/PollInfo';
import RegButton from '@/components/interaction/RegButton';

export default {
  components: {
    PollInfo,
    RegButton,
  },
  data: () => {
    return {
      question: '',
      options: ['', ''],
      submitted: false,
      creatorCode: '',
      pollId: '',
    };
  },
  computed: {
    ...mapState(['api']),
  },

  methods: {
    alertUser(message) {
      this.$store.state.alert = message;
    },
    registerQuestion(e) {
      this.question = e.target.value;
    },
    addOption() {
      // Limit to 6
      if (this.options.length <= 5) {
        this.options.push('');
      } else {
        this.alertUser('You can only have 6 options.');
      }
    },
    checkOption(index) {
      if (index + 1 === this.options.length) {
        this.addOption();
      }
    },
    updateOption(index, event) {
      this.options[index] = event.target.value;
    },
    createPoll() {
      this.axios
        .post(`${this.api}create-poll`, {
          question: this.question,
          // eslint-disable-next-line eqeqeq
          options: this.options.filter(o => o != ''),
        })
        .then(r => {
          this.pollId = r.data.pollId;
          this.creatorCode = r.data.creatorCode;
          this.submitted = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.options {
  margin-top: 30px;
}

input {
  background: #f1f1f1;
  border: none;
  border-radius: 5px;
  color: #525151;
  display: block;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  outline: none;
  padding: 10px;
  width: 100%;
}

.question-input {
  background: #fbfbfb;
  border: 1px solid #c6c6c6;
  font-size: 20px;
  font-weight: 400;
}

::placeholder {
  color: #525151;
}

.creation-container {
  flex-flow: column;
  margin: 0 auto;
  margin-top: 100px;
  max-width: 600px;
  widows: 100%;
}
</style>
