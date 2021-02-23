import * as actionTypes from './../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const mewOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(mewOrder),
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reducer;
