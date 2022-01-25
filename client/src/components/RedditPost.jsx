import React, { useState, useEffect } from 'react';
import moment from 'moment';

const RedditPost = ({info, tickerSymbol}) => {
  //if selftext substring = tickerSymbol, show different color?
  const dateTimeString = moment.unix(info.created).format('MMMM Do YYYY, h:mm:ss a');

  return (
    <div className="redditPost">
      Title: {info.title} Post: {info.selftext.substring(0, 50)} Time: {dateTimeString}
    </div>
  )
}

export default RedditPost;