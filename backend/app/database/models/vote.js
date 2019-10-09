const { STRING } = require('sequelize');

const database = require('..');

const Vote = database.define('Vote', {
  chose: {
    type: STRING
  },
  pollId: {
    type: STRING
  }
});

module.exports = Vote;
