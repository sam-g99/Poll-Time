<template>
  <div class="main-container">
    <Logo />
    <p>Create polls and see them update in real time!</p>
    <div class="app-container">
      <div v-if="!submitted" class="creation-container">
        <form @submit.prevent="createPoll">
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
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PollInfo from '@/components/alt-views/PollInfo';
import RegButton from '@/components/interaction/RegButton';
import Logo from '@/components/Logo';

export default {
  components: {
    PollInfo,
    RegButton,
    Logo,
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
    userAlert(alert) {
      this.$store.state.alert = alert;
      setTimeout(() => {
        this.$store.state.alert = '';
      }, 2000);
    },
    registerQuestion(e) {
      this.question = e.target.value;
    },
    addOption() {
      // Limit to 6
      if (this.options.length <= 5) {
        this.options.push('');
      } else {
        this.userAlert({
          title: 'Options Limit',
          message: 'You can only have 6 options.',
          type: 'bad',
        });
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
      if (this.question.trim() === '') {
        // eslint-disable-next-line quotes
        this.userAlert({
          title: 'Question Blank',
          message: 'You didn\'t enter a question',
          type: 'bad',
        });
        return;
      }
      const nonBlankOptions = this.options.filter(o => o.trim() !== '');
      console.log(nonBlankOptions);
      if (nonBlankOptions.length < 2) {
        this.userAlert({
          title: 'Need Options',
          message: 'You need at least two options.',
          type: 'bad',
        });
        return;
      }
      this.axios
        .post(`${this.api}create-poll`, {
          question: this.question,
          // eslint-disable-next-line eqeqeq
          options: nonBlankOptions,
        })
        .then(r => {
          this.pollId = r.data.pollId;
          this.creatorCode = r.data.creatorCode;
          this.submitted = true;
          this.$router.push(`/poll/${this.pollId}`);
        })
        .catch(() => {
          this.userAlert({
            title: 'Uh Oh!',
            message: 'Something bad happened try again later',
            type: 'bad',
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.main-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-flow: column;
}

.app-container {
  background: white;
  @include breakpoint($desktop) {
    height: auto;
  }
}

.options {
  margin-top: 15px;

  input {
    margin: 0 auto;
    margin-top: 10px;
    width: 95%;
  }
}

form {
  display: flex;
  flex-flow: column;
  height: 100%;
  padding-bottom: 20px;
  width: 100%;
}

input {
  background: #e4e4e4;
  border: none;
  border-radius: 0px;
  color: #3f3f3f;
  display: block;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  outline: none;
  padding: 10px;
  width: 100%;

  @include breakpoint(350) {
    font-size: 18px;
    padding: 15px;
  }

  @include breakpoint(370) {
    font-size: 20px;
  }
}

.question-input {
  background: #fbfbfb;
  border: 1px solid #c6c6c6;
  border-radius: 0px;
  font-size: 20px;
  font-weight: 400;
  margin-top: 0;

  @include breakpoint(350) {
    font-size: 22px;
    padding: 15px;
  }

  @include breakpoint(370) {
    font-size: 28px;
    padding: 20px;
  }
}

::placeholder {
  color: #424242;
}

.creation-container {
  display: flex;
  flex-flow: column;
  height: 100%;
  margin: 0 auto;
  width: 100%;
}

p {
  color: white;
  font-size: 18px;
  font-weight: 300;
  line-height: 30px;
  margin-bottom: 20px;

  @include breakpoint(370) {
    font-size: 25px;
    line-height: 40px;
  }

  @include breakpoint(500) {
    font-size: 25px;
  }
}
</style>
