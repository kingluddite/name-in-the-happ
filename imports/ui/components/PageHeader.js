import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';


class PageHeader extends Component {

  renderSlogan() {
    if (this.props.slogan) {
      return <h2>{this.props.slogan}</h2>;
    }
  }
  render() {
    return (
      <header className="header">
        <div className="wrapper">
          <h1><Link to="/">{this.props.title}</Link></h1>
          <h2 className="header__slogan">{this.renderSlogan()}</h2>
        </div>
      </header>
    );
  }
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  slogan: PropTypes.string
}

PageHeader.defaultProps = {
  title: 'Name from the Happ'
}

export default PageHeader;