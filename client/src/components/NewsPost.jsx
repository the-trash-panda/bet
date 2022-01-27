import React, { useState, useEffect } from 'react';


const NewsPost = ({ data }) => {
  return (
    <div className="newsPost">
      <a href={`${data.url}`} target="_blank">{data.title}</a>
      <p>
        {data.content}
        <br></br>
        {data.publishedAt.substring(0, 10)}
      </p>
    </div>
  )
}

export default NewsPost;