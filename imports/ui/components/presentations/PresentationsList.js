import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

// collections
import PresentationsCollection from '../../../api/presentations';

// components
import NewPresentation from './NewPresentation';
import PresentationsListItem from './PresentationsListItem';
import PresentationsListEmptyItem from './PresentationsListEmptyItem';
import BackButton from './../BackButton';

export const PresentationsList = (props) => {
  const renderPresentations = props.presentations.map((presentation) => {
    return <PresentationsListItem key={presentation._id} presentation={presentation} />;
  });

  return (
    <div className="item-list">
      <div className="item-list__header">
        <BackButton />
      </div>
      <NewPresentation sectionId={props.params.sectionId} />
      {(props.presentations.length === 0) ? <PresentationsListEmptyItem /> : undefined}
      {renderPresentations}
    </div>
  );
};

PresentationsList.propTypes = {
  presentations: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
};

export default createContainer(({ params }) => {
  const selectedPresentationId = Session.get('selectedPresentationId');
  const sectionId = params.sectionId;

  Meteor.subscribe('presentationsPublication', sectionId, () => {
  });

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
