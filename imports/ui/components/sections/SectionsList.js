import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

// collections
import SectionsCollection from '../../../api/sections';

// components
import NewSection from './NewSection';
import SectionsListItem from './SectionsListItem';
import SectionsListEmptyItem from './SectionsListEmptyItem';

export const SectionsList = (props) => {
  const renderSections = props.sections.map((section) => {
    return <SectionsListItem key={section._id} section={section} />;
  });

  return (
    <div className="item-list">
      <NewSection />
      {(props.sections.length === 0) ? <SectionsListEmptyItem /> : undefined}
      {renderSections}
    </div>
  );
};

SectionsList.propTypes = {
  sections: PropTypes.array.isRequired,
};

export default createContainer(() => {
  const selectedSectionId = Session.get('selectedSectionId');

  Meteor.subscribe('sectionsPublication');

  return {
    sections: SectionsCollection.find({}, {
      sort: { updatedAt: -1 },
    }).fetch().map((section) => {
      return {
        ...section,
        selected: section._id === selectedSectionId,
      };
    }),
  };
}, SectionsList);
