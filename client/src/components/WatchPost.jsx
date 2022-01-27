import React, { useState, useEffect } from 'react';

const WatchPost = ({ watch, setTickerSymbol }) => {


  return (
      <tr onClick={() => {setTickerSymbol(watch.symbol)}}>
        <th>{watch.symbol}</th>
        <td>{watch.name}</td>
      </tr>
  )
}

export default WatchPost;