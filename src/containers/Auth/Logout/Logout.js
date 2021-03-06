import * as actions from './../../../store/actions/index';

import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(
  class Logout extends Component {
    componentDidMount() {
      this.props.onLogout();
    }

    render() {
      return <Redirect to='/' />;
    }
  }
);
