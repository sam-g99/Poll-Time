const { STRING, ARRAY } = require('sequelize');

const shortid = require('shortid');

const database = require('../');

const Poll = database.define('Poll', {
  question: {
    type: STRING
  },
  options: {
    type: ARRAY(STRING)
  },
  pollId: {
    type: STRING,
    default: shortid.generate(),
    primaryKey: true
  },
  // Used so the creator of the poll can manage the poll
  creatorCode: {
    type: STRING,
    required: true
  }
});

module.exports = Poll;
