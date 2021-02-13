import React, { Component } from 'react';

import Aux from './../../hoc/Auxiliary/Auxiliary';
import classes from './Layaout.module.css';
import Toolbar from './../../components/Navigation/Toolbar/Toolbar';
import SlideDrawer from './../../components/Navigation/SideDrawer/SideDrawer';

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
        <Toolbar drawerToggleClicked={this.slideDrawerOpenHandler} />
        <SlideDrawer
          open={this.state.showSlideDrawer}
          closed={this.slideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layaout;
