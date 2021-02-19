import NavigationItem from './NavigationItem/NavigationItem';
import React from 'react';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/' exact>
      Burger Builder
    </NavigationItem>
    <NavigationItem link='/orders'>Orders</NavigationItem>
  </ul>
);

export default navigationItems;
