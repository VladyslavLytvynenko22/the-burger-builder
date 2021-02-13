import React, { Component } from 'react';

import classes from './App.module.css';
import Layaut from './hoc/Layaout/Layaout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Layaut>
          <BurgerBuilder />
        </Layaut>
      </div>
    );
  }
}

export default App;
