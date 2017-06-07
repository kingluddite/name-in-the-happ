import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import PropTypes from 'prop-types';

// collections
import SectionsCollection from './../../../api/sections';

export class EditSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  // componentDidUpdate(prevProps, prevState) {
  componentDidUpdate(prevProps) {
    const currentSectionId = this.props.section ? this.props.section._id : undefined;
    const prevSectionId = prevProps.section ? prevProps.section._id : undefined;

    if (currentSectionId && currentSectionId !== prevSectionId) {
      this.setState({
        name: this.props.section.name,
      });
    }
  }

  handleNameChange(event) {
    const name = event.target.value;
    this.setState({ name });
    this.props.call('sections.update', this.props.section._id, {
      name,
    });
  }

  handleDeleteSection() {
    this.props.call('sections.remove', this.props.section._id);
    this.props.browserHistory.push('/sections');
  }

  handleViewPres() {
    const sectionId = this.props.section._id;
    this.props.browserHistory.push(`/sections/${sectionId}/presentations`);
  }

  render() {
    if (this.props.section) {
      return (
        <div className="editor">
          <input
           type="text"
           autoFocus
           className="editor__title"
           ref={ (input) => { this.name = input; }}
           value={this.state.name}
           placeholder="Section Name"
           onChange={this.handleNameChange.bind(this)}
         />
         <div className="editor__button--container">
           <button
             className="button button--default"
             onClick={this.handleViewPres.bind(this)}>
             View
           </button>
           <button
             className="button button--default"
             onClick={this.handleDeleteSection.bind(this)}>
             Delete
           </button>
         </div>
       </div>
      );
    }
    return (
      <div className="editor">
        <p className="editor__message">
          { this.props.selectedSectionId ? 'Section not found.' : 'Pick or create a section to get started.'}
        </p>
      </div>
    );
  }
}

EditSection.propTypes = {
  selectedSectionId: PropTypes.string,
  section: PropTypes.object,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const selectedSectionId = Session.get('selectedSectionId');

  return {
    selectedSectionId,
    section: SectionsCollection.findOne(selectedSectionId),
    call: Meteor.call,
    browserHistory,
  };
}, EditSection);
