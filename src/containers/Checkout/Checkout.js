import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(
  class Checkout extends Component {
    checkoutContinuedHandler = () => {
      this.props.history.replace('/checkout/contact-data');
    };

    checkoutCancelledHandler = () => {
      this.props.history.goBack();
    };

    render() {
      const summary =
        this.props.purchased || !this.props.ingredients ? (
          <Redirect to='/' />
        ) : (
          <div>
            <CheckoutSummary
              ingredients={this.props.ingredients}
              checkoutContinued={this.checkoutContinuedHandler}
              checkoutCancelled={this.checkoutCancelledHandler}
            />
            <Route
              path={this.props.match.path + '/contact-data'}
              component={ContactData}
            />
          </div>
        );
      return <div>{summary}</div>;
    }
  }
);
