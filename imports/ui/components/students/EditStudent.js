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
    if (this.name) {
      this.name.select();
    }
    const { student } = this.props;
    const currentStudentId = student ? student._id : undefined;
    const prevStudentId = prevProps.student ? prevProps.student._id : undefined;

    if (currentStudentId && currentStudentId !== prevStudentId) {
      this.setState({
        name: student.name,
      });
    }
  }

  handleNameChange(e) {
    const { student } = this.props;
    const name = e.target.value;
    this.setState({ name });
    this.props.call('students.update', student._id, {
      name,
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
           ref={ (input) => { this.name = input; }}
           value={name}
           placeholder="Student Name"
           onChange={this.handleNameChange.bind(this)} />
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
  student: PropTypes.object,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const selectedStudentId = Session.get('selectedStudentId');

  return {
    selectedStudentId,
    student: StudentsCollection.findOne(selectedStudentId),
    call: Meteor.call,
    browserHistory,
  };
}, EditStudent);
