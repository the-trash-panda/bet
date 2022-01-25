import React, { useState, useEffect } from 'react';

const RedditPost = ({info}) => {
  return (
    <div>
      Post: {info.selftext}
    </div>
  )
}

export default RedditPost;