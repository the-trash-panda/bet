const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mvp', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('connected to mongo')
})

const etfSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  exchange: String,
  assetType: String,
  ipoDate: String,
  delistingDate: String,
  status: String
})

const watchListSchema = new mongoose.Schema({
  symbol: String,
  name: String
})

const earningsSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  reportDate: String,
  fiscalDateEnding: String,
  estimate: String,
  currency: String
})

module.exports = {
  etfList: mongoose.model('etfList', etfSchema),
  watchList: mongoose.model('watchList', watchListSchema),
  earningsList: mongoose.model('earningsList', earningsSchema)
}