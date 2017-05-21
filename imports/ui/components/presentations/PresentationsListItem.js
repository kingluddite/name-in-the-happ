import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const PresentationsListItem = (props) => {
  return (
  <div>
    <h5>{ props.presentation.title || 'Untitled Presentation' }</h5>
    <p>{ moment(props.presentation.updatedAt).format('M/DD/YYYY') }</p>
  </div>
  );
};

PresentationsListItem.propTypes = {
  presentation: PropTypes.object.isRequired,
};

export default PresentationsListItem;
