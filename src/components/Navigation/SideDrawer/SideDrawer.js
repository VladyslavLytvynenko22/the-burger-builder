import React from 'react';

import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';
import classes from './SideDraw.module.css';

const slideDrawer = () => {
  return (
    <div className={classes.SlideDraw}>
      <Logo />
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default slideDrawer;
