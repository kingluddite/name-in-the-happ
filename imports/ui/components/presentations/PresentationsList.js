import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

// Collections
import PresentationsCollection from './../../../api/presentations';

// Components
import PresentationsListItem from './PresentationsListItem';

class PresentationsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      presentations: [],
    };
  }
  componentDidMount() {
    this.presentationsTracker = Tracker.autorun(() => {
      Meteor.subscribe('presentationsPub');
      const sectionId = Session.get('currentSectionId');
      const presentationsCollection = PresentationsCollection.find({ sectionId }).fetch();
      this.setState({ presentations: presentationsCollection });
    });
  }

  componentWillUnmount() {
    this.presentationsTracker.stop();
  }

  renderSectionListItems() {
    if (this.state.presentations.length === 0) {
      return (
        <div className="item item__empty">
          <p className="item__status-message">No Presentations Found</p>
        </div>
      );
    }
    return this.state.presentations.map(presentation => (
      <PresentationsListItem key={presentation._id} presentation={presentation} />
    ));
  }

  render() {
    return (
      <div>
        {this.renderSectionListItems()}
      </div>
    );
  }
}

export default PresentationsList;
