import React, { Component } from 'react';

import Button from './../../../components/UI/Button/Button';
import Input from './../../../components/UI/Input/Input';
import Spinner from './../../../components/UI/Spinner/Spinner';
import axios from './../../../axios-orders';
import classes from './ContactData.module.css';

export default class ContactData extends Component {
  state = {
    orderForm: {
      name: this.getInputTypeObject('text', 'Your Name', '', {
        required: true,
      }),
      street: this.getInputTypeObject('text', 'Street', '', { required: true }),
      zipCode: this.getInputTypeObject('text', 'ZIP Code', '', {
        required: true,
        minLength: 5,
        maxLength: 5,
      }),
      country: this.getInputTypeObject('text', 'Country', '', {
        required: true,
      }),
      email: this.getInputTypeObject('email', 'Your E-Mail', ''),
      deliveryMethod: this.getSelectTypeOdject(['Fastest', 'Cheapest'], ''),
    },
    loading: false,
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
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
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
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
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
