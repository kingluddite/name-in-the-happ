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
        <button className="button" onClick={props.nextPresenter}>Next</button>
        <button className="button" onClick={props.skipPresenter}>Skip</button>
      </div>
    </div>
  );
};

PlayPresentation.propTypes = {
  nextPresenter: PropTypes.func.isRequired,
  skipPresenter: PropTypes.func.isRequired,
  remainingPresenters: PropTypes.number,
  onDeckName: PropTypes.string,
  currentPresenterName: PropTypes.string,
};

export default PlayPresentation;
