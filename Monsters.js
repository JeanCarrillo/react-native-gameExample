import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import Monster from './Monster';

class Monsters extends Component {
  constructor(props) {
    super(props);
    this.monstersGenerationSpeed = 200;
    this.monsters = []
    this.state = {
      monsters: [],
    }
  }

  componentDidMount() {
    this.gameRunning = setInterval(() => {
      this.refreshRender();
    }, 40);
    this.generatingMonsters = setInterval(() => {
      this.generateMonster();
    }, this.monstersGenerationSpeed);
  }

  refreshRender() {
    for (let i = 0; i < this.monsters; i += 1) {
        this.monsters[i].move();
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