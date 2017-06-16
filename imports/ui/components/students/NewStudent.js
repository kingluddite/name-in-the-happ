import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

export class NewStudent extends Component {

  handleSubmit() {
    const sectionId = this.props.params.sectionId;
    const presentationId = this.props.params.presentationId;
    this.props.meteorCall('students.insert', '', sectionId, presentationId, (err) => {
        console.log(err);
    });
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
  params: PropTypes.object.isRequired,
};

export default createContainer(() => {
  return ({
    meteorCall: Meteor.call,
    Session,
  });
}, NewStudent);
