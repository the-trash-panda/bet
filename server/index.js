'use strict';

const config = require('../config.js');
const express = require('express');
const snoowrap = require('snoowrap');
const alpha = require('alphavantage')({ key: config.alphavantage });
const axios = require('axios')
const app = express();
const path = require('path');
const port = 3000;

const staticFilePath = path.join(__dirname, '..', '/client/dist')

const newsAPI = `https://newsapi.org/v2/everything`

app.use(express.static(staticFilePath));
app.use(express.json());



const reddit = new snoowrap({
  userAgent: config.userAgent,
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  username: config.username,
  password: config.password
});



app.get('/reddit/wallstreetbets', (req, res) => {
  const text = req.query.ticker
  reddit.search({
    query: text,
    time: 'month',
    subreddit: 'wallstreetbets',
    sort: 'new'
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
  alpha.data.intraday(`${text}`, 'full', 'json', '60min').then((data) => {
    res.send(data)
  });
})


app.get('/news', (req, res) => {
  let params = {
    q: req.query.ticker,
    from: '2022-01-01',
    sortBy: 'relevancy',
    apiKey: config.newsapi,
    language: 'en'
  }
  axios.get(`https://newsapi.org/v2/everything?q=${params.q}&from=${params.from}&sortBy=${params.sortBy}&language=${params.language}&apiKey=${params.apiKey}`)
    .then((data) => {
      res.status(200).send(data.data)
    })
    .catch((err) => {
      res.status(404).send(err)
    })
})

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`)
})