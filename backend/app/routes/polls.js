/* 
    This holds all the routes for the polls
*/
const express = require('express');

const router = express.Router();

const shortid = require('shortid');

const crypto = require('crypto');
const Poll = require('../database/models/poll');

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

router.get('/view-poll', async (req, res) => {
  const { pollId } = req.body;
  Poll.findOne({
    where: { pollId }
  })
    .then(poll => {
      // Successfully found
      if (poll) {
        const options = poll.options.join(' or ');
        res.send(
          `Poll question is ${poll.question} and the (options are ${options})`
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
    })
    .catch(error => {
      console.log(error);
    });
});

router.post('/answer-poll', async (req, res) => {
  res.send({ test: 'this is a test' });
});

router.post('/delete-poll', async (req, res) => {
  res.send({ test: 'this is a test response' });
});

module.exports = router;
