/* 
    This holds all the routes for the polls
*/
const express = require('express');

const router = express.Router();

const shortid = require('shortid');

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Poll = require('../database/models/poll');
const Vote = require('../database/models/vote');

// CREATE

router.post('/create-poll', async (req, res) => {
  // Setting up inputs and Id
  const { question, options } = req.body;
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
    .catch(error => {
      res.status(400);
      console.log(error);
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
      res.status(201).send({ question, options });
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
  console.log('hit');
  const { chose, pollId } = req.body;
  Poll.findOne({
    where: { pollId }
  }).then(poll => {
    if (poll) {
      Vote.create({
        chose,
        pollId
      }).then(data => {
        Vote.findAll({
          where: { pollId }
        }).then(votes => {
          res.status(201).send({ success: true });
          const answers = votes.map(r => r.chose);
          req.app.io.to(pollId).emit('updateResults', answers);
        });
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
  Vote.findAll({
    where: { pollId }
  }).then(votes => {
    const answers = votes.map(r => r.chose);
    console.log(answers.join(' '));
  });
  res.status(201).send('results');
});

// DELETE

router.post('/delete-poll', async (req, res) => {
  res.send({ test: 'this is a test response' });
});

module.exports = router;
