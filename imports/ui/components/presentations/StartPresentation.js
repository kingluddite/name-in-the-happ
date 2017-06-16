import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class StartPresentation extends Component {

  render() {
    return (
      <div className="watch--start-button-container">
        <button
          className="button button--start"
          onClick={this.props.startPresentation}>
          Start
        </button>
      </div>
    );
  }
}

StartPresentation.propTypes = {
  startPresentation: PropTypes.func.isRequired,
};

export default StartPresentation;
