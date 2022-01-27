import React, { useState, useEffect } from 'react';

const WatchPost = ({ watch }) => {
  return (
      <tr>
        <th>{watch.symbol}</th>
        <td>{watch.name}</td>
      </tr>
  )
}

export default WatchPost;