const { STRING } = require('sequelize');

const database = require('../');

const Results = database.define('Results', {
  chose: {
    type: String
  },
  pollId: {
    type: STRING
  }
});

module.exports = Results;
