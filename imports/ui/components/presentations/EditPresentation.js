import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

// collections
import PresentationsCollection from './../../../api/presentations';

export class EditPresentation extends Component {
  handleTitleChange(event) {
    this.props.call('presentations.update', this.props.presentation._id, {
      title: event.target.value,
    });
  }

  handleBodyChange(event) {
    this.props.call('presentations.update', this.props.presentation._id, {
      body: event.target.value,
    });
  }


  render() {
    if (this.props.presentation) {
      return (
        <div>
         <input
           type="text"
           value={this.props.presentation.title}
           placeholder="title"
           onChange={this.handleTitleChange.bind(this)} />
         <textarea
           value={this.props.presentation.body}
           placeholder="Your presentation here" onChange={this.handleBodyChange.bind(this)} />
         <button className="button">Delete Presentation</button>
       </div>
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
  call: PropTypes.func.isRequired,
};

export default createContainer(() => {
  const selectedPresentationId = Session.get('selectedPresentationId');

  return {
    selectedPresentationId,
    presentation: PresentationsCollection.findOne(selectedPresentationId),
    call: Meteor.call,
  };
}, EditPresentation);
