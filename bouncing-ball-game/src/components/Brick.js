// Brick.js
import React from 'react';

const Brick = ({ x, y }) => {
  return <div className="brick" style={{ left: x, top: y }}></div>;
};

export default Brick;
