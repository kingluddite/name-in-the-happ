import React from 'react';
import PropTypes from 'prop-types';

export const PlayPresentation = (props) => {
  return (
    <div>
       Number Left To Present {props.remainingPresenters}
       Next Presenter: {props.onDeckName}
      <div>
        <span>Presenter</span>
        <h2 className="watch__heading">
          Name: {props.currentPresenterName}
        </h2>
      </div>
      <div>
        <button className="button" onClick={props.nextStudent}>Next</button>
        <button className="button" onClick={props.skipStudent}>Skip</button>
      </div>
    </div>
  );
};

PlayPresentation.propTypes = {
  nextStudent: PropTypes.func.isRequired,
  skipStudent: PropTypes.func.isRequired,
  remainingPresenters: PropTypes.string.isRequired,
  onDeckName: PropTypes.string.isRequired,
  currentPresenterName: PropTypes.string.isRequired,
};

export default PlayPresentation;
