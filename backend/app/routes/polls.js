/* 
    This holds all the routes for the polls
*/
const express = require('express');

const router = express.Router();

const shortid = require('shortid');

const crypto = require('crypto');
const Poll = require('../database/models/poll');
const Result = require('../database/models/result');

// CREATE

router.post('/create-poll', async (req, res) => {
  // Setting up inputs and Id
  const { question } = req.body;
  const options = ['option 1', 'option 2'];
  const pollId = shortid.generate();
  const creatorCode = crypto.randomBytes(15).toString('hex');
  // Creating the poll
  Poll.create({
    question,
    options,
    creatorCode,
    pollId
  })
    // Success
    .then(() =>
      res
        .status(201)
        .send(
          `You have created a poll. Your poll id is ${pollId} share it, your creator code is ${creatorCode} hide it. `
        )
    )
    // Error
    .catch(error => {
      res.status(400);
      console.log(error);
    });
});

// VIEW

router.get('/view-poll', async (req, res) => {
  const { pollId } = req.body;
  Poll.findOne({
    where: { pollId }
  }).then(poll => {
    // Successfully found
    if (poll) {
      const options = poll.options.join(' or ');
      res
        .status(201)
        .send(
          `Poll question is ${poll.question} and the options are (${options})`
        );
    }
    // Poll was not found
    else {
      res
        .status(404)
        .send(
          "The poll you're looking for either never existed or was deleted by the creator"
        );
    }
  });
});

// ANSWER

router.post('/answer-poll', async (req, res) => {
  const { chose, pollId } = req.body;
  Poll.findOne({
    where: { pollId }
  }).then(poll => {
    if (poll) {
      Result.create({
        chose, // change to answer
        pollId
      }).then(() => {
        res.status(201).send(`Your answer (${chose}) has been added!`);
      });
    } else {
      res
        .status(400)
        .send('Sorry the poll you are trying to answer to does not exist');
    }
  });
});
// RESULTS
router.get('/poll-results', async (req, res) => {
  const { pollId } = req.body;
  Result.findAll({
    where: { pollId }
  }).then(results => {
    const answers = results.map(r => r.chose);
    console.log(answers.join(' '));
  });
  res.status(201).send('results');
});

// DELETE

router.post('/delete-poll', async (req, res) => {
  res.send({ test: 'this is a test response' });
});

module.exports = router;
