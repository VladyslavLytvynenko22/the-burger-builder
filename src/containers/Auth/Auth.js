import * as actions from './../../store/actions/index';

import React, { Component } from 'react';

import Button from './../../components/UI/Button/Button';
import Input from './../../components/UI/Input/Input';
import { Redirect } from 'react-router-dom';
import Spinner from './../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import { updateObject } from './../../shared/utility';

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.idToken !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class Auth extends Component {
    state = {
      controls: {
        email: this.getInputTypeObject('email', 'Mail Addres', '', {
          required: true,
          isEmail: true,
        }),
        password: this.getInputTypeObject('password', 'Password', '', {
          required: true,
          minLength: 6,
        }),
      },
      formIsValid: false,
      isSignup: true,
    };

    componentDidMount() {
      if (!this.props.building && this.props.authRedirectPath !== '/') {
        this.props.onSetAuthRedirectPath();
      }
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
      const updatedControls = updateObject(this.state.controls, {
        [controlName]: updateObject(this.state.controls[controlName], {
          value: event.target.value,
          valid: this.checkValidity(
            event.target.value,
            this.state.controls[controlName].validation
          ),
          touched: true,
        }),
      });

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
        this.state.controls.password.value,
        this.state.isSignup
      );
    };

    switchAuthModeHandler = (event) => {
      event.preventDefault();
      this.setState((prevState) => {
        return { isSignup: !prevState.isSignup };
      });
    };

    render() {
      if (this.props.isAuthenticated)
        return <Redirect to={this.props.authRedirectPath} />;

      const formElementsArray = [];
      for (const key in this.state.controls) {
        formElementsArray.push({
          id: key,
          config: this.state.controls[key],
        });
      }
      const form = this.props.loading ? (
        <Spinner />
      ) : (
        formElementsArray.map((formElement) => (
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
        ))
      );

      const errorMessage = this.props.error ? (
        <p>{this.props.error.message}</p>
      ) : null;

      return (
        <div className={classes.Auth}>
          {errorMessage}
          <form onSubmit={this.submitHandler}>
            {form}
            <Button btnType='Success' disabled={!this.state.formIsValid}>
              {this.state.isSignup ? 'SIGUP' : 'SIGIN'}
            </Button>
            <Button btnType='Danger' clicked={this.switchAuthModeHandler}>
              {this.state.isSignup ? 'SWITCH TO SIGIN' : 'SWITCH TO SIGUP'}
            </Button>
          </form>
        </div>
      );
    }
  }
);
