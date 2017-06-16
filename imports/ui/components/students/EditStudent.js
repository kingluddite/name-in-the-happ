import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

// collections
import StudentsCollection from './../../../api/students';

export class EditStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      title: '',
    };
  }

  // componentDidUpdate(prevProps, prevState) {
  componentDidUpdate(prevProps) {
    // if (this.name) {
    //   this.name.select();
    // }
    const { student } = this.props;
    const currentStudentId = student ? student._id : undefined;
    const prevStudentId = prevProps.student ? prevProps.student._id : undefined;

    if (currentStudentId && currentStudentId !== prevStudentId) {
      this.setState({
        name: student.name,
        title: student.title,
      });
    }
  }

  handleNameChange(event) {
    const { student } = this.props;
    const name = event.target.value;
    this.setState({ name });
    this.props.call('students.update', student._id, {
      name,
    });
  }

  handleTitleChange(event) {
    const { student } = this.props;
    const title = event.target.value;
    this.setState({ title });
    this.props.call('students.update', student._id, {
      title,
    });
  }

  handleDeleteStudent() {
    const sectionId = this.props.params.sectionId;
    const presentationId = this.props.params.presentationId;
    const { student } = this.props;
    this.props.call('students.remove', student._id);
    this.props.browserHistory.push(`/sections/${sectionId}/presentations/${presentationId}/students`);
  }

  render() {
    if (this.props.student) {
      return (
        <div className="editor">
         <input
           type="text"
           className="editor__title"
           ref={ (input) => { this.name = input; }}
           value={this.state.name}
           placeholder="Student Name"
           onChange={this.handleNameChange.bind(this)} />
           <input
             type="text"
             className="editor__title"
             ref={ (input) => { this.title = input; }}
             value={this.state.title}
             placeholder="Project Title"
             onChange={this.handleTitleChange.bind(this)} />
           <div className="editor__button--container">
             <button
               className="button button--default"
               onClick={this.handleDeleteStudent.bind(this)}>
               Delete
             </button>
           </div>
         </div>
      );
    }
    return (
      <div className="editor">
        <p className="editor__message">
          { this.props.selectedStudentId ? 'Student not found.' : 'Pick or create a student to get started.'}
        </p>
      </div>
    );
  }
}

EditStudent.propTypes = {
  selectedStudentId: PropTypes.string,
  student: PropTypes.object,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

export default createContainer(({ params }) => {
  const selectedStudentId = Session.get('selectedStudentId');
  const sectionId = params.sectionId;
  const presentationId = params.presentationId;

  Meteor.subscribe('studentsPublication', sectionId, presentationId);

  return {
    selectedStudentId,
    student: StudentsCollection.findOne(selectedStudentId),
    call: Meteor.call,
    browserHistory,
  };
}, EditStudent);
