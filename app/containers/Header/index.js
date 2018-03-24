/**
*
* Header
*
*/

import React from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';


class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = { activeItem: this.props.location.pathname };

  getChildContext() {
    return {
      router: {
        ...this.context.router,
        route: {
          location: this.props.location || this.context.router.route.location,
          match: this.state.match,
        },
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ activeItem: nextProps.location.pathname });
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: `/${name}` });
    this.props.history.push(`/${name}`);
  }
  render() {
    console.log(this.props);
    const { activeItem } = this.state;
    // const { match, location, history } = this.props;
    return (
      <Menu>
        <Menu.Item name="home" active={activeItem === '/' || activeItem === '/home'} onClick={this.handleItemClick} />
        <Menu.Item name="signin" active={activeItem === '/signin'} onClick={this.handleItemClick} />
        {/* <Menu.Item name="friends" active={activeItem === 'friends'} onClick={this.handleItemClick} /> */}
      </Menu>
    );
  }
}

Header.childContextTypes = {
  router: PropTypes.object,
};

Header.propTypes = {
  // match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

// function mapStateToProps(state) {
//   return {
//     signin: state.get('signin').toObject(),
//   };
// }

// const withConnect = connect(mapStateToProps);

export default withRouter(Header);

// function mapStateToProps(state) {
//   return {
//     signin: state.get('signin'),
//   };
// }

// const withConnect = connect(mapStateToProps);

// export default withRouter(withConnect(Header));
