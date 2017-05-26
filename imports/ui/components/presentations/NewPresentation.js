import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';

class NewPresentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };
  }

  componentDidMount() {
    this.name.focus();
  }

  handleSubmit(e) {
    const name = this.name.value.trim();
    const sectionId = Session.get('currentSectionId');

    e.preventDefault();

    Meteor.call('presentations.insert', name, sectionId, (err) => {
      if (!err) {
        this.name.value = '';
      } else {
        this.setState({ error: err.reason });
      }
    });
  }

  render() {
    return (
      <div>
        <h2>Add Presentation</h2>
        { this.state.error ? <p className="errors">{this.state.error}</p> : undefined }
        <div className="item item__form">
          <form className="form" onSubmit={this.handleSubmit.bind(this)}>
            <input
              className="form__input" type="text"
              ref={ (input) => { this.name = input; }}
              placeholder="Presentation Name" />
            <button className="button">Add Presentation</button>
          </form>
        </div>
      </div>
    );
  }
}

NewPresentation.propTypes = {
  section: PropTypes.object,
};

export default NewPresentation;
