import React, { useState } from 'react';
import Chart from "react-apexcharts";


const Candle = () => {
  const series = [{
    data: [
      [1538856000000, 6593.34, 6600, 6582.63, 6600],
      [1538856900000, 6595.16, 6604.76, 6590.73, 6593.86]
    ]
    }]
  const options = {
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: 'CandleStick Chart',
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


  return (
    <div>
      <Chart series={series} options={options} type="candlestick"/>
    </div>
  )
}

export default Candle;