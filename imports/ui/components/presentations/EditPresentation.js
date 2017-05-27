import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { browserHistory, Link } from 'react-router';

// collections
import PresentationsCollection from './../../../api/presentations';

// components
import ModalNewStudent from './../students/NewStudent';

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
    const { presentation } = this.props;
    const currentPresentationId = presentation ? presentation._id : undefined;
    const prevPresentationId = prevProps.presentation ? prevProps.presentation._id : undefined;

    if (currentPresentationId && currentPresentationId !== prevPresentationId) {
      this.setState({
        title: presentation.title,
        body: presentation.body,
      });
    }
  }

  handleTitleChange(e) {
    const { presentation } = this.props;
    const title = e.target.value;
    this.setState({ title });
    this.props.call('presentations.update', presentation._id, {
      title,
    });
  }

  handleBodyChange(e) {
    const { presentation } = this.props;
    const body = e.target.value;
    this.setState({ body });
    this.props.call('presentations.update', presentation._id, {
      body,
    });
  }

  handleDeletePresentation() {
    const { presentation } = this.props;
    this.props.call('presentations.remove', presentation._id);
    this.props.browserHistory.push('/presentations');
  }

  render() {
    const { presentation } = this.props;
    const { title, body } = this.state;
    if (presentation) {
      return (
        <div className="editor">
         <input
           type="text"
           className="editor__title"
           value={title}
           placeholder="Presentation Title"
           onChange={this.handleTitleChange.bind(this)} />
         <textarea
           value={body}
           className="editor__body"
           placeholder="Enter Names of Presenters here (separate with spaces)"
           onChange={this.handleBodyChange.bind(this)} />
         <div>
           <button
             className="button button--default"
             onClick={this.handleDeletePresentation.bind(this)}>
             Delete
           </button>
           <ModalNewStudent presentationId={presentation._id}/>
           <Link
             to="/students"
             onClick={ () => { Session.set('presentationId', presentation._id); }}
            >
              View Students
            </Link>
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
