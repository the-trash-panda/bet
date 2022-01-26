import React, { useState, useEffect } from 'react';


const NewsPost = ({ data }) => {
  console.log(data)
  return (
    <div className="newsPost">
      <a href={`${data.url}`} target="_blank">{data.title}</a>
      <p>
        {data.content.substring(0, 100)}
      </p>
    </div>
  )
}

export default NewsPost;