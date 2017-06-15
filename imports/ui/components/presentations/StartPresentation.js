import React, { Component } from 'react';

export class StartPresentation extends Component {

  render() {
    return (
      <div>
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
