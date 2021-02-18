import React, { Component } from 'react';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Layaut from './hoc/Layaout/Layaout';
import classes from './App.module.css';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Layaut>
          <BurgerBuilder />
          <Checkout />
        </Layaut>
      </div>
    );
  }
}

export default App;
