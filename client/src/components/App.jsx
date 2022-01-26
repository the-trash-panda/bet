import React, { useState, useEffect } from 'react';
import Reddit from './Reddit.jsx';
import Candle from './Candle.jsx';
import News from './News.jsx';
import axios from 'axios';
import 'regenerator-runtime/runtime';
import config from '../../../config.js';

const App = () => {

  const [didMount, setDidMount] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState(false)

  const [tickerSymbol, setTickerSymbol] = useState('SPY')
  const [redditInfo, setRedditInfo] = useState({})
  const [chartData, setChartData] = useState(null)
  const [newsData, setNewsData] = useState(null)

  const fetchData = (tickerSymbol =  'SPY') => {
    const getRedditData = axios.get('/reddit/wallstreetbets', { params: { ticker: tickerSymbol } })
      .then((res) => {setRedditInfo(res.data)})
    const getChartData = axios.get('/candle', { params: { ticker: tickerSymbol}})
      .then((res) => {setChartData(res.data)})
    const getNewsData = axios.get('/news', {params: { ticker: tickerSymbol }})
      .then((res) => {setNewsData(res.data.articles)})

    const promises = [getRedditData, getChartData, getNewsData];

    Promise.all(promises)
      .then(() => {setIsError(false)})
      .then(() => {
        setTimeout(() => {setIsLoading(false)}, 5000)
      })
      .then(() => {setTickerSymbol(tickerSymbol)})
      .catch((err) => {
        setIsError(true)
        console.log(err)
      })
  }

  useEffect(() => {
    const url = new URL(document.URL)
    const symbol = parseInt(url.search.split('=')[1], 10);
    if (symbol) {
      fetchData(symbol);
    } else {
      fetchData(tickerSymbol)
    }
  }, [search])

  if (isError) { return <div className="loadingDiv"><span className="loading">Requests failed to load :(</span> </div>}
  if (isLoading) { return <div className="loadingDiv"><span className="loading"><img className="loadingIMG" src="./images/loading.GIF" alt="Loading"/>Loading...</span></div> }


  return (
    <div className="app">
      <div className="topBar">
        <h1 className="title">Bet.</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(!search)
        }}>
          <input
            className="searchBar"
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
          redditInfo={redditInfo}
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