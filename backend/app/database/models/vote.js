const { STRING, INTEGER } = require('sequelize');

const database = require('..');

const Vote = database.define('Vote', {
  chose: {
    type: INTEGER
  },
  pollId: {
    type: STRING
  }
});

module.exports = Vote;
