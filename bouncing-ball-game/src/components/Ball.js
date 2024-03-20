import React from 'react';

const Ball = ({ x, y }) => {
  return <div className="ball" style={{ left: x, top: y }}></div>;
};

export default Ball;