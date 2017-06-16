import React, { Component } from 'react';

export class StartPresentation extends Component {

  render() {
    return (
      <div className="watch--start-button-container">
        <button
          className="button button--start"
          onClick={this.props.beginPresentation}>
          Start
        </button>
      </div>
    );
  }
};

export default StartPresentation;
