import React, { useState, useEffect } from 'react';
import Reddit from './Reddit.jsx';
import Candle from './Candle.jsx';
import axios from 'axios';
import 'regenerator-runtime/runtime';

const App = () => {

  const [didMount, setDidMount] = useState(false)
  const [tickerSymbol, setTickerSymbol] = useState(null)
  const [tickerInfo, setTickerInfo] = useState({})
  const [chartData, setChartData] = useState(null)

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
        console.log(res.data['Time Series (1min)'])
        let data = [];
        //timestamp, o, h, l, c
        for (let key in res.data['Time Series (1min)']) {
          let innerData = [];
          innerData.push(Math.floor(new Date(key).getTime()), res.data['Time Series (1min)'][key]['1. open'], res.data['Time Series (1min)'][key]['2. high'], res.data['Time Series (1min)'][key]['3. low'], res.data['Time Series (1min)'][key]['4. close'])
          data.push(innerData)
        }
        setChartData([{data}])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  if (!didMount) {
    return null;
  }

  return (
    <div>
      <h1>Bet</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        fetchData()
      }}>
        <input
          placeholder="Search ticker symbol"
          onChange={(e) => {
            const newTicker = e.target.value
            setTickerSymbol(newTicker)
          }}
        ></input>
        <button
        >Go!</button>
      </form>
      <div className="topContainer">
        <Reddit
          tickerSymbol={tickerSymbol}
          tickerInfo={tickerInfo}
        />
        <div className="chart">
        <Candle
          tickerSymbol={tickerSymbol}
          chartData={chartData}
        />
        </div>
      </div>
    </div>
  )
}

export default App;