import * as actions from './store/actions/index';

import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import Auth from './containers/Auth/Auth';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Layaut from './hoc/Layaout/Layaout';
import Logout from './containers/Auth/Logout/Logout';
import Orders from './containers/Orders/Orders';
import classes from './App.module.css';
import { connect } from 'react-redux';

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
            <Route path='/auth' component={Auth} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/' />
          </Switch>
        );

        if (this.props.isAuthenticated) {
          routes = (
            <Switch>
              <Route path='/checkout' component={Checkout} />
              <Route path='/orders' component={Orders} />
              <Route path='/auth' component={Auth} />
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
