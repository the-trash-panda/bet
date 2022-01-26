'use strict';
const corsOptions = {
   origin:'*',
   credentials: true,
   optionSuccessStatus:200,
}

const config = require('../config.js');
const express = require('express');
const cors = require("cors");
const snoowrap = require('snoowrap');
const alpha = require('alphavantage')({ key: config.alphavantage });
const app = express();
const path = require('path');
const port = 3000;

const staticFilePath = path.join(__dirname, '..', '/client/dist')

app.use(cors(corsOptions))
app.use(express.static(staticFilePath));
app.use(express.json());



const reddit = new snoowrap({
  userAgent: config.userAgent,
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  username: config.username,
  password: config.password
});



app.get('/reddit/ticker', (req, res) => {
  const text = req.query.ticker
  reddit.search({
    query: text,
    time: 'month',
    subreddit: 'wallstreetbets',
    sort: 'top'
  })
  .then((data) => {
    res.status(200).send(data)
  })
  .catch((err) => {
    res.send(err)
  })
})

app.get('/candle', (req, res) => {
  const text = req.query.ticker
  alpha.data.intraday(`${text}`).then((data) => {
    res.send(data)
  });
})

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`)
})