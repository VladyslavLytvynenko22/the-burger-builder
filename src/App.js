import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Layaut from './hoc/Layaout/Layaout';
import classes from './App.module.css';

export default class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Layaut>
          <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/' exact component={BurgerBuilder} />
          </Switch>
        </Layaut>
      </div>
    );
  }
}
