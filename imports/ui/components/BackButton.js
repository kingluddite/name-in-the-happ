import React from 'react';
import { browserHistory } from 'react-router';

export const BackButton = (props) => {
  const handleBackClick = () => {
    browserHistory.goBack();
  };

  return (
      <div className="item-list__header">
        <button className="button--back" onClick={handleBackClick}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i> BACK
        </button>
      </div>
  );
};

export default BackButton;
