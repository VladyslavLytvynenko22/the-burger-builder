import * as actions from './../../store/actions/index';

import React, { Component } from 'react';

import Button from './../../components/UI/Button/Button';
import Input from './../../components/UI/Input/Input';
import classes from './Auth.module.css';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(
  class Auth extends Component {
    state = {
      controls: {
        email: this.getInputTypeObject('email', 'Mail Addres', '', {
          required: true,
          isEmail: true,
        }),
        password: this.getInputTypeObject('input', 'Password', '', {
          required: true,
          minLength: 6,
        }),
      },
      formIsValid: false,
    };

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

    inputChangedHandlet = (event, controlName) => {
      const updatedControls = {
        ...this.state.controls,
        [controlName]: {
          ...this.state.controls[controlName],
          value: event.target.value,
          valid: this.checkValidity(
            event.target.value,
            this.state.controls[controlName].validation
          ),
          touched: true,
        },
      };

      let formIsValid = true;
      for (const inputIdentifier in updatedControls) {
        formIsValid =
          (updatedControls[inputIdentifier].valid ||
            !updatedControls[inputIdentifier].validation) &&
          formIsValid;
      }

      this.setState({
        controls: updatedControls,
        formIsValid: formIsValid,
      });
    };

    submitHandler = (event) => {
      event.preventDefault();
      this.props.onAuth(
        this.state.controls.email.value,
        this.state.controls.password.value
      );
    };

    render() {
      const formElementsArray = [];
      for (const key in this.state.controls) {
        formElementsArray.push({
          id: key,
          config: this.state.controls[key],
        });
      }
      const form = formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={(event) => this.inputChangedHandlet(event, formElement.id)}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
        />
      ));
      return (
        <div className={classes.Auth}>
          <form onSubmit={this.submitHandler}>
            {form}
            <Button btnType='Success' disabled={!this.state.formIsValid}>
              SUBBMIT
            </Button>
          </form>
        </div>
      );
    }
  }
);
