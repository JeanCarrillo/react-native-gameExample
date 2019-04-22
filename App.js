import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import Monster from './Monster';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.monsterSpeedGeneration = 100;
    this.state = {
      monsters: [],
      monstersKilled: 0,
      gameover: false,
    }
  }

  componentDidMount() {
    this.generatingMonsters = setInterval(
      () => this.generateMonster()
      , this.monsterSpeedGeneration);
  }

  increaseDifficulty() {
    this.monsterSpeedGeneration -= 100;
  }

  generateMonster() {
    const { monsters } = this.state;
    monsters.push('zombie2');
    this.setState({ monsters });
  }

  killMonster = (index) => {
    const { monsters, monstersKilled } = this.state;
    monsters[index] = "";
    newCounter = monstersKilled + 1
    this.setState({ monsters, monstersKilled: newCounter });
  }

  checkGameOver = (value) => {
    if (value) {
      this.setState({ gameover: true });
      clearInterval(this.generatingMonsters);
    };
  }

  render() {
    const { monsters, monstersKilled, gameover } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={require('./assets/dirt.jpg')} style={{ width: '100%', height: '100%' }} >
          <Image
            source={require('./assets/character-left.png')}
            style={styles.player}
          />
          {
            monsters.map((monster, monsterIndex) => (
              monsters[monsterIndex] !== "" ?
                <Monster
                  monster={monster}
                  key={`monsterId-${monsterIndex}`}
                  index={monsterIndex}
                  checkGameOver={this.checkGameOver}
                  killMonster={this.killMonster}
                />
                : null
            ))
          }
          {
            gameover ?
              <Text style={{ position: 'absolute', top: 150, left: 100, color: 'red', fontSize: 30 }}>
                GAME OVER
                Score: {monstersKilled}
              </Text>
              : null
          }
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  player: {
    top: 320,
    left: 170,
    width: 70,
    height: 100,
    position: 'absolute',
  }
});

export default App;