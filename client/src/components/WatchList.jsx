import React, { useState, useEffect } from 'react';
import WatchPost from './WatchPost.jsx';

const WatchList = ({ watchList }) => {
  console.log(watchList)
  return (
    <div className="watchList">
      My WatchList:
      {watchList.map((watch, idx) => {
        return (
          <WatchPost
            key={idx}
            watch={watch}
          />
        )
      })}
    </div>
  )
}

export default WatchList;