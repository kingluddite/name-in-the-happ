import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

// collections
import SectionsCollection from './../../../api/sections';
import PresentationsCollection from './../../../api/presentations';

// components
import ModalNewStudent from './../students/ModalNewStudent';

export class EditPresentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      startDate: moment(),
    };

    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    // working with moment
      // schema should be type: Date
      // when saving, do yourMoment.toDate() and save that
      // when retrieving, do moment(savedValue) to go back to a moment object
    const { presentation } = this.props;
    const currentPresentationId = presentation ? presentation._id : undefined;
    const prevPresentationId = prevProps.presentation ? prevProps.presentation._id : undefined;

    if (currentPresentationId && currentPresentationId !== prevPresentationId) {
      this.setState({
        title: presentation.title,
        body: presentation.body,
        startDate: moment(presentation.startDate),
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

  handleDateChange(startDate) {
    this.setState({ startDate });
    this.props.call('presentations.update', this.props.presentation._id, {
      startDate: startDate.toDate(),
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
    const { presentation, section } = this.props;

    if (presentation) {
      return (
        <div className="editor">
         {/* <span>{section.name}</span> */}
         <input
           type="text"
           className="editor__title"
           value={this.state.title}
           ref={ (input) => { this.title = input; }}
           placeholder="Presentation Title"
           onChange={this.handleTitleChange.bind(this)} />
           <DatePicker
             selected={this.state.startDate}
             onChange={this.handleDateChange}
             placeholder="Start Date"
             value={presentation.startDate}
             ref={ (input) => { this.startDate = input; }}
           />
         <textarea
           value={this.state.body}
           className="editor__body"
           placeholder="Enter Names of Presenters here (separate with spaces)"
           onChange={this.handleBodyChange.bind(this)} />
         <div className="editor__button--container">
           <Link
             to={`/presentations/${presentation._id}/watch`}
             className="button button--pill"
             onClick={ () => { Session.set('presentationId', presentation._id); }}
             >
               View Presentation
             </Link>
           <ModalNewStudent presentationId={presentation._id}/>
           <Link
             to="/students"
             className="button button--pill"
             onClick={ () => { Session.set('presentationId', presentation._id); }}
            >
              View Students
            </Link>
            <button
              className="button button--default"
              onClick={this.handleDeletePresentation.bind(this)}>
              Delete
            </button>
         </div>
       </div>
      );
    }
    return (
      <div className="editor">
        {/* <span>{section.name}</span> */}
        <p className="editor__message">
          { this.props.selectedPresentationId ? 'Presentation not found.' : 'Pick or create a presentation to get started.'}
        </p>
      </div>
    );
  }
}

EditPresentation.propTypes = {
  selectedPresentationId: PropTypes.string,
  section: PropTypes.object,
  presentation: PropTypes.object,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired,
};

export default createContainer(({ sectionId }) => {
  const selectedPresentationId = Session.get('selectedPresentationId');
  // const sectionId = this.props.sectionId;
  console.log(sectionId);
  Meteor.subscribe('sectionsPublication', sectionId);

  return {
    selectedPresentationId,
    section: SectionsCollection.findOne(sectionId),
    presentation: PresentationsCollection.findOne(selectedPresentationId),
    call: Meteor.call,
    browserHistory,
  };
}, EditPresentation);
