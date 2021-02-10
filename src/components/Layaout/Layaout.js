import React from 'react';

import Aux from './../../hoc/Auxiliary';
import classes from './Layaout.module.css';

const layaout = (props) => (
  <Aux>
    <div>Toolbar, SideDrawer, Baxkdrop</div>
    <main className={classes.Content}>{props.children}</main>
  </Aux>
);

export default layaout;
