const express = require('express');

const router = express.Router();
/* 
    This holds all the routes for the polls
*/
router.post('/create-poll', async (req, res) => {
  res.send({ test: 'this is a test response' });
});

router.post('/view-poll', async (req, res) => {
  res.send({ test: 'this is a test response' });
});

router.post('/delete-poll', async (req, res) => {
  res.send({ test: 'this is a test response' });
});

module.exports = router;
