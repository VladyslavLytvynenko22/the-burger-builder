import * as burgerBuilderActions from './../../store/actions/index';

import React, { Component } from 'react';

import Aux from './../../hoc/Auxiliary/Auxiliary';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from './../../axios-orders';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) =>
      dispatch(burgerBuilderActions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) =>
      dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withErrorHandler(
    class BurgerBuilder extends Component {
      state = {
        purchasing: false,
      };

      componentDidMount() {
        this.props.onInitIngredients();
      }

      updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
          .map((igKey) => {
            return ingredients[igKey];
          })
          .reduce((sum, el) => {
            return sum + el;
          }, 0);

        return sum > 0;
      }

      purchaseHandler = () => {
        this.setState({
          purchasing: true,
        });
      };

      purchaseCancelHandler = () => {
        this.setState({
          purchasing: false,
        });
      };

      purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
      };

      render() {
        const disabledInfo = {
          ...this.props.ingredients,
        };

        for (let key in disabledInfo) {
          disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? (
          <p>Ingredients can't be loaded</p>
        ) : (
          <Spinner />
        );

        if (this.props.ingredients) {
          burger = (
            <Aux>
              <Burger ingredients={this.props.ingredients} />
              <BuildControls
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemove={this.props.onIngredientRemoved}
                disabled={disabledInfo}
                price={this.props.totalPrice}
                purchaseable={this.updatePurchaseState(this.props.ingredients)}
                ordered={this.purchaseHandler}
              />
            </Aux>
          );

          orderSummary = (
            <OrderSummary
              ingredients={this.props.ingredients}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}
              price={this.props.totalPrice}
            />
          );
        }

        return (
          <Aux>
            <Modal
              show={this.state.purchasing}
              modalClosed={this.purchaseCancelHandler}>
              {orderSummary}
            </Modal>
            {burger}
          </Aux>
        );
      }
    },
    axios
  )
);
