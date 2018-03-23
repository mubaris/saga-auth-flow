/**
*
* Header
*
*/

import React from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';


class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = { activeItem: this.props.location.pathname };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: `/${name}` });
    this.props.history.push(`/${name}`);
  }
  render() {
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

Header.propTypes = {
  // match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(Header);
