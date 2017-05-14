import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
// import Modal from 'react-modal';


class AddSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };
  }

  componentDidMount() {
    this.name.focus();
  }
  //   //
  //   // // binding
  //   // this.openModal = this.openModal.bind(this);
  //   // this.closeModal = this.closeModal.bind(this);
  // }

  // openModal() {
  //   this.setState({
  //     modalIsOpen: true,
  //     error: '',
  //   });
  // }
  //
  // closeModal() {
  //   this.setState({
  //     modalIsOpen: false,
  //     error: '',
  //   });
  // }

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
        {/* <button className="button" onClick={this.openModal}>+ Add Section</button> */}
        {/* <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="Add Section"
          onAfterOpen={() => this.name.focus()}
          onRequestClose={this.closeModal}
        > */}
        <h2>Add Section</h2>
        { this.state.error ? <p className="errors">{this.state.error}</p> : undefined }
        <div className="item item__form">
          <form className="form" onSubmit={this.handleSubmit.bind(this)}>
            <input
              className="form__input" type="text"
              ref={ (input) => { this.name = input; }}
              placeholder="Section Name" />
            <input type="text" ref={ (input) => { this.code = input; }} placeholder="Class Code" />
            <button className="button">Add Section</button>
          </form>
          {/* <button onClick={this.closeModal}>Close</button> */}
        </div>
      {/* </Modal> */}
      </div>
    );
  }
}

export default AddSection;
