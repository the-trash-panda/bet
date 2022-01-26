import React, { useState, useEffect } from 'react';
import moment from 'moment';

const RedditPost = ({info, tickerSymbol}) => {

  const dateTimeString = moment.unix(info.created).format('MMMM Do YYYY, h:mm:ss a');
  const index = info.selftext.indexOf(tickerSymbol)

  return (
    <div className="redditPost">
      <span className="redditPostDate">{dateTimeString}</span>
      <br></br>
      <span className="redditPostAuthor">
      {info.author} said:
      </span>
      <br></br>
      <span className="redditPostTitle">&nbsp;&nbsp;&nbsp; {info.title.substring(0, index)}</span>
      <span className="tickerSymbol">{tickerSymbol}</span>
      <span className="redditPostTitle">{info.title.substring(index + tickerSymbol.toString().length, info.title.length)}</span>
      <br></br>
      {index > -1 ?
        <p>
          <span>
            ...{info.selftext.substring(index - 30, index)}
          </span>
          <span className="tickerSymbol">
            {tickerSymbol}
          </span>
          <span>
            {info.selftext.substring(index + tickerSymbol.toString().length, index + tickerSymbol.toString().length + 200)}...
          </span>
        </p> : null}
    </div>
  )
}

export default RedditPost;