import React from 'react';

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

export default PlayPresentation;
