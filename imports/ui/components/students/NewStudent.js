import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Link } from 'react-router';

export class NewStudent extends Component {

  handleSubmit() {
    const sectionId = Session.get('sectionId');
    const presentationId = Session.get('presentationId');

    this.props.meteorCall('students.insert', '', sectionId, presentationId);
  }

  render() {
    return (
      <div className="item-list__header">
        <Link to="/presentations" className="button">Back</Link>
        <button className="button" onClick={this.handleSubmit.bind(this)}>Add Students</button>
      </div>
    );
  }
}

NewStudent.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired,
};

export default createContainer(() => {
  return ({
    meteorCall: Meteor.call,
    Session,
  });
}, NewStudent);
