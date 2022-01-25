import React, { useState, useEffect } from 'react';
import Reddit from './Reddit.jsx';
import axios from 'axios';

const App = () => {

  const [tickerSymbol, setTickerSymbol] = useState(null)
  const [search, setSearch] = useState(false)
  const [tickerInfo, setTickerInfo] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = () => {
    axios.get('/reddit/ticker', { params: {ticker: tickerSymbol}})
      .then((res) => {
        console.log(res)
        setTickerInfo(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getTickerInfo = (ticker) => {
    setTickerSymbol(ticker)
  }


  return (
    <div>
      <h1>Bet</h1>
      <form onSubmit={(e) => {e.preventDefault(); fetchData()}}>
        <input
          placeholder="Search ticker symbol"
          onChange={(e) => {setTickerSymbol(e.target.value)}}
        ></input>
        <button
        >Go!</button>
      </form>
      <Reddit
        tickerInfo={tickerInfo}
      />
    </div>
  )
}

export default App;