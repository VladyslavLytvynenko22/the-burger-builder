import React, { Component } from 'react';

import Aux from './../../hoc/Auxiliary';
import classes from './Layaout.module.css';
import Toolbar from './../Navigation/Toolbar/Toolbar';
import SlideDrawer from './../Navigation/SideDrawer/SideDrawer';

class Layaout extends Component {
  state = {
    showSlideDrawer: true,
  };

  slideDrawerClosedHandler = () => {
    this.setState({ showSlideDrawer: false });
  };

  render() {
    return (
      <Aux>
        <Toolbar />
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
