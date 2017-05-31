import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import Modal from 'react-modal';

export class ModalNewStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      names: '',
      modalIsOpen: false,
      error: '',
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleSubmit(e) {
    const sectionId = Session.get('sectionId');
    const presentationId = this.props.presentationId;
    const { names } = this.state;
    const namesArray = names.split(' ');
    // console.log(namesArray);
    e.preventDefault();
    namesArray.map((name) => {
      return this.props.meteorCall('students.insert', name, sectionId, presentationId, (err) => {
        if (!err) {
          this.closeModal();
        } else {
          this.setState({ error: err.reason });
        }
      });
    });
  }

  onChange(e) {
    this.setState({
      names: e.target.value,
    });
  }
  // set state on modal open
  openModal() {
    this.setState({
      modalIsOpen: true,
    });
  }
  // set state on modal close and clear out url
  closeModal() {
    this.setState({ modalIsOpen: false, names: [], error: '' });
  }

  render() {
    return (
      <div>
        <button
          className="button button--pill"
          onClick={this.openModal}>
            <i className="fa fa-plus" aria-hidden="true"></i> Students
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="Add Students"
          onAfterOpen={() => { return this.names.focus(); }}
          onRequestClose={this.closeModal}
          className="boxed-view__modal"
          >
          <button className="button--close" onClick={this.closeModal}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
          <h1>Add Students</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <p>If you want to add multiple students, just separate them with spaces</p>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <textarea
              placeholder="Enter Student Names Here"
              value={this.state.names}
              ref={ (textarea) => { this.names = textarea; }}
              onChange={this.onChange.bind(this)}
            ></textarea>
            <button className="button">Add Students</button>
          </form>
        </Modal>
      </div>
    );
  }
}

ModalNewStudent.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired,
  presentationId: PropTypes.string,
};

export default createContainer(() => {
  return ({
    meteorCall: Meteor.call,
    Session,
  });
}, ModalNewStudent);
