import React, { useState, useEffect } from 'react';
import moment from 'moment';

const RedditPost = ({info, tickerSymbol}) => {
  //if selftext substring = tickerSymbol, show different color?
  const dateTimeString = moment.unix(info.created).format('MMMM Do YYYY, h:mm:ss a');
  console.log(info)
  const index = info.selftext.indexOf(tickerSymbol)
  console.log(index)
  return (
    <div className="redditPost">
      Time: {dateTimeString}
      <br></br>
      {info.author} said: {info.title}
      <br></br>
      Post: {index > -1 ?
                          <p>
                            <span>
                              {info.selftext.substring(index - 30, index)}
                            </span>
                            <span className="tickerSymbol">
                              {tickerSymbol}
                            </span>
                            <span>
                              {info.selftext.substring(index + tickerSymbol.toString().length, index + tickerSymbol.toString().length + 30)}
                            </span>
                          </p> : null}
    </div>
  )
}

export default RedditPost;