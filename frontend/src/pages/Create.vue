<template>
  <div>
    <div v-if="!submitted" class="creation-container">
      <h1>Poll Creation</h1>
      <input
        id="question"
        type="text"
        name="question"
        autocomplete="off"
        placeholder="Enter your question"
        @keyup="registerQuestion"
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
        />
      </div>
      <button @click="addOption">add option</button><br />
      <button class="button-create-poll" @click="createPoll">
        Create Poll
      </button>
    </div>
    <PollInfo v-if="submitted" :pollId="pollId" :creatorCode="creatorCode" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PollInfo from '@/components/PollInfo';

export default {
  components: {
    PollInfo,
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
    updateOption(index, event) {
      this.options[index] = event.target.value;
    },
    createPoll() {
      this.axios
        .post(`${this.api}create-poll`, {
          question: this.question,
          options: this.options,
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
  color: #525151;
  display: block;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  outline: none;
  padding: 10px;
  width: 100%;
}

::placeholder {
  color: #525151;
}

.creation-container {
  margin: 0 auto;
  margin-top: 100px;
  max-width: 600px;

  .button-create-poll {
    background: $green;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;
    margin-top: 10px;
    outline: none;
    padding: 10px;
    width: 100%;
  }
}
</style>
