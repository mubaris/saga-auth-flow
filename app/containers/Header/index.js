/**
*
* Header
*
*/

import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
      <Menu secondary>
        <Menu.Item name="home" active={activeItem === '/' || activeItem === '/home'} onClick={this.handleItemClick} />
        <Menu.Menu position="right">
          {/* <Menu.Item name="signin" active={activeItem === '/signin'} onClick={this.handleItemClick} /> */}
          {!this.props.isAuthenticated &&
            <Menu.Item>
              <Button primary name="signin" onClick={this.handleItemClick}>Sign In</Button>
            </Menu.Item>
          }
          {!this.props.isAuthenticated &&
            <Menu.Item>
              <Button secondary name="signup" onClick={this.handleItemClick}>Sign Up</Button>
            </Menu.Item>
          }
          {this.props.isAuthenticated &&
            <Menu.Item>
              <Button primary name="signout" onClick={this.handleItemClick}>Sign Out</Button>
            </Menu.Item>
          }
        </Menu.Menu>
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
  isAuthenticated: PropTypes.bool,
};

// function mapStateToProps(state) {
//   return {
//     signin: state.get('signin').toObject(),
//   };
// }

// const withConnect = connect(mapStateToProps);

// export default withRouter(Header);

function mapStateToProps(state) {
  return {
    isAuthenticated: state.getIn(['global', 'isAuthenticated']),
  };
}

const withConnect = connect(mapStateToProps);

export default withRouter(withConnect(Header));
