import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

// collections
import PresentationsCollection from './../../../api/presentations';

export class EditPresentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    };
  }

  // componentDidUpdate(prevProps, prevState) {
  componentDidUpdate(prevProps) {
    const currentPresentationId = this.props.presentation ? this.props.presentation._id : undefined;
    const prevPresentationId = prevProps.presentation ? prevProps.presentation._id : undefined;

    if (currentPresentationId && currentPresentationId !== prevPresentationId) {
      this.setState({
        title: this.props.presentation.title,
        body: this.props.presentation.body,
      });
    }
  }

  handleTitleChange(event) {
    const title = event.target.value;
    this.setState({ title });
    this.props.call('presentations.update', this.props.presentation._id, {
      title,
    });
  }

  handleBodyChange(event) {
    const body = event.target.value;
    this.setState({ body });
    this.props.call('presentations.update', this.props.presentation._id, {
      body,
    });
  }

  handleDeletePresentation() {
    this.props.call('presentations.remove', this.props.presentation._id);
    this.props.browserHistory.push('/presentations');
  }

  render() {
    if (this.props.presentation) {
      return (
        <div className="editor">
         <input
           type="text"
           className="editor__title"
           value={this.state.title}
           placeholder="Presentation Title"
           onChange={this.handleTitleChange.bind(this)} />
         <textarea
           value={this.state.body}
           className="editor__body"
           placeholder="Enter Names of Presenters here (separate with spaces)"
           onChange={this.handleBodyChange.bind(this)} />
         <div>
           <button
             className="button button--default"
             onClick={this.handleDeletePresentation.bind(this)}>
             Delete Presentation
           </button>
         </div>
       </div>
      );
    }
    return (
      <div className="editor">
        <p className="editor__message">
          { this.props.selectedPresentationId ? 'Presentation not found.' : 'Pick or create a presentation to get started.'}
        </p>
      </div>
    );
  }
}

EditPresentation.propTypes = {
  selectedPresentationId: PropTypes.string,
  presentation: PropTypes.object,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const selectedPresentationId = Session.get('selectedPresentationId');

  return {
    selectedPresentationId,
    presentation: PresentationsCollection.findOne(selectedPresentationId),
    call: Meteor.call,
    browserHistory,
  };
}, EditPresentation);
