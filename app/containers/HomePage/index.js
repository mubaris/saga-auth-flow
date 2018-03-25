/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';
import { ToastContainer, toast } from 'react-toastify';
// import { toast } from 'react-toastify';
import messages from './messages';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    if (this.props.history.location.state) {
      toast(this.props.history.location.state.message);
    }
  }
  render() {
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        {this.props.history.location.state &&
        <ToastContainer autoClose={3000} />
        }
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.shape(historyPropTypes),
};
