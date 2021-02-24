import Aux from './../../../hoc/Auxiliary/Auxiliary';
import BackDrop from './../../UI/Backdrop/Backdrop';
import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';
import React from 'react';
import classes from './SideDraw.module.css';

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
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </Aux>
  );
};

export default slideDrawer;
