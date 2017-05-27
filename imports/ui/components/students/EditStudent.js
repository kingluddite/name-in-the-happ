import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

// collections
import StudentsCollection from './../../../api/students';

// components
import NewStudent from './../students/NewStudent';

export class EditStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  // componentDidUpdate(prevProps, prevState) {
  componentDidUpdate(prevProps) {
    const { student } = this.props;
    const currentStudentId = student ? student._id : undefined;
    const prevStudentId = prevProps.student ? prevProps.student._id : undefined;

    if (currentStudentId && currentStudentId !== prevStudentId) {
      this.setState({
        title: student.title,
      });
    }
  }

  handleTitleChange(e) {
    const { student } = this.props;
    const title = e.target.value;
    this.setState({ title });
    this.props.call('students.update', student._id, {
      title,
    });
  }

  handleBodyChange(e) {
    const { student } = this.props;
    const body = e.target.value;
    this.setState({ body });
    this.props.call('students.update', student._id, {
      body,
    });
  }

  handleDeleteStudent() {
    const { student } = this.props;
    this.props.call('students.remove', student._id);
    this.props.browserHistory.push('/students');
  }

  render() {
    const { student } = this.props;
    const { name } = this.state;
    if (student) {
      return (
        <div className="editor">
         <input
           type="text"
           className="editor__title"
           value={name}
           placeholder="Student Name"
           onChange={this.handleTitleChange.bind(this)} />
           <button
             className="button button--default"
             onClick={this.handleDeleteStudent.bind(this)}>
             Delete
           </button>
           <NewStudent />
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
  presentation: PropTypes.object,
  student: PropTypes.object,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const selectedStudentId = Session.get('selectedStudentId');

  return {
    selectedStudentId,
    presentation: StudentsCollection.findOne(selectedStudentId),
    call: Meteor.call,
    browserHistory,
  };
}, EditStudent);
