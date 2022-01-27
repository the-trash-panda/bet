import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = ({ search, tickerSymbol, setSearch, setTickerSymbol, watchList, setWatchList, setHomePage}) => {

  const addToList = (etf) => {
    let params = {
      symbol: etf,
    }
    axios.post('/watchList', params)
      .then((response) => {
        return axios.get('/watchList')
      })
      .then((response) => {
        setWatchList(response.data)
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
        <button
          className="newsButton"
          onClick={(e) => {e.preventDefault(); setHomePage('news');}}
        >
          Latest News
        </button>
      </form>
    </div>
  )
}

export default Form;