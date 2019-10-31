/* 
    This holds all the routes for the polls
*/
const express = require('express');

const router = express.Router();

const shortid = require('shortid');

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const Poll = require('../database/models/poll');
const Vote = require('../database/models/vote');

// CREATE

router.post('/create-poll', async (req, res) => {
  // Setting up inputs and Id
  const { question } = req.body;
  let { options } = req.body;
  if (question === null) {
    res.status(400).send({
      title: 'Question Blank',
      message: "You didn't input a question",
      type: 'bad'
    });
  }
  options = options.filter(o => o.trim() !== '');
  if (!options || options.length < 2) {
    res.status(400).send({
      title: 'Options Blank',
      message: 'Please put in at least 2 options',
      type: 'bad'
    });
  }
  const pollId = shortid.generate();
  const creatorCode = crypto.randomBytes(15).toString('hex');
  // We need to protect those creator codes ;)
  const encryptedCreatorCode = await new Promise((resolve, reject) => {
    bcrypt.hash(creatorCode, 12, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
  // Creating the poll
  Poll.create({
    question,
    options,
    creatorCode: encryptedCreatorCode,
    pollId
  })
    // Success
    .then(() => res.status(201).send({ pollId, creatorCode }))
    // Error
    .catch(() => {
      res.status(500);
    });
});

// VIEW

router.get('/view-poll', async (req, res) => {
  // eslint-disable-next-line dot-notation
  const { pollId } = req.query;
  Poll.findOne({
    where: { pollId }
  }).then(poll => {
    // Successfully found
    if (poll) {
      const { question, options } = poll;
      res.status(200).send({ question, options });
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

function countPollResults(options, votes) {
  const results = [];
  options.forEach(() => {
    results.push(0);
  });
  // Counting the votes
  votes.forEach(vote => {
    results[vote.chose] += 1;
  });
  return results;
}
// VOTE

const voteLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Rate Limit'
});

router.post('/answer-poll', voteLimiter, async (req, res) => {
  console.log('hit');
  const { chose, pollId } = req.body;
  Poll.findOne({
    where: { pollId }
  }).then(poll => {
    if (poll) {
      Vote.create({
        chose,
        pollId
      }).then(() => {
        Vote.findAll({
          where: { pollId }
        }).then(votes => {
          // If everything works then it will send the vote to the socket room to update it for everyone
          if (votes) {
            res.status(201).send({ success: true });
            const results = countPollResults(poll.options, votes);
            req.app.io.to(pollId).emit('updateResults', results);
          } else {
            res.status(500).send('Unknown error');
          }
        });
      });
    } else {
      res
        .status(400)
        .send('Sorry the poll you are trying to answer to does not exist');
    }
  });
});

// DELETE

router.post('/delete-poll', async (req, res) => {
  res.send({ test: 'this is a test response' });
});

module.exports = router;
