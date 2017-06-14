import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

// collections
import SectionsCollection from './../../../api/sections';
import PresentationsCollection from './../../../api/presentations';
import StudentsCollection from './../../../api/students';

// components
import Breadcrumbs from './../Breadcrumbs';

export class EditPresentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      startDate: moment(),
      names: [],
      studentCount: 0,
      errors: '',
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
        startDate: moment(presentation.startDate),
      });
    }
  }

  handleTitleChange(event) {
    const { presentation } = this.props;
    const title = event.target.value;
    this.setState({ title });
    this.props.meteorCall('presentations.update', presentation._id, {
      title,
    });
  }

  handleDateChange(startDate) {
    this.setState({ startDate });
    this.props.meteorCall('presentations.update', this.props.presentation._id, {
      startDate: startDate.toDate(),
    });
  }

  handleStudentsSubmit(event) {
    event.preventDefault();
    if (this.state.names.length > 0) {
      const sectionId = this.props.section._id;
      const presentationId = this.props.presentation._id;
      const { names } = this.state;
      const namesArray = names.split(',');

      this.setState({
        errors: '',
      });

      namesArray.map((name) => {

        return this.props.meteorCall('students.insert', name.trim(), sectionId, presentationId, (err) => {
          if (!err) {
            this.names.value = '';
            this.setState({
                names: [],
            });

          } else {
            this.setState({ error: err.reason });
          }
        });
      });
    } else {
      this.setState({
        errors: 'Please suppy a student name before submitting',
      });
    }
  }

  handleStudentNameChanges(event) {
    this.setState({
      names: event.target.value,
    });
  }

  handleViewStudent() {
    const sectionId = this.props.params.sectionId;
    const presentationId = this.props.params.presentationId;
    this.props.browserHistory.push(`/sections/${sectionId}/presentations/${presentationId}/students`);
  }

  handleWatchPresentation() {
    const sectionId = this.props.params.sectionId;
    const presentationId = this.props.params.presentationId;
    this.props.browserHistory.push(`/sections/${sectionId}/presentations/${presentationId}/watch`);
  }

  handleDeletePresentation() {
    const { presentation } = this.props;
    const sectionId = this.props.params.sectionId;
    this.props.meteorCall('presentations.remove', presentation._id);
    this.props.browserHistory.push(`/sections/${sectionId}/presentations`);
  }

  showViewPresentationBtn() {
    if (this.props.studentCount > 3) {
      return (
        <button
          className="button button--pill"
          onClick={this.handleWatchPresentation.bind(this)}
        >
          View Presentation
        </button>
      );
    }
    return (
      <p>Enter At Least 4 students to begin a presenation.</p>
    );
  }

  render() {
    const { presentation, section, studentCount } = this.props;

    if (presentation) {
      return (
        <div className="editor">
          <Breadcrumbs params={this.props.params} /> <span>{section.name}</span>
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
           <div className="editor__students">
             Students In Presentation <span className="editor__students-count">{studentCount}</span>
             <button
               className="button button--pill"
               onClick={this.handleViewStudent.bind(this)}
               >
                View
              </button>
           </div>
           {this.state.errors ? <p className="errors">{this.state.errors}</p> : undefined}
           <form className="form" onSubmit={this.handleStudentsSubmit.bind(this)}>
             <textarea
               placeholder="Enter Student Names Here (separate with spaces)"
               ref={ (textarea) => { this.names = textarea; }}
               onChange={this.handleStudentNameChanges.bind(this)}
               className="editor__body"
               ></textarea>
              <button className="button button--textarea button--pill">Add Students</button>
           </form>
         <div className="editor__button--container">
            {this.showViewPresentationBtn()}
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
          <Breadcrumbs params={this.props.params} />
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
  studentCount: PropTypes.number,
  presentation: PropTypes.object,
  browserHistory: PropTypes.object.isRequired,
  meteorCall: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
};

export default createContainer(({ params }) => {
  const selectedPresentationId = Session.get('selectedPresentationId');
  const sectionId = params.sectionId;
  Meteor.subscribe('presentationsPublication', sectionId);
  Meteor.subscribe('sectionsPublication');
  Meteor.subscribe('studentsPublication', sectionId, selectedPresentationId);

  return {
    selectedPresentationId,
    studentCount: StudentsCollection.find().fetch().length,
    section: SectionsCollection.findOne(sectionId),
    presentation: PresentationsCollection.findOne(selectedPresentationId),
    browserHistory,
    meteorCall: Meteor.call,
  };
}, EditPresentation);
