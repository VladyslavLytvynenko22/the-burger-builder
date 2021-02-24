import * as actions from './../../store/actions/index';

import React, { Component } from 'react';

import Order from './../../components/Order/Order';
import Spinner from './../../components/UI/Spinner/Spinner';
import axios from './../../axios-orders';
import { connect } from 'react-redux';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    idToken: state.auth.idToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (idToken) => dispatch(actions.fetchOrders(idToken)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withErrorHandler(
    class Orders extends Component {
      componentDidMount() {
        this.props.onFetchOrders(this.props.idToken);
      }

      render() {
        const orders = this.props.loading ? (
          <Spinner />
        ) : (
          this.props.orders.map((order) => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={+order.price}
            />
          ))
        );
        return <div>{orders}</div>;
      }
    },
    axios
  )
);
