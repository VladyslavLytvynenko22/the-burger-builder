import React, { Component } from 'react';

import Aux from './../../hoc/Auxiliary/Auxiliary';
import SlideDrawer from './../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from './../../components/Navigation/Toolbar/Toolbar';
import classes from './Layaout.module.css';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null,
  };
};

export default connect(mapStateToProps)(
  class Layaout extends Component {
    state = {
      showSlideDrawer: false,
    };

    slideDrawerClosedHandler = () => {
      this.setState({ showSlideDrawer: false });
    };

    slideDrawerOpenHandler = () => {
      this.setState((prevState) => ({
        showSlideDrawer: !prevState.showSlideDrawer,
      }));
    };

    render() {
      return (
        <Aux>
          <Toolbar
            drawerToggleClicked={this.slideDrawerOpenHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
          <SlideDrawer
            open={this.state.showSlideDrawer}
            closed={this.slideDrawerClosedHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
          <main className={classes.Content}>{this.props.children}</main>
        </Aux>
      );
    }
  }
);
