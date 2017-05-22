import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';

// collections
import PresentationsCollection from './../../../api/presentations';

export class EditPresentation extends Component {
  render() {
    if (this.props.presentation) {
      return (
         <p>We got the presentation!</p>
      );
    }
    return (
      <p>
        { this.props.selectedPresentationId ? 'Presentation not found.' : 'Pick or create a presentation to get started.'}
      </p>
    );
  }
}

EditPresentation.propTypes = {
  selectedPresentationId: PropTypes.string,
  presentation: PropTypes.object,
};

export default createContainer(() => {
  const selectedPresentationId = Session.get('selectedPresentationId');

  return {
    selectedPresentationId,
    presentation: PresentationsCollection.findOne(selectedPresentationId),
  };
}, EditPresentation);
