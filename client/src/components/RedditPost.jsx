import React, { useState, useEffect } from 'react';
import moment from 'moment';

const RedditPost = ({info, tickerSymbol}) => {

  const dateTimeString = moment.unix(info.created).format('MMMM Do YYYY, h:mm:ss a');
  const index = info.title.indexOf(tickerSymbol)
  const index2 = info.selftext.indexOf(tickerSymbol)

  return (
    <div className="redditPost">
      <span className="redditPostDate">{dateTimeString}</span>
      <br></br>
      <span className="redditPostAuthor">
      {info.author} said:
      </span>
      <br></br>

        &nbsp;&nbsp;&nbsp;

      {index > -1 ?
      <h6>
        <span className="redditPostTitle">
          {info.title.substring(0, index)}
        </span>
        <span className="tickerSymbolTitle">
          {tickerSymbol}
        </span>
        <span className="redditPostTitle">
          {info.title.substring(index + tickerSymbol.length)}
        </span>
      </h6> : <h6><span className="redditPostTitle">{info.title}</span></h6>}
      <br></br>
      {index2 > -1 ?
        <p>
          <a href={`${info.url}`}></a>
          <span className="redditPostText">
            ...{index2 < 50 ? info.selftext.substring(0, index2) : info.selftext.substring(index2 - 100, index2)}
          </span>
          <span className="tickerSymbolText">
            {tickerSymbol}
          </span>
          <span className="redditPostText">
            {info.selftext.substring(index2 + tickerSymbol.length, index2 + 50)}...
          </span>
        </p> : <p><span className="redditPostText">{info.selftext.substring(0, 40)}</span></p>}
    </div>
  )
}

export default RedditPost;