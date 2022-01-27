import React, { useState, useEffect } from 'react';
import RedditPost from './RedditPost.jsx';

const Reddit = ({redditInfo, tickerSymbol}) => {
  if (Object.keys(redditInfo).length === 0) {
    return (
      <div className="redditList">Search me</div>
      )
    } else {
    const newInfo = redditInfo.filter((info) => {
      return (
        info.selftext.length > 0
      )
    })
    return (
      <div>
        <img className="wallStreetBets" src="./images/WallStreetBets.png"/>
        <div className="redditList">
          {redditInfo.map((info, idx) => {
            return (
              <RedditPost
                key={idx}
                info={info}
                tickerSymbol={tickerSymbol}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default Reddit;