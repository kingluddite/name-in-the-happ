import React from 'react';
import PropTypes from 'prop-types';

export const PlayPresentation = (props) => {
  return (
    <div>
      <div className="play-presentation">
        <div className="play-presentation__current-presenters">
          <h2 className="play-presentation__title">Now Presenting</h2>
          <span className="play-presentation__current-presenters-count">
            {props.currentPresenterName}</span>
        </div>
      </div>
      <div className="play-presentation">
        <div className="play-presentation__remaining-presenters">
          <h2 className="play-presentation__subtitle">Remaining</h2>
          <span className="play-presentation__presenters-count">{props.remainingPresenters}</span>
        </div>
        <div className="play-presentation__remaining-presenters">
          <h2 className="play-presentation__subtitle">On Deck</h2>
          <span className="play-presentation__presenters-count">
            {props.onDeckName}</span>
        </div>
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
