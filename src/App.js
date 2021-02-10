import React, { Component } from 'react';

import classes from './App.module.css';
import Layaut from './components/Layaout/Layaout';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Layaut>
          <p>Test</p>
        </Layaut>
      </div>
    );
  }
}

export default App;
