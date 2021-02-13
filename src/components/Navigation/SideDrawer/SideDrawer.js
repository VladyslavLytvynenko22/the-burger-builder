import React from 'react';

import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';
import classes from './SideDraw.module.css';
import BackDrop from './../../UI/Backdrop/Backdrop';
import Aux from './../../../hoc/Auxiliary';

const slideDrawer = (props) => {
  const backDropClasses = props.open
    ? [classes.SlideDraw, classes.Open].join(' ')
    : [classes.SlideDraw, classes.Close].join(' ');
  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.closed} />
      <div className={backDropClasses}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default slideDrawer;
