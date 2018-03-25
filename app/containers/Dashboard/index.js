/**
 *
 * Dashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Card } from 'semantic-ui-react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import { userdataRequest } from './actions';

export class Dashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.dispatch(userdataRequest());
  }
  render() {
    return (
      <div>
        <Card>
          <Card.Content>
            <Card.Header>
              Profile
            </Card.Header>
            <Card.Description>
              <p>Username - {this.props.dashboard.username}</p>
              <p>Email - {this.props.dashboard.email || '<Empty>'}</p>
              <p>First Name - {this.props.dashboard.first_name || '<Empty>'}</p>
              <p>Last Name - {this.props.dashboard.last_name || '<Empty>'}</p>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dashboard: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Dashboard);
