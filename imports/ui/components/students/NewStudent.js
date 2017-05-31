import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

export class NewStudent extends Component {

  handleSubmit() {
    const sectionId = Session.get('sectionId');
    const presentationId = Session.get('presentationId');
    // console.log('sid', sectionId);
    // console.log('pid', presentationId);
    this.props.meteorCall('students.insert', '', sectionId, presentationId);
  }

  render() {
    return (
      <div className="item-list__header">
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
