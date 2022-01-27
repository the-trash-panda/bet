import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = ({ search, tickerSymbol, setSearch, setTickerSymbol, watchList, setWatchList}) => {

  const addToList = (etf) => {
    console.log('addToList:', etf)
    let params = {
      symbol: etf,
      name: 'idk'
    }
    axios.post('/watchList', params)
      .then((response) => {
        console.log('hi')
        console.log('axios.post watchlist response:', response)
        return axios.get('/watchList')
      })
      .then((response) => {
        console.log('axios.get watchlist response:', response)
        setWatchList(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <form>
        <input
          className="searchBar"
          placeholder="Search..."
          onChange={(e) => {
            const newTicker = e.target.value
            setTickerSymbol(newTicker.toUpperCase())
          }}
        ></input>
        <button
          className="searchButton"
          onClick={(e) => {
            e.preventDefault();
            setSearch(!search);
        }}
        >Go!</button>
        <button
          className="watchListButton"
          onClick={(e) => {
            e.preventDefault();
            addToList(tickerSymbol)
            console.log('bye', tickerSymbol)
          }}
        >Add to WatchList</button>
      </form>
    </div>
  )
}

export default Form;