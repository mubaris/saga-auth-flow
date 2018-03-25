/**
 *
 * Signout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Message, Icon } from 'semantic-ui-react';
import { history as historyPropTypes } from 'history-prop-types';
import { setTimeout } from 'timers';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSignout from './selectors';
import reducer from './reducer';
import saga from './saga';
import { signoutRequest } from './actions';

export class Signout extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { history } = this.props;
    setTimeout(() => {
      this.props.dispatch(signoutRequest({ history }));
    }, 1000);
  }
  render() {
    return (
      <div>
        <Message icon>
          <Icon name="circle notched" loading />
          <Message.Content>
            <Message.Header>Just one second</Message.Header>
            You are signing out.
          </Message.Content>
        </Message>
      </div>
    );
  }
}

Signout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape(historyPropTypes),
};

const mapStateToProps = createStructuredSelector({
  signout: makeSelectSignout(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'signout', reducer });
const withSaga = injectSaga({ key: 'signout', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Signout);
