import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Auth from './containers/Auth/Auth';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Layaut from './hoc/Layaout/Layaout';
import Logout from './containers/Auth/Logout/Logout';
import Orders from './containers/Orders/Orders';
import classes from './App.module.css';

export default class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Layaut>
          <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route path='/auth' component={Auth} />
            <Route path='/logout' component={Logout} />
            <Route path='/' exact component={BurgerBuilder} />
          </Switch>
        </Layaut>
      </div>
    );
  }
}
