/**
 *
 * Signin
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from 'semantic-ui-react';
// import { Map } from 'immutable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSignin from './selectors';
import reducer from './reducer';
import saga from './saga';
import { signinRequest } from './actions';
import SigninForm from './SigninForm';

export class Signin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  submit = (values) => {
    const val = values.toObject();
    const { username, password } = val;
    this.props.dispatch(signinRequest({ username, password }));
  }
  render() {
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <SigninForm onSubmit={this.submit} />
        </Grid.Column>
      </Grid>
    );
  }
}

Signin.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  signin: makeSelectSignin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'signin', reducer });
const withSaga = injectSaga({ key: 'signin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Signin);
