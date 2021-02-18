import Burger from '../../Burger/Burger';
import Button from './../../UI/Button/Button';
import React from 'react';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div className={classes.Checkout}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType='Danger' clicked>
        CANCEL
      </Button>
      <Button btnType='Success' clicked>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
