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

const etfList = mongoose.model('etfList', etfSchema);

module.exports = etfList;