import React, { useState, useEffect } from 'react';
import Reddit from './Reddit.jsx';
import BarChart from './BarChart.jsx';
import axios from 'axios';
import 'regenerator-runtime/runtime'

const App = () => {

  const [didMount, setDidMount] = useState(false)
  const [tickerSymbol, setTickerSymbol] = useState(null)
  const [search, setSearch] = useState(false)
  const [tickerInfo, setTickerInfo] = useState({})
  const [chartData, setChartData] = useState({})

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

  useEffect(() => {
    const fetchPrices = async () => {
      setChartData({
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    }
    fetchPrices()
  }, [])

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
        <BarChart
          chartData={chartData}
        />
      </div>
    </div>
  )
}

export default App;