import React from 'react';

import Aux from './../../hoc/Auxiliary';
import classes from './Layaout.module.css';
import Toolbar from './../Navigation/Toolbar/Toolbar';
import SlideDraw from './../Navigation/SideDrawer/SideDrawer';

const layaout = (props) => (
  <Aux>
    <Toolbar />
    <SlideDraw />
    <main className={classes.Content}>{props.children}</main>
  </Aux>
);

export default layaout;
