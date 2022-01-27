import React, { useState, useEffect } from 'react';
import WatchPost from './WatchPost.jsx';

const WatchList = ({ watchList }) => {
  console.log(watchList)
  return (
    <div className="watchList">
        My WatchList:
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {watchList.map((watch, idx) => {
            return (
              <WatchPost
                key={idx}
                watch={watch}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default WatchList;