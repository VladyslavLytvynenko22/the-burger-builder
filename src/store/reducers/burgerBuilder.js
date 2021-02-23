import * as actionTypes from './../actions/actionTypes';

import { updateObject } from './../utility';

const initTotalPrice = 4;

const initialState = {
  ingredients: null,
  totalPrice: initTotalPrice,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return changeIngredient(action, state, '+');
    case actionTypes.REMOVE_INGREDIENT:
      return changeIngredient(action, state, '-');
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(action, state);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};

const changeIngredient = (action, state, operator) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const totalPrice =
    operator === '-'
      ? state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      : state.totalPrice + INGREDIENT_PRICES[action.ingredientName];
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: totalPrice,
  };
  return updateObject(state, updatedState);
};

const setIngredients = (action, state) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    error: false,
    totalPrice: initTotalPrice,
  });
};

export default reducer;
