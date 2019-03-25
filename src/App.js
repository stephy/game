import React, { Component } from 'react';
import bg from './bg.jpg';
import { css } from 'glamor';
import app from './store/App'
import { GAMEBOARD_SELECTOR } from './store/Game';
import dinosprite from './store/assets/dinosprite.png';
import { GlobalShortcuts } from './store/Shortcuts';
import mouseTrap from 'react-mousetrap';

const styles = {
  container: {
    position: 'fixed',
    zIndex: 0,
  },
  bg: {
    position: 'fixed',
    bottom: 0,
    zIndex: 0,
  },
  startBtn: {
    position:'absolute',
    zIndex: 1,
  },
  gameBoard: {
    position: 'absolute',
    zIndex: 1,
    width:'100%'
  }
}

class App extends Component {
  private shortcutBindings: any;
  componentDidMount() {
    const props = this.props;
    GlobalShortcuts(props.store, this.shortcutBindings);
  }
  render() {
    return (
      <div {...css(styles.container)}>
          <img {...css(styles.bg)} src={bg} alt="bg" />
          <div {...css(styles.gameBoard)} id={GAMEBOARD_SELECTOR} />
         
          <button
            {...css(styles.startBtn)}
            onClick={() => {
            app.startGame();
            }}>
            start
          </button>
          <img src={dinosprite} alt='dinosaur' />
          <button
           {...css(styles.startBtn, { left: 100})}
           onClick={() => {
                   console.log('animate');
                   const dinosaur = app.game.components['dinosaur'];
                   app.game.updateGame();
                   dinosaur.moveForward(10);
                   app.game.updateGame();

          }}>move forward</button>
      </div>
    );
  }
}
export default mouseTrap(App);
