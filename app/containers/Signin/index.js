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
import { Grid, Message } from 'semantic-ui-react';
import { history as historyPropTypes } from 'history-prop-types';
// import { Map } from 'immutable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// import makeSelectSignin from './selectors';
import { makeSelectSignin, makeAuthState } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { signinRequest } from './actions';
import SigninForm from './SigninForm';

export class Signin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  submit = (values) => {
    const val = values.toObject();
    const { username, password } = val;
    const { history } = this.props;
    this.props.dispatch(signinRequest({ username, password, history }));
  }
  render() {
    // console.log(this.props);
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <SigninForm onSubmit={this.submit}>
            { this.props.signin.error &&
            <Message negative>
              <Message.Header>There was an error in submitting the form</Message.Header>
              <p>{this.props.signin.error}</p>
            </Message>
            }
          </SigninForm>
          {/* {this.props.signin.error} */}
        </Grid.Column>
      </Grid>
    );
  }
}

Signin.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape(historyPropTypes),
  signin: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  signin: makeSelectSignin(),
  isAuthenticated: makeAuthState(),
});

// const mapStateToProps = (state) => state.toJS();

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
