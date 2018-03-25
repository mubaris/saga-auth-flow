/**
 *
 * ProtectedRoutes
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/home', state: { from: props.location } }} />}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
  authenticated: PropTypes.bool,
  rest: PropTypes.any,
  location: PropTypes.any,
};


export class ProtectedRoutes extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Switch>
        <PrivateRoute exact path="/dashboard" component={HomePage} authenticated={this.props.isAuthenticated} />
        <PrivateRoute exact path="/notes" component={HomePage} authenticated={this.props.isAuthenticated} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

ProtectedRoutes.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.getIn(['global', 'isAuthenticated']),
  };
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(ProtectedRoutes);
