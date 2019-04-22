import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';

class Monster extends Component {
  constructor(props) {
    super(props);
    const { monster } = this.props;
    this.monster = monster;
    // Monster is coming from :
    const comingFromSide = Math.floor(Math.random() * 4);
    switch (comingFromSide) {
      // left
      case 1:
        this.monsterStyle = {
          left: -100,
          top: Math.floor(Math.random() * 800),
          width: 70,
          height: 100,
        };
        break;
      // right
      case 2:
        this.monsterStyle = {
          left: 800,
          top: Math.floor(Math.random() * 800),
          width: 70,
          height: 100,
        };
        break;
      // top
      case 3:
        this.monsterStyle = {
          top: -100,
          left: Math.floor(Math.random() * 800),
          width: 70,
          height: 100,
        };
        break;
      // bottom
      default:
        this.monsterStyle = {
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
    // Moving speed (setInterval): one step every this.moveInterval ms
    this.moveInterval = 50;
    this.state = {
      monsterStyle: this.monsterStyle,
    }
  }

  componentWillMount() {
    this.monsterMoving = setInterval(() => {
      this.move();
    }, this.moveInterval);
  }

  monsterkilled() {
    const { killMonster, index } = this.props;
    clearInterval(this.monsterMoving);
    killMonster(index);
  }

  move() {
    const { checkGameOver } = this.props;
    let { monsterStyle } = this.state;
    let newMonsterStyle = { ...monsterStyle };
    if ((newMonsterStyle.left >= 160 && newMonsterStyle.left <= 180) && (newMonsterStyle.top >= 310 && newMonsterStyle.top <= 330)) {
      checkGameOver(true);
    } else {
      newMonsterStyle.top += this.speedY;
      newMonsterStyle.left += this.speedX;
    }
    this.setState({ monsterStyle: newMonsterStyle });
  }


  render() {
    const { monsterStyle } = this.state;
    return (
      <View style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
      >
        <TouchableWithoutFeedback onPress={() => this.monsterkilled()}>
          <Image
            source={require('./assets/zombie2-right.png')}
            style={monsterStyle}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default Monster;