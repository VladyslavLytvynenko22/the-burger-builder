import React from 'react';

import Aux from './../../hoc/Auxiliary';
import classes from './Layaout.module.css';
import Toolbar from './../Navigation/Toolbar/Toolbar';

const layaout = (props) => (
  <Aux>
    <Toolbar />
    <main className={classes.Content}>{props.children}</main>
  </Aux>
);

export default layaout;
