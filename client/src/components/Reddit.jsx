import React, { useState, useEffect } from 'react';
import RedditPost from './RedditPost.jsx';

const Reddit = ({tickerInfo, tickerSymbol}) => {
  if (Object.keys(tickerInfo).length === 0) {
    return (
      <div className="redditList">Search me</div>
    )
  } else {
    return (
      <div className="redditList">
        {tickerInfo.map((info, idx) => {
          return (
            <RedditPost
              key={idx}
              info={info}
              tickerSymbol={tickerSymbol}
            />
          )
        })}
      </div>
    )
  }
}

export default Reddit;