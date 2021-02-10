import React from 'react';

import Aux from './../../hoc/Auxiliary';

const layaout = (props) => (
  <Aux>
    <div>Toolbar, SideDrawer, Baxkdrop</div>
    <main>{props.children}</main>
  </Aux>
);

export default layaout;