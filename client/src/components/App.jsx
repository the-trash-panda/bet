import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Reddit from './Reddit.jsx';
import Candle from './Candle.jsx';
import News from './News.jsx';
import WatchList from './WatchList.jsx';
import Form from './Form.jsx';
import axios from 'axios';
import 'regenerator-runtime/runtime';
import config from '../../../config.js';

const App = () => {

  const [didMount, setDidMount] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState(false)

  const [homePage, setHomePage] = useState('home')

  const [tickerSymbol, setTickerSymbol] = useState('SPY')
  const [redditInfo, setRedditInfo] = useState({})
  const [chartData, setChartData] = useState(null)
  const [newsData, setNewsData] = useState(null)
  const [watchList, setWatchList] = useState(null)
  const [value, onChange] = useState(new Date());

  const fetchData = (tickerSymbol =  'SPY') => {
    const getWatchList = axios.get('/watchList')
      .then((res) => {console.log(res); setWatchList(res.data)})
    const getRedditData = axios.get('/reddit/wallstreetbets', { params: { ticker: tickerSymbol } })
      .then((res) => {setRedditInfo(res.data)})
    const getChartData = axios.get('/candle', { params: { ticker: tickerSymbol}})
      .then((res) => {setChartData(res.data)})
    const getNewsData = axios.get('/news', {params: { ticker: tickerSymbol }})
      .then((res) => {setNewsData(res.data.articles)})

    const promises = [getWatchList, getRedditData, getChartData, getNewsData];

    Promise.all(promises)
      .then(() => { setIsError(false)} )
      .then(() => { setTimeout(() => {setIsLoading(false)}, 2500)} )
      .then(() => { setTickerSymbol(tickerSymbol)} )
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
    <div className="main">
      <div className="topBar">
        <h1
          className="title"
          onClick={(e) => {setHomePage('home')}}
        >Bet.</h1>
        <Form
          search={search}
          tickerSymbol={tickerSymbol}
          watchList={watchList}
          setSearch={setSearch}
          setTickerSymbol={setTickerSymbol}
          setWatchList={setWatchList}
          setHomePage={setHomePage}
        />
      </div>
      {homePage === 'home' ?
        <div className="container">
          <div className="leftContainer">
            <Calendar
              onChange={onChange}
              value={value}
            />
            <WatchList
              watchList={watchList}
              setTickerSymbol={setTickerSymbol}
            />
          </div>
          <div className="rightContainer">
            <div className="topContainer">
              <Reddit
                tickerSymbol={tickerSymbol}
                redditInfo={redditInfo}
              />
              <Candle
                tickerSymbol={tickerSymbol}
                chartData={chartData}
              />
            </div>
          </div>
        </div>
        :
        <div className="bottomContainer">
          <News
            newsData={newsData}
          />
        </div>
      }
    </div>
  )
}

export default App;