const { STRING } = require('sequelize');

const database = require('..');

const Result = database.define('Results', {
  chose: {
    type: STRING
  },
  pollId: {
    type: STRING
  }
});

module.exports = Result;
