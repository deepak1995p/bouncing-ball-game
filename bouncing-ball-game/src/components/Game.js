// Game.js
import React, { useEffect, useState } from 'react';
import Ball from './Ball';
import Paddle from './Paddle';
import Brick from './Brick';

const Game = () => {
  const [ballPosition, setBallPosition] = useState({ x: 325, y: 410 });
  const [ballVelocity, setBallVelocity] = useState({ dx: 2, dy: -2 });
  const [paddlePosition, setPaddlePosition] = useState(289);
  const [bricks, setBricks] = useState([]);

  useEffect(() => {
    const rowCount = 5;
    const columnCount = 9;
    const brickWidth = 54;
    const brickHeight = 18;
    const brickPadding = 12;
    const topOffset = 40;
    const leftOffset = 33;

    const newBricks = [];
    for (let c = 0; c < columnCount; c++) {
      for (let r = 0; r < rowCount; r++) {
        newBricks.push({ x: c * (brickWidth + brickPadding) + leftOffset, y: r * (brickHeight + brickPadding) + topOffset });
      }
    }
    setBricks(newBricks);
  }, []);

  useEffect(() => {
    const moveBall = () => {
      setBallPosition((prevPosition) => ({
        x: prevPosition.x + ballVelocity.dx,
        y: prevPosition.y + ballVelocity.dy
      }));
    };

    const gameLoop = setInterval(moveBall, 10);

    return () => clearInterval(gameLoop);
  }, [ballVelocity]);

  const handleMouseMove = (e) => {
    setPaddlePosition(e.clientX - e.target.offsetLeft - 36);
  };

  const handleCollision = () => {
    // Collision with walls
    if (ballPosition.x + ballVelocity.dx > 650 - 18 || ballPosition.x + ballVelocity.dx < 0) {
      setBallVelocity((prevVelocity) => ({ ...prevVelocity, dx: -prevVelocity.dx }));
    }
    if (ballPosition.y + ballVelocity.dy < 0) {
      setBallVelocity((prevVelocity) => ({ ...prevVelocity, dy: -prevVelocity.dy }));
    } else if (ballPosition.y + ballVelocity.dy > 450 - 18) {
      // Collision with paddle
      if (ballPosition.x > paddlePosition && ballPosition.x < paddlePosition + 72) {
        setBallVelocity((prevVelocity) => ({ ...prevVelocity, dy: -prevVelocity.dy }));
      } else {
        // Game over
        alert('Game Over 😳!');
        document.location.reload();
      }
    }

    // Collision with bricks
    bricks.forEach((brick, index) => {
      if (
        ballPosition.x > brick.x &&
        ballPosition.x < brick.x + 54 &&
        ballPosition.y > brick.y &&
        ballPosition.y < brick.y + 18
      ) {
        setBallVelocity((prevVelocity) => ({ ...prevVelocity, dy: -prevVelocity.dy }));
        bricks.splice(index, 1);
        if (bricks.length === 0) {
          alert('Congratulations You Win 🎉✨🎉!');
          document.location.reload();
        }
      }
    });
  };

  useEffect(() => {
    handleCollision();
  }, [ballPosition]);

  return (
    <div className="game-container" onMouseMove={handleMouseMove}>
      <Ball x={ballPosition.x} y={ballPosition.y} />
      <Paddle x={paddlePosition} />
      {bricks.map((brick, index) => (
        <Brick key={index} x={brick.x} y={brick.y} />
      ))}
    </div>
  );
};

export default Game;
