import React, { Component } from 'react';

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
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
      return (
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
    }
  }
);
