import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import PropTypes from 'prop-types';

// collections
import SectionsCollection from './../../../api/sections';
// components
import AddPresentation from './../presentations/AddPresentation';
import PresentationsList from './../presentations/PresentationsList';

class ViewSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      section: {},
    };
    this.renderSection = this.renderSection.bind(this);
  }

  componentDidMount() {
    this.sectionTracker = Tracker.autorun(() => {
      Meteor.subscribe('sectionsPub');

      const _id = this.props.params._id;
      const section = SectionsCollection.findOne({ _id });
      this.setState({ section });
    });
  }

  componentWillUnmount() {
    this.sectionTracker.stop();
  }
  renderSection() {
    if (this.state.section !== undefined) {
      return (
         <div>
           <h2>{this.state.section.name}</h2>
           <p>{this.state.section.code}</p>
         </div>
      );
    }
    return undefined;
  }

  render() {
    return (
      <div>
        <button className="button" onClick={ browserHistory.goBack}>Back</button>
        {this.renderSection()}
        <AddPresentation section={this.state.section}/>
        <PresentationsList />
      </div>
    );
  }
}

ViewSection.propTypes = {
  params: PropTypes.object.isRequired,
};

export default ViewSection;
