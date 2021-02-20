import React, { Component } from 'react';

import Button from './../../../components/UI/Button/Button';
import Input from './../../../components/UI/Input/Input';
import Spinner from './../../../components/UI/Spinner/Spinner';
import axios from './../../../axios-orders';
import classes from './ContactData.module.css';

export default class ContactData extends Component {
  state = {
    orderForm: {
      name: this.getInputTypeObject('text', 'Your Name', ''),
      street: this.getInputTypeObject('text', 'Street', ''),
      zipCode: this.getInputTypeObject('text', 'ZIP Code', ''),
      country: this.getInputTypeObject('text', 'Country', ''),
      email: this.getInputTypeObject('email', 'Your E-Mail', ''),
      deliveryMethod: this.getSelectTypeOdject(['Fastest', 'Cheapest'], ''),
    },
    loading: false,
  };

  getInputTypeObject(type, placeholder, value) {
    return {
      elementType: 'input',
      elementConfig: {
        type: type,
        placeholder: placeholder,
      },
      value: value,
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
    }

    return {
      elementType: 'select',
      elementConfig: {
        options: options,
      },
      value: value,
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
      price: Number.parseFloat(this.props.price).toFixed(2),
      orderData: formData,
    };
    axios.post('/orders.json', order).finally(() => {
      this.setState({
        loading: false,
      });
      this.props.history.push('/');
    });
  };

  inputChangedHandlet = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
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
            changed={(event) => this.inputChangedHandlet(event, formElement.id)}
          />
        ))}
        <Button btnType='Success'>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}
