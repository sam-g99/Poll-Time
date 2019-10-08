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
  const creatorCode = crypto.randomBytes(25).toString('hex');
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
  res.send({ test: 'Trying to view a poll i see' });
});

router.post('/answer-poll', async (req, res) => {
  res.send({ test: 'this is a test' });
});

router.post('/delete-poll', async (req, res) => {
  res.send({ test: 'this is a test response' });
});

module.exports = router;
