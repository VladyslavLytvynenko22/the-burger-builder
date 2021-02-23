import React, { Component } from 'react';

import Order from './../../components/Order/Order';
import axios from './../../axios-orders';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

export default withErrorHandler(
  class Orders extends Component {
    state = {
      orders: [],
      loading: true,
    };

    render() {
      return (
        <div>
          {this.state.orders.map((order) => (
            <Order
              key={order.key}
              ingredients={order.ingredients}
              price={+order.price}
            />
          ))}
        </div>
      );
    }
  },
  axios
);
