import React, { useState, useEffect } from 'react';
import NewsPost from './NewsPost.jsx';


const News = ({ newsData }) => {
  if (newsData === null) {
    return (
      <div className="newsList">
        Nothing to see yet D:
      </div>
    )
  } else {
    const newData = newsData.splice(0, 5)
    return (
      <div className="newsList">
        {newData.map((data, idx) => {
          return (
            <NewsPost
              key={idx}
              data={data}
            />
          )
        })}
      </div>
    )
  }
}

export default News;