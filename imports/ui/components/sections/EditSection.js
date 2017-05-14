import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';
import { Session } from 'meteor/session';


class EditSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      modalIsOpen: true,
      currentSectionId: Session.get('currentSectionId'),
    };

    // binding
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    // this.name.focus();
    console.log(this.state.currentSectionId);
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      error: '',
    });
  }

  handleSubmit(e) {
    const name = this.name.value.trim();
    const code = this.code.value.trim();

    e.preventDefault();

    // if (name && code) {
    Meteor.call('sections.insert', name, code, (err) => {
      if (!err) {
        this.name.value = '';
        this.code.value = '';
      } else {
        this.setState({ error: err.reason });
      }
    });
  }
  // }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="Add Section"
          onAfterOpen={() => this.name.focus()}
          onRequestClose={this.closeModal}
          >
            <h2>Update Section</h2>
            { this.state.error ? <p className="errors">{this.state.error}</p> : undefined }
            <div className="item item__form">
              <form className="form" onSubmit={this.handleSubmit.bind(this)}>
                <input
                  className="form__input" type="text"
                  ref={ (input) => { this.name = input; }}
                  placeholder="Section Name" />
                  <input
                    type="text"
                    ref={ (input) => { this.code = input; }}
                    placeholder="Class Code" />
                  <button className="button">Update Section</button>
                </form>
                <button
                  className="button"
                  onClick={this.closeModal}>
                  Close
                </button>
              </div>
            </Modal>
      </div>
    );
  }
}

export default EditSection;
