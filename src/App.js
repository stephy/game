import React, { Component } from 'react';
import bg from './bg.jpg';
import { css } from 'glamor';

const styles = {
  container: {
    position: 'fixed',
  },
  bg: {
    position: 'fixed',
    bottom: 0,
  }
}
class App extends Component {
  render() {
    return (
      <div {...css(styles.container)}>
          <img {...css(styles.bg)} src={bg} alt="bg" />
      </div>
    );
  }
}

export default App;
