import * as actions from './store/actions/index';

import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layaut from './hoc/Layaout/Layaout';
import Logout from './containers/Auth/Logout/Logout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import classes from './App.module.css';
import { connect } from 'react-redux';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAuthSignup: () => dispatch(actions.authCheckSate()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class App extends Component {
      componentDidMount() {
        this.props.onTryAuthSignup();
      }

      render() {
        let routes = (
          <Switch>
            <Route path='/auth' component={asyncAuth} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/' />
          </Switch>
        );

        if (this.props.isAuthenticated) {
          routes = (
            <Switch>
              <Route path='/checkout' component={asyncCheckout} />
              <Route path='/orders' component={asyncOrders} />
              <Route path='/auth' component={asyncAuth} />
              <Route path='/logout' component={Logout} />
              <Route path='/' exact component={BurgerBuilder} />
              <Redirect to='/' />
            </Switch>
          );
        }

        return (
          <div className={classes.App}>
            <Layaut>{routes}</Layaut>
          </div>
        );
      }
    }
  )
);
