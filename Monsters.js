import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import Monster from './Monster';

class Monsters extends Component {
  constructor(props) {
    super(props);
    this.monstersGenerationSpeed = 1000;
    this.monsters = []
    this.state = {
      monsters: [],
    }
  }

  componentDidMount() {
    this.gameRunning = setInterval(() => {
      this.refreshRender();
    }, 20);
    this.generatingMonsters = setInterval(() => {
      this.generateMonster();
    }, this.monstersGenerationSpeed);
  }

  refreshRender() {
    for (let i = 0; i < this.monsters.length; i += 1) {
      if (this.monsters[i] !== "") {
        this.monsters[i].move();
        if ((this.monsters[i].monsterStyle.left > 160 && this.monsters[i].monsterStyle.left < 180)
          && (this.monsters[i].monsterStyle.top > 310 && this.monsters[i].monsterStyle.top < 330)) {
          const { checkGameOver } = this.props;
          checkGameOver(true);
          clearInterval(this.gameRunning);
          clearInterval(this.generatingMonsters);
        }
      }
    }
    this.setState({ monsters: this.monsters })
  }

  increaseDifficulty() {
    // this.monstersGenerationSpeed -= 100;
  }

  generateMonster() {
    let monster = new Monster();
    this.monsters.push(monster);
  }

  killMonster = (index) => {
    this.monsters[index] = "";
    this.monstersKilled += 1;
    const { updateScore } = this.props;
    updateScore(1);
  }


  render() {
    return (
      <View style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
      >
        {
          this.monsters.map((monster, index) => (
            monster !== ""
              ? <TouchableWithoutFeedback key={`monsterId-${index + 1}`} onPress={() => this.killMonster(index)}>
                <Image
                  key={`monsterImg-${index + 1}`}
                  source={require('./assets/zombie2-right.png')}
                  style={monster.monsterStyle}
                />
              </TouchableWithoutFeedback>
              : null
          ))
        }
      </View>
    );
  }
}

export default Monsters;