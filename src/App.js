import React, { Component } from 'react';
import bg from './bg.jpg';
import { css } from 'glamor';
import app from './store/App'
import { GAMEBOARD_SELECTOR } from './store/Game';
import { GlobalShortcuts } from './store/Shortcuts';
import mouseTrap from 'react-mousetrap';
const slide = css.keyframes ({ 
  '0%': {  backgroundPosition: '0 0' },
  '100%': { backgroundPosition: '-1000px 0' }
});
const styles = {
  container: {
    position: 'fixed',
    zIndex: 0,
  },
  bg: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 0,
    width: '100%',
    height: '500px',
    background: `grey url(${bg}) repeat 0 0`,
    boxSizing: 'border-box',
    animation: `${slide} 20s linear infinite`,
    backgroundSize: 'contain',
  },
  startBtn: {
    position:'absolute',
    zIndex: 1,
  },
  gameBoard: {
    position: 'absolute',
    zIndex: 1,
    width:'100%',
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.shortcutBindings = props.bindShortcut;
  }
  componentDidMount() {
    GlobalShortcuts(this.shortcutBindings);
  }
  render() {
    return (
      <div {...css(styles.container)}>
          <div {...css(styles.bg)} />
          <div {...css(styles.gameBoard)} id={GAMEBOARD_SELECTOR} />
         
          <button
            {...css(styles.startBtn)}
            onClick={() => {
            app.startGame();
            }}>
            start
          </button>
      </div>
    );
  }
}
export default mouseTrap(App);
