import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import Monsters from './Monsters';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monstersKilled: 0,
      gameover: false,
    }
  }

  checkGameOver = (value) => {
    if (value) {
      this.setState({ gameover: true });
    };
  }

  updateScore = (value) => {
    const { monstersKilled } = this.state;
    const newCounter = monstersKilled + value;
    this.setState({ monstersKilled: newCounter });
  }

  render() {
    const { monstersKilled, gameover } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={require('./assets/dirt.jpg')} style={{ width: '100%', height: '100%' }} >
          <Image
            source={require('./assets/character-left.png')}
            style={styles.player}
          />
          <Monsters checkGameOver={this.checkGameOver} updateScore={this.updateScore} />
          {
            gameover ?
              <View>
                <Text style={{ position: 'absolute', top: 150, left: 100, color: 'red', fontSize: 40 }}>
                  GAME OVER
                </Text>
                <Text style={{ position: 'absolute', top: 195, left: 100, color: 'red', fontSize: 40 }}>
                  Score: {monstersKilled}
                </Text>
              </View>
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
