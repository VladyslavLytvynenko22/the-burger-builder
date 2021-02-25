import * as actions from './../../../store/actions/index';

import React, { Component } from 'react';

import Button from './../../../components/UI/Button/Button';
import Input from './../../../components/UI/Input/Input';
import Spinner from './../../../components/UI/Spinner/Spinner';
import axios from './../../../axios-orders';
import classes from './ContactData.module.css';
import { connect } from 'react-redux';
import { updateObject } from './../../../shared/utility';
import withErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler';

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    idToken: state.auth.idToken,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, idToken) =>
      dispatch(actions.purchaseBurger(orderData, idToken)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withErrorHandler(
    class ContactData extends Component {
      state = {
        orderForm: {
          name: this.getInputTypeObject('text', 'Your Name', '', {
            required: true,
          }),
          street: this.getInputTypeObject('text', 'Street', '', {
            required: true,
          }),
          zipCode: this.getInputTypeObject('text', 'ZIP Code', '', {
            required: true,
            minLength: 5,
            maxLength: 5,
          }),
          country: this.getInputTypeObject('text', 'Country', '', {
            required: true,
          }),
          email: this.getInputTypeObject('email', 'Your E-Mail', '', {
            required: true,
            isEmail: true,
          }),
          deliveryMethod: this.getSelectTypeOdject(
            ['Fastest', 'Cheapest'],
            'fastest'
          ),
        },
        formIsValid: false,
      };

      checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
          isValid = value.trim() !== '';
        }
        if (rules.minLength && isValid) {
          isValid = value.length >= rules.minLength;
        }
        if (rules.maxLength && isValid) {
          isValid = value.length <= rules.maxLength;
        }
        if (rules.isEmail && isValid) {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          isValid = pattern.test(String(value).toLowerCase());
        }
        return isValid;
      }

      getInputTypeObject(type, placeholder, value, validations) {
        return {
          elementType: 'input',
          elementConfig: {
            type: type,
            placeholder: placeholder,
          },
          value: value,
          validation: {
            ...validations,
          },
          valid: false,
          touched: false,
        };
      }

      getSelectTypeOdject(optionValues, value) {
        let options = [];
        if (optionValues && optionValues.length > 0) {
          for (const option of optionValues) {
            options.push({
              value: option.toLowerCase(),
              displayValue: option,
            });
          }
          if (value || value === '') {
            value = optionValues[0].toLowerCase();
          }
        }

        return {
          elementType: 'select',
          elementConfig: {
            options: options,
          },
          value: value,
          touched: false,
        };
      }

      orderHandler = (event) => {
        event.preventDefault();

        this.setState({
          loading: true,
        });
        const formData = {};
        for (const formElementIdentifier in this.state.orderForm) {
          formData[formElementIdentifier] = this.state.orderForm[
            formElementIdentifier
          ].value;
        }
        const order = {
          ingredients: this.props.ingredients,
          price: Number.parseFloat(this.props.totalPrice).toFixed(2),
          orderData: formData,
          userId: this.props.userId,
        };
        this.props.onOrderBurger(order, this.props.idToken);
      };

      inputChangedHandlet = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(
          this.state.orderForm[inputIdentifier],
          {
            value: event.target.value,
            valid: this.state.orderForm[inputIdentifier].validation
              ? this.checkValidity(
                  event.target.value,
                  this.state.orderForm[inputIdentifier].validation
                )
              : this.state.orderForm[inputIdentifier].valid,
            touched: true,
          }
        );
        const updatedOrderForm = updateObject(this.state.orderForm, {
          [inputIdentifier]: updatedFormElement,
        });

        let formIsValid = true;
        for (const inputIdentifier in updatedOrderForm) {
          formIsValid =
            (updatedOrderForm[inputIdentifier].valid ||
              !updatedOrderForm[inputIdentifier].validation) &&
            formIsValid;
        }
        this.setState({
          orderForm: updatedOrderForm,
          formIsValid: formIsValid,
        });
      };

      render() {
        const formElementsArray = [];
        for (const key in this.state.orderForm) {
          formElementsArray.push({
            id: key,
            config: this.state.orderForm[key],
          });
        }

        let form = (
          <form onSubmit={this.orderHandler}>
            {formElementsArray.map((formElement) => (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) =>
                  this.inputChangedHandlet(event, formElement.id)
                }
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
              />
            ))}
            <Button btnType='Success' disabled={!this.state.formIsValid}>
              ORDER
            </Button>
          </form>
        );
        if (this.props.loading) {
          form = <Spinner />;
        }
        return (
          <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
          </div>
        );
      }
    },
    axios
  )
);
