import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';

// collections
import PresentationsCollection from './../../../api/presentations';

export class ViewPresentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    };
  }

  render() {
    if (this.props.presentation) {
      return (
        <div className="editor">
          <h1>Presentation Title</h1>
          <p>Names in Presentation</p>
        </div>
        );
    }
    return (
      <div className="editor">
        <p className="editor__message">
          { this.props.selectedPresentationId ? 'Presentation not found.' : 'Pick or create a presentation to get started.' }
        </p>
      </div>
      );
  }
}

ViewPresentation.propTypes = {
  selectedPresentationId: PropTypes.string,
  presentation: PropTypes.object,
};

export default createContainer(() => {
  const selectedPresentationId = Session.get('selectedPresentationId');

  return {
    selectedPresentationId,
    presentation: PresentationsCollection.findOne(selectedPresentationId),
  };
}, ViewPresentation);
