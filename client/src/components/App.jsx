import React, { useState, useEffect } from 'react';
import Reddit from './Reddit.jsx';
import Candle from './Candle.jsx';
import News from './News.jsx';
import axios from 'axios';
import 'regenerator-runtime/runtime';
import config from '../../../config.js';

const App = () => {

  const [didMount, setDidMount] = useState(false)
  const [tickerSymbol, setTickerSymbol] = useState(null)
  const [tickerInfo, setTickerInfo] = useState({})
  const [chartData, setChartData] = useState(null)
  const [newsData, setNewsData] = useState(null)

  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, [])

  const fetchData = () => {
    axios.get('/reddit/ticker', { params: { ticker: tickerSymbol } })
      .then((res) => {
        const newInfo = res.data.filter((info) => {
          return (
            info.selftext.length > 0
          )
        })
        setTickerInfo(newInfo)
        return axios.get('/candle', { params: { ticker: tickerSymbol}})
      })
      .then((res) => {
        let data = [];
        for (let key in res.data['Time Series (1min)']) {
          let innerData = [];
          innerData.push(Math.floor(new Date(key).getTime()), res.data['Time Series (1min)'][key]['1. open'], res.data['Time Series (1min)'][key]['2. high'], res.data['Time Series (1min)'][key]['3. low'], res.data['Time Series (1min)'][key]['4. close'])
          data.push(innerData)
        }
        setChartData([{data}])
        let params = {
          q: tickerSymbol,
          from: '2022-01-01',
          sortBy: 'relevancy',
          apiKey: config.newsapi,
          language: 'en'
        }
        return axios.get(`https://newsapi.org/v2/everything?q=${params.q}&from=${params.from}&sortBy=${params.sortBy}&language=${params.language}&apiKey=${params.apiKey}`)
      })
      .then((res) => {
        setNewsData(res.data.articles)
      })
      .catch((err) => {
        res.send(err)
      })
  }

  if (!didMount) {
    return null;
  }

  return (
    <div className="app">
      <div className="topBar">
        <h1 className="title">Bet.</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchData()
        }}>
          <input className="searchBar"
            placeholder="Search..."
            onChange={(e) => {
              const newTicker = e.target.value
              setTickerSymbol(newTicker.toUpperCase())
            }}
          ></input>
          <button className="searchButton"
          >Go!</button>
        </form>
      </div>
      <div className="topContainer">
        <Reddit
          tickerSymbol={tickerSymbol}
          tickerInfo={tickerInfo}
        />
        <div>
        <Candle
          tickerSymbol={tickerSymbol}
          chartData={chartData}
        />
        </div>
      </div>
      <div className="bottomContainer">
        <News
          newsData={newsData}
        />
      </div>
    </div>
  )
}

export default App;