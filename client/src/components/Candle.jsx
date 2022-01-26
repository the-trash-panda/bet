import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";


const Candle = ({ tickerSymbol, chartData }) => {
  const options = {
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: tickerSymbol,
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  }


  useEffect(() => {
  }, [chartData])

  if (chartData === null) {
    return (
      <div>
        Nothing to show yet!
      </div>
    )
  } else {
    return (
      <div>
        <Chart className="chart" series={chartData} options={options} type="candlestick"/>
      </div>
    )
  }

}

export default Candle;