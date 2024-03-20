// Paddle.js
import React from 'react';

const Paddle = ({ x }) => {
	return <div className="paddle" style={{ left: x }}></div>;
};

export default Paddle;
