import React from 'react';
import classes from './Input.module.css';

export default function input(props) {
  let inputElement = null;

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          onChange={() => {}}
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          onChange={() => {}}
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          onChange={() => {}}
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}>
          {props.elementConfig.options.map((option, id) => (
            <option key={id} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          onChange={() => {}}
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}
