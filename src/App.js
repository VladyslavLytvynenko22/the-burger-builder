import * as actions from './store/actions/index';

import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Auth from './containers/Auth/Auth';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Layaut from './hoc/Layaout/Layaout';
import Logout from './containers/Auth/Logout/Logout';
import Orders from './containers/Orders/Orders';
import classes from './App.module.css';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAuthSignup: () => dispatch(actions.authCheckSate()),
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(
    class App extends Component {
      componentDidMount() {
        this.props.onTryAuthSignup();
      }

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
  )
);
