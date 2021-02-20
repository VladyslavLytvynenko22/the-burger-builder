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
      for (const option in optionValues) {
        options.push({
          calue: option.toLowerCase(),
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
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {},
      deliveryMethod: 'fastest',
    };
    axios.post('/orders.json', order).finally(() => {
      this.setState({
        loading: false,
      });
      this.props.history.push('/');
    });
  };

  render() {
    let form = (
      <form>
        <Input elementType='input' elementConfig='text' value='name' />
        <Input
          inputtype='input'
          type='email'
          name='email'
          placeholder='Your Mail'
        />
        <Input
          inputtype='input'
          type='text'
          name='street'
          placeholder='Street'
        />
        <Input
          inputtype='input'
          type='text'
          name='postal'
          placeholder='Postal'
        />
        <Button btnType='Success' clicked={this.orderHandler}>
          ORDER
        </Button>
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
