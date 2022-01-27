'use strict';

const config = require('../config.js');
const express = require('express');
const snoowrap = require('snoowrap');
const alpha = require('alphavantage')({ key: config.alphavantage });
const {StringStream} = require("scramjet");
const request = require("request");
const axios = require('axios');
const db = require('../database/index.js');
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

app.get('/watchList', (req, res) => {
  db.watchList.find({})
    .exec((err, results) => {
      if (err) {
        res.status(500).send(err)
      } else {
        console.log(results)
        res.status(200).send(results)
      }
    })
})

app.post('/watchList', (req, res) => {
  console.log('req.body:', req.body)
  const etf = req.body.symbol
  db.etfList.find({symbol: etf}, {name: 1})
    .exec((err, results) => {
      if (err) {
        res.status(500).send(err)
      } else {
        console.log('post results:', results)
        const name = results[0].name
        let newWatch = {
          symbol: etf,
          name: name
        }
        console.log('post newWatch:', newWatch)
        let newETF = new db.watchList (newWatch)
        newETF.save()
        res.send(newETF)
      }
    })
})

app.get('/reddit/wallstreetbets', (req, res) => {
  const text = req.query.ticker
  reddit.search({
    query: text,
    time: 'year',
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
  db.etfList.find({symbol: text}).exec((err, result) => {
    if (err) {
      console.log('Chart unavailable')
    } else {
      alpha.data.intraday(`${text}`, 'full', 'json', '60min').then((data) => {
        res.send(data)
      });
    }
  })
})

app.get('/ETFlist', (req, res) => {
  const etf = {};
  request.get(`https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${config.alphavantage}`)
    .pipe(new StringStream())
    .CSVParse()
    .consume((object) => {
      console.log("Row:", object);
      let newETF = new db.etfList({symbol: object[0], name: object[1], exchange: object[2], assetType: object[3], ipoDate: object[4], delistingDate: object[5], status: object[6]})
      newETF.save();
    })
    .then(() => console.log("success"));
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