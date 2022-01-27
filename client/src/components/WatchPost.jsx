import React, { useState, useEffect } from 'react';

const WatchPost = ({ watch, setTickerSymbol, search, setSearch }) => {


  return (
      <tr onClick={(e) => {setTickerSymbol(watch.symbol); setSearch(!search)}}>
        <th>{watch.symbol}</th>
        <td>{watch.name}</td>
      </tr>
  )
}

export default WatchPost;