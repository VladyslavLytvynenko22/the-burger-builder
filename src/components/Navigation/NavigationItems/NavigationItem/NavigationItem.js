import { NavLink } from 'react-router-dom';
import React from 'react';
import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
  <li className={classes.NavigarionItem}>
    <NavLink
      to={props.link}
      activeClassName={classes.active}
      exact={props.exact}>
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
