import React, { Component } from 'react';

class Monster extends Component {
  constructor(props) {
    super(props);
    // Monster is coming from :
    const comingFromSide = Math.floor(Math.random() * 4);
    switch (comingFromSide) {
      // left
      case 1:
        this.monsterStyle = {
          position: 'absolute',
          left: -100,
          top: Math.floor(Math.random() * 800),
          width: 70,
          height: 100,
        };
        break;
      // right
      case 2:
        this.monsterStyle = {
          position: 'absolute',
          left: 800,
          top: Math.floor(Math.random() * 800),
          width: 70,
          height: 100,
        };
        break;
      // top
      case 3:
        this.monsterStyle = {
          position: 'absolute',
          top: -100,
          left: Math.floor(Math.random() * 800),
          width: 70,
          height: 100,
        };
        break;
      // bottom
      default:
        this.monsterStyle = {
          position: 'absolute',
          top: 801,
          left: Math.floor(Math.random() * 800),
          width: 70,
          height: 100,
        };
        break;
    }
    // Calculate speedX and speedY (distance per step)
    let directionX = 170 - this.monsterStyle.left;
    let directionY = 320 - this.monsterStyle.top;
    let len = Math.sqrt(directionX * directionX + directionY * directionY);
    directionX /= len;
    directionY /= len;
    // Adjust speed here (distance per step)
    this.speedX = directionX * 2
    this.speedY = directionY * 2
  }


  move() {
    this.monsterStyle.top += this.speedY;
    this.monsterStyle.left += this.speedX;
  }
}


export default Monster;
