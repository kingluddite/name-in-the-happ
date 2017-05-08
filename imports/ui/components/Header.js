import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Header extends Component {

  renderSlogan() {
    if (this.props.slogan) {
      return <h2>{this.props.slogan}</h2>;
    }
  }
  render() {
    return (
      <header className="header">
        <div className="wrapper">
          <h1>{this.props.title}</h1>
          <h2 className="header__slogan">{this.renderSlogan()}</h2>
        </div>
      </header>
    );
  }
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  slogan: PropTypes.string
}

Header.defaultProps = {
  title: 'Name from the Happ'
}

export default Header;