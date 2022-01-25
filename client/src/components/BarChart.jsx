import React from 'react';
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto'


const BarChart = ({ chartData }) => {
  console.log('chartData:', chartData)
  return (
    <div className="chart">
      <Bar
        data={chartData.data}
        options={{
          title: {
            display: true,
            text: 'Average Rainfall per month',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
      />

    </div>
  )
}

export default BarChart;