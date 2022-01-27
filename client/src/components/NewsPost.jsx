import React, { useState, useEffect } from 'react';


const NewsPost = ({ data }) => {
  return (
    <div className="newsPost">
      <a href={`${data.url}`} target="_blank">{data.title}</a>
      <p>
        {data.snippet}
        <br></br>
        {data.published_at.substring(0, 10)}
      </p>
    </div>
  )
}

export default NewsPost;