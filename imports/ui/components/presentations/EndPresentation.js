import React from 'react';
import PropTypes from 'prop-types';

export const EndPresentation = (props) => {
  return (
    <div>
      <h1>The Presentation is over</h1>
      <div>
        <button className="button" onClick={props.reset}>Reset</button>
      </div>
    </div>
  );
};

EndPresentation.propTypes = {
  reset: PropTypes.func.isRequired,
};

export default EndPresentation;
