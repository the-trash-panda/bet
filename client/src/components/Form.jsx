import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = ({ search, tickerSymbol, setSearch, setTickerSymbol, watchList, setWatchList, setHomePage}) => {

  const [button, setButton] = useState('Add to Watch List')

  useEffect(() => {
    if (watchList !== null) {
      watchList.map((watch) => {
        if (watch.symbol === tickerSymbol) {
          setButton('Remove from Watch List')
        } else {
          setButton('Add to Watch List')
        }
      })
    }
  }, [watchList, search])


  const addToList = (etf) => {
    let params = {
      symbol: etf,
    }

    axios.post('/watchList', params)
      .then((res) => {
        return axios.get('/watchList')
      })
      .then((res) => {
        if (!Array.isArray(res.data)) {
          setWatchList([res.data])
        } else {
          setWatchList(res.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const buttonText = (e) => {
    e.preventDefault();
    if (button === 'Remove from Watch List') {
      setButton('Add to Watch List')
    } else if (button === 'Add to Watch List') {
      setButton('Remove from Watch List')
    }
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
            buttonText(e)
            addToList(tickerSymbol)
          }}
        >{button}</button>
        <button
          className="newsButton"
          onClick={(e) => {
            e.preventDefault();
            setHomePage('news');
          }}
        >DD</button>
      </form>
    </div>
  )
}

export default Form;