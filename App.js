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

  render() {
    const { monstersKilled, gameover } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={require('./assets/dirt.jpg')} style={{ width: '100%', height: '100%' }} >
          <Image
            source={require('./assets/character-left.png')}
            style={styles.player}
          />
          <Monsters checkGameOver={this.checkGameOver}/>
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
