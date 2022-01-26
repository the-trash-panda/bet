import React, { useState, useEffect } from 'react';
import Reddit from './Reddit.jsx';
import Candle from './Candle.jsx';
import axios from 'axios';
import 'regenerator-runtime/runtime';

const App = () => {

  const [didMount, setDidMount] = useState(false)
  const [tickerSymbol, setTickerSymbol] = useState(null)
  const [search, setSearch] = useState(false)
  const [tickerInfo, setTickerInfo] = useState({})
  const [chartData, setChartData] = useState({})
  const [options, setOptions] = useState({})
  const [series, setSeries] = useState([])

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
        />
        </div>
      </div>
    </div>
  )
}

export default App;