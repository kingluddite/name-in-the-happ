import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

// Collections
import SectionsCollection from './../../../api/sections';

// Components
import SectionsListItem from './SectionsListItem';

class SectionsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: [],
    };
  }
  componentDidMount() {
    this.sectionsTracker = Tracker.autorun(() => {
      Meteor.subscribe('sectionsPub');

      const sectionsCollection = SectionsCollection.find().fetch();
      this.setState({ sections: sectionsCollection });
    });
  }

  componentWillUnmount() {
    this.sectionsTracker.stop();
  }

  renderSectionsListItems() {
    if (this.state.sections.length === 0) {
      return (
        <div className="item item__empty">
          <p className="item__status-message">No Sections Found</p>
        </div>
      );
    }
    return this.state.sections.map(section => (
      <SectionsListItem key={section._id} section={section} />
    ));
  }

  render() {
    return (
      <div>
        {this.renderSectionsListItems()}
      </div>
    );
  }
}

export default SectionsList;

