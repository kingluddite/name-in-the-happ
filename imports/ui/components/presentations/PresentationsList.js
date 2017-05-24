import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

// collections
import PresentationsCollection from '../../../api/presentations';

// components
import PresentationsListHeader from './PresentationsListHeader';
import PresentationsListItem from './PresentationsListItem';
import PresentationsListEmptyItem from './PresentationsListEmptyItem';

export const PresentationsList = (props) => {
  const renderPresentations = props.presentations.map((presentation) => {
    return <PresentationsListItem key={presentation._id} presentation={presentation} />;
  });

  return (
    <div className="item-list">
      <PresentationsListHeader />
      {(props.presentations.length === 0) ? <PresentationsListEmptyItem /> : undefined}
      {renderPresentations}
      PresentationsList {props.presentations.length}
    </div>
  );
};

PresentationsList.propTypes = {
  presentations: PropTypes.array.isRequired,
};

  // export default PresentationList;

export default createContainer(() => {
  const selectedPresentationId = Session.get('selectedPresentationId');
  Meteor.subscribe('presentationsPublication');

  return {
    presentations: PresentationsCollection.find({}, {
      sort: { updatedAt: -1 },
    }).fetch().map((presentation) => {
      return {
        ...presentation,
        selected: presentation._id === selectedPresentationId,
      };
    }),
  };
}, PresentationsList);
