/**
 *
 * Signup
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Grid, Message } from 'semantic-ui-react';
import { compose } from 'redux';
import { history as historyPropTypes } from 'history-prop-types';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSignup from './selectors';
import reducer from './reducer';
import saga from './saga';
import { signupRequest, resetError } from './actions';
import SignupForm from './SignupForm';

export class Signup extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.dispatch(resetError());
  }
  submit = (values) => {
    const val = values.toObject();
    const { username, password1, password2 } = val;
    const { history } = this.props;
    this.props.dispatch(signupRequest({ username, password1, password2, history }));
  }
  render() {
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <SignupForm onSubmit={this.submit}>
            { this.props.signup.error &&
            <Message negative>
              <Message.Header>There was an error in submitting the form</Message.Header>
              <p>{this.props.signup.error}</p>
            </Message>
            }
          </SignupForm>
          {/* {this.props.signin.error} */}
        </Grid.Column>
      </Grid>
    );
  }
}

Signup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  signup: PropTypes.object,
  history: PropTypes.shape(historyPropTypes),
};

const mapStateToProps = createStructuredSelector({
  signup: makeSelectSignup(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'signup', reducer });
const withSaga = injectSaga({ key: 'signup', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Signup);
