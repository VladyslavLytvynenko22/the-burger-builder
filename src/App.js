import React, { Component } from 'react';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layaut from './hoc/Layaout/Layaout';
import classes from './App.module.css';

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
