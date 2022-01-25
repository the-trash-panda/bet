import React, { useState, useEffect } from 'react';
import RedditPost from './RedditPost.jsx';

const Reddit = ({tickerInfo}) => {
  if (Object.keys(tickerInfo).length === 0) {
    return (
      <div>Search me</div>
    )
  } else {
    return (
      <div>
        {tickerInfo.map((info, idx) => {
          return (
            <RedditPost
              key={idx}
              info={info}
            />
          )
        })}
      </div>
    )
  }
}

export default Reddit;